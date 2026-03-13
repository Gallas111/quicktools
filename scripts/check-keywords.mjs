import { chromium } from "playwright";

const keywords = [
  "글자수 세기",
  "이미지 압축",
  "QR코드 생성기",
  "JSON 포맷터",
  "비밀번호 생성기",
  "색상 변환기",
  "Base64 인코딩",
  "URL 인코딩",
  "Lorem Ipsum 생성기",
  "타임스탬프 변환",
  "해시 생성기",
  "마크다운 미리보기",
  "정규식 테스터",
  "텍스트 비교",
  "대소문자 변환",
  "UUID 생성기",
  "CSS 압축",
  "진법 변환기",
  "텍스트 분석기",
];

async function analyzeKeyword(page, keyword) {
  // 네이버 통합검색
  await page.goto(`https://search.naver.com/search.naver?query=${encodeURIComponent(keyword)}`, {
    waitUntil: "domcontentloaded",
    timeout: 15000,
  });
  await page.waitForTimeout(1800);

  const data = await page.evaluate(() => {
    const text = document.body.innerText;

    // 1) 네이버 자체 도구 제공 여부 (글자수 세기처럼 네이버가 직접 도구를 보여주는 경우)
    const hasNaverTool = !!(
      document.querySelector('[class*="calculator"]') ||
      document.querySelector('[class*="instant"]') ||
      text.includes("텍스트를 입력해주세요") ||
      text.includes("바로가기")
    );

    // 2) "함께 많이 찾는" 키워드
    const alsoSearched = [];
    const bodyText = text;
    const alsoMatch = bodyText.match(/함께 많이 찾는\n([\s\S]*?)(?:\n\n|\n[^\n]*www)/);
    if (alsoMatch) {
      alsoSearched.push(...alsoMatch[1].split('\n').map(s => s.trim()).filter(s => s.length > 1 && s.length < 30));
    }

    // 3) 연관 검색어
    const relatedEl = document.querySelector('.lst_related_srch');
    const related = relatedEl
      ? Array.from(relatedEl.querySelectorAll('a')).map(a => a.textContent.trim()).filter(t => t.length > 1)
      : [];

    // 4) 광고 (파워링크)
    const hasAd = text.includes('파워링크') || text.includes('PowerLink');

    // 5) 검색 결과에 보이는 외부 사이트 수
    const externalLinks = document.querySelectorAll('a[href*="://"]');
    const uniqueDomains = new Set();
    externalLinks.forEach(a => {
      try {
        const url = new URL(a.href);
        if (!url.hostname.includes('naver') && !url.hostname.includes('search')) {
          uniqueDomains.add(url.hostname);
        }
      } catch {}
    });

    // 6) 블로그/VIEW 영역 존재 여부
    const hasBlogSection = text.includes('VIEW') || text.includes('블로그') && text.includes('더보기');

    // 7) 상위 3개 결과 도메인
    const topDomains = [];
    const linkEls = document.querySelectorAll('a[href*="://"]');
    linkEls.forEach(a => {
      try {
        const url = new URL(a.href);
        if (!url.hostname.includes('naver') && !url.hostname.includes('search') && topDomains.length < 5) {
          if (!topDomains.includes(url.hostname)) topDomains.push(url.hostname);
        }
      } catch {}
    });

    return {
      hasNaverTool,
      alsoSearched: alsoSearched.slice(0, 5),
      related: related.slice(0, 5),
      hasAd,
      externalDomains: uniqueDomains.size,
      hasBlogSection,
      topDomains: topDomains.slice(0, 3),
    };
  });

  return data;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    locale: "ko-KR",
  });
  const page = await context.newPage();

  console.log("📊 네이버 키워드 수요 분석\n");

  const results = [];

  for (let i = 0; i < keywords.length; i++) {
    const kw = keywords[i];
    process.stdout.write(`[${i + 1}/${keywords.length}] ${kw} ... `);
    const data = await analyzeKeyword(page, kw);
    results.push({ keyword: kw, ...data });
    console.log("OK");
    await page.waitForTimeout(600);
  }

  // 점수 계산
  for (const r of results) {
    let score = 0;
    if (r.hasNaverTool) score += 30;    // 네이버가 자체 도구 제공 = 수요 최고
    if (r.hasAd) score += 20;           // 광고가 붙음 = 상업적 가치
    if (r.related.length > 0) score += 15;  // 연관검색어 있음
    if (r.alsoSearched.length > 0) score += 15; // 함께 많이 찾는 있음
    if (r.externalDomains > 10) score += 10; // 관련 사이트 많음
    if (r.hasBlogSection) score += 10;  // 블로그 글 있음
    r.score = score;
  }

  // 점수 순 정렬
  results.sort((a, b) => b.score - a.score);

  console.log("\n" + "=".repeat(75));
  console.log("📊 키워드 수요 순위 (네이버 기준)");
  console.log("=".repeat(75) + "\n");

  let rank = 1;
  for (const r of results) {
    let tier;
    if (r.score >= 50) tier = "🔥🔥🔥 수요 매우 높음";
    else if (r.score >= 30) tier = "🔥🔥  수요 높음";
    else if (r.score >= 15) tier = "🔥   수요 있음";
    else tier = "💧   수요 낮음";

    const indicators = [];
    if (r.hasNaverTool) indicators.push("네이버자체도구");
    if (r.hasAd) indicators.push("광고있음");
    if (r.related.length > 0) indicators.push("연관검색어");
    if (r.alsoSearched.length > 0) indicators.push("함께많이찾는");

    console.log(`${String(rank++).padStart(2)}위 [${String(r.score).padStart(2)}점] ${r.keyword}`);
    console.log(`    ${tier}`);
    if (indicators.length > 0) console.log(`    지표: ${indicators.join(" | ")}`);
    if (r.related.length > 0) console.log(`    연관: ${r.related.join(", ")}`);
    if (r.alsoSearched.length > 0) console.log(`    함께: ${r.alsoSearched.join(", ")}`);
    if (r.topDomains.length > 0) console.log(`    경쟁: ${r.topDomains.join(", ")}`);
    console.log("");
  }

  console.log("=".repeat(75));
  console.log("💡 해석 가이드:");
  console.log("  🔥🔥🔥 = 일반인도 많이 검색, 네이버가 직접 서비스 제공할 정도");
  console.log("  🔥🔥  = 광고가 붙을 정도로 상업적 가치 있음");
  console.log("  🔥   = 개발자/전문가 중심이지만 꾸준한 수요");
  console.log("  💧   = 니치 시장, 하지만 경쟁도 적어서 상위노출 쉬움");
  console.log("=".repeat(75));

  await browser.close();
}

main().catch(console.error);
