/**
 * Toolkio 3일 주기 성장 리포트
 *
 * Google Search Console + GA4 데이터를 수집하고,
 * Gemini AI로 분석한 리포트를 이메일로 발송합니다.
 *
 * 필요 환경변수:
 *   GOOGLE_CREDENTIALS_BASE64, GA_PROPERTY_ID, GSC_SITE_URL,
 *   GEMINI_API_KEY, EMAIL_USER, EMAIL_PASS, EMAIL_RECEIVER
 */

import { google } from "googleapis";
// Cloudflare Workers AI (replaces Google Generative AI)
import nodemailer from "nodemailer";
import { marked } from "marked";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KEY_FILE_PATH = path.join(__dirname, "..", "google-credentials.json");

const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID;
const GSC_SITE_URL = process.env.GSC_SITE_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER;

// ─── Google API 인증 ────────────────────────────────────────────────────────
async function authenticateGoogle() {
  const credentialsBase64 = process.env.GOOGLE_CREDENTIALS_BASE64;
  if (credentialsBase64) {
    const json = Buffer.from(credentialsBase64, "base64").toString("utf-8");
    fs.writeFileSync(KEY_FILE_PATH, json);
  }
  if (!fs.existsSync(KEY_FILE_PATH)) {
    throw new Error("Google Credentials (JSON file or GOOGLE_CREDENTIALS_BASE64)이 필요합니다.");
  }
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: [
      "https://www.googleapis.com/auth/webmasters.readonly",
      "https://www.googleapis.com/auth/analytics.readonly",
    ],
  });
  return await auth.getClient();
}

// ─── Search Console 데이터 (최근 10일) ──────────────────────────────────────
async function fetchSearchConsoleData(authClient) {
  if (!GSC_SITE_URL) throw new Error("환경변수 GSC_SITE_URL이 설정되지 않았습니다.");
  const searchconsole = google.searchconsole({ version: "v1", auth: authClient });

  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 3);
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 10);
  const fmt = (d) => d.toISOString().split("T")[0];

  const response = await searchconsole.searchanalytics.query({
    siteUrl: GSC_SITE_URL,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ["query", "page"],
      rowLimit: 50,
    },
  });
  return response.data.rows || [];
}

// ─── GA4 데이터 (최근 7일, toolkio.com 필터) ────────────────────────────────
async function fetchAnalyticsData(authClient) {
  if (!GA_PROPERTY_ID) throw new Error("환경변수 GA_PROPERTY_ID가 설정되지 않았습니다.");
  const analyticsdata = google.analyticsdata({ version: "v1beta", auth: authClient });

  const response = await analyticsdata.properties.runReport({
    property: `properties/${GA_PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }, { name: "pageTitle" }, { name: "hostName" }],
      metrics: [
        { name: "screenPageViews" },
        { name: "activeUsers" },
        { name: "averageSessionDuration" },
        { name: "engagementRate" },
      ],
      dimensionFilter: {
        filter: {
          fieldName: "hostName",
          stringFilter: { matchType: "CONTAINS", value: "toolkio.com" },
        },
      },
      limit: 100,
    },
  });
  return response.data.rows || [];
}

// ─── AI 분석: Gemini first → CF Workers AI fallback ─────────────────────────
async function generateInsights(gscData, gaData) {
  const cfAccountId = process.env.CF_ACCOUNT_ID;
  const cfApiToken = process.env.CF_API_TOKEN;
  const CF_MODEL_REPORT = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

  const prompt = `
당신은 'Toolkio' 프로젝트 전담 SEO 및 웹 도구 사이트 성장 컨설턴트입니다.
toolkio.com은 온라인 유틸리티 도구 모음 + SEO 블로그 사이트입니다.
제공된 데이터를 기반으로 toolkio.com의 성장에만 집중한 리포트를 작성해주세요.

[GSC 데이터 - 검색 노출/클릭]
${JSON.stringify(gscData.slice(0, 25), null, 2)}

[GA4 데이터 - 방문/체류]
${JSON.stringify(gaData.slice(0, 25), null, 2)}

### 리포트 구성 가이드:
1. **[분석 리포트] Toolkio 프로젝트 성장 현황** 이라는 제목으로 시작하세요.
2. **📊 주요 성과 요약**:
   - 총 노출수, 클릭수, 평균 CTR, 평균 순위
   - 상위 유입 키워드 TOP 5
   - 가장 많이 방문된 페이지 TOP 5
3. **🔍 문제점 분석**:
   - 낮은 CTR 키워드 (노출은 높지만 클릭이 적은 것)
   - 체류 시간이 짧은 페이지
   - 색인 안 되는 블로그 글 관련 조언
4. **🚀 3단계 개선 전략**:
   - [Step 1] 클릭을 유도하는 메타 제목/설명 개선 제안 (구체적 예시)
   - [Step 2] 콘텐츠 품질 및 내부 링크 강화 방안
   - [Step 3] 새로운 키워드 공략 제안
5. **💡 다음 3일 액션 아이템**: 구체적으로 해야 할 일 3가지를 체크리스트로 제시

톤앤매너는 전문적이면서도 응원하는 분위기로 작성해주시고, 이메일로 읽기 좋게 마크다운 형식을 잘 활용해주세요.
`;

  // 1st: Try Gemini
  if (GEMINI_API_KEY) {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
      const resp = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 8192 },
        }),
      });
      if (resp.status === 429) {
        console.warn("⚡ Gemini 한도 초과 → CF Workers AI로 전환");
      } else if (resp.ok) {
        const data = await resp.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        if (text) return text;
      } else {
        console.warn(`⚠️ Gemini 실패 (${resp.status}) → CF Workers AI로 전환`);
      }
    } catch (err) {
      console.warn(`⚠️ Gemini 에러 → CF Workers AI로 전환: ${err.message}`);
    }
  }

  // 2nd: Try Groq
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    try {
      const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${groqKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], max_tokens: 8192 }),
      });
      if (groqResp.status === 429) {
        console.warn('⚡ Groq 한도 초과 → CF Workers AI로 전환');
      } else if (groqResp.ok) {
        const groqData = await groqResp.json();
        const text = groqData.choices?.[0]?.message?.content?.trim() || '';
        if (text) return text;
      }
    } catch (err) {
      console.warn(`⚠️ Groq 실패 → CF Workers AI로 전환: ${err.message}`);
    }
  }

  // 3rd: CF Workers AI fallback
  if (!cfAccountId || !cfApiToken) throw new Error("GEMINI_API_KEY, Groq, 또는 CF_ACCOUNT_ID+CF_API_TOKEN이 필요합니다.");
  const cfUrl = `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/run/${CF_MODEL_REPORT}`;
  const response = await fetch(cfUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${cfApiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      max_tokens: 8192,
    }),
  });
  if (!response.ok) throw new Error(`CF Workers AI error (${response.status}): ${await response.text()}`);
  const data = await response.json();
  return data.result?.response || "";
}

// ─── 이메일 발송 ────────────────────────────────────────────────────────────
async function sendEmail(insights) {
  const reportHtml = await marked.parse(insights);
  const dateStr = new Date().toISOString().split("T")[0];

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin:0; padding:0; font-family:'Pretendard',sans-serif; background:#f4f7f9; color:#333; line-height:1.7; }
    .container { max-width:680px; margin:40px auto; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,0.08); }
    .header { background:linear-gradient(135deg,#3b82f6 0%,#06b6d4 100%); padding:50px 30px; text-align:center; color:#fff; }
    .header h1 { margin:0; font-size:26px; font-weight:800; }
    .header p { margin:10px 0 0; opacity:0.9; }
    .content { padding:40px; }
    h1,h2,h3 { color:#1e293b; }
    h2 { color:#2563eb; border-bottom:2px solid #e2e8f0; padding-bottom:8px; }
    pre { background:#1e293b; color:#e2e8f0; padding:20px; border-radius:12px; font-size:14px; overflow-x:auto; }
    code { background:#f1f5f9; padding:2px 6px; border-radius:4px; font-size:14px; }
    table { border-collapse:collapse; width:100%; }
    th,td { border:1px solid #e2e8f0; padding:8px 12px; text-align:left; }
    th { background:#f8fafc; }
    ul,ol { padding-left:20px; }
    .footer { padding:30px; text-align:center; background:#f8fafc; color:#94a3b8; font-size:13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📊 Toolkio 3일 주기 AI 성장 리포트</h1>
      <p>${dateStr} 기준 데이터 분석 결과</p>
    </div>
    <div class="content">${reportHtml}</div>
    <div class="footer">
      본 리포트는 GitHub Actions를 통해 3일마다 자동으로 생성됩니다.<br>
      &copy; ${new Date().getFullYear()} Toolkio Automation
    </div>
  </div>
</body>
</html>`;

  await transporter.sendMail({
    from: `"Toolkio 분석 도우미" <${EMAIL_USER}>`,
    to: EMAIL_RECEIVER,
    subject: `[자동 보고] 📊 Toolkio 성장을 위한 3일 주기 전략 (${dateStr})`,
    html,
  });

  console.log(`✅ 이메일 발송 완료! 수신: ${EMAIL_RECEIVER}`);
}

// ─── 메인 ───────────────────────────────────────────────────────────────────
async function main() {
  try {
    console.log("🚀 Toolkio 성장 리포트 생성을 시작합니다...");

    const authClient = await authenticateGoogle();
    console.log("✅ Google 인증 완료");

    const gscData = await fetchSearchConsoleData(authClient);
    console.log(`✅ Search Console 데이터 수집: ${gscData.length}건`);

    const gaData = await fetchAnalyticsData(authClient);
    console.log(`✅ GA4 데이터 수집: ${gaData.length}건`);

    const insights = await generateInsights(gscData, gaData);
    console.log("✅ Gemini AI 분석 완료");

    await sendEmail(insights);
    console.log("🎉 리포트 생성 및 발송 완료!");
  } catch (error) {
    console.error("❌ 실행 중 에러 발생:", error);
    process.exit(1);
  }
}

main();
