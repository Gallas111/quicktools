/**
 * Toolkio Daily Blog Post Generator
 *
 * Generates a new SEO blog post using Gemini AI, creates a thumbnail image,
 * and updates blog.ts, sitemap.xml, and rss.xml.
 *
 * Usage: GEMINI_API_KEY=xxx node scripts/daily-post.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is required");
  process.exit(1);
}

// ─── Gemini API helper ───────────────────────────────────────────────────────
async function callGemini(prompt, systemInstruction) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          ...(systemInstruction && {
            systemInstruction: { parts: [{ text: systemInstruction }] },
          }),
        }),
        signal: AbortSignal.timeout(60000),
      });
      if (resp.status === 429 || resp.status === 503) {
        const wait = Math.pow(2, attempt) * 2000;
        console.log(`   ⏳ Rate limited, waiting ${wait / 1000}s...`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      if (!resp.ok) throw new Error(`Gemini ${resp.status}: ${await resp.text()}`);
      const data = await resp.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    } catch (err) {
      if (attempt === 3) throw err;
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

// ─── Read existing slugs to avoid duplicates ─────────────────────────────────
function getExistingSlugs() {
  const blogFile = fs.readFileSync(path.join(ROOT, "src/lib/blog.ts"), "utf-8");
  const matches = blogFile.matchAll(/slug:\s*"([^"]+)"/g);
  return new Set(Array.from(matches, (m) => m[1]));
}

// ─── Topic generation ────────────────────────────────────────────────────────
const TOOL_TOPICS = [
  { tool: "character-counter", area: "글자수 세기, 텍스트 분석" },
  { tool: "image-compressor", area: "이미지 압축, 최적화" },
  { tool: "qr-generator", area: "QR코드 생성, 활용" },
  { tool: "json-formatter", area: "JSON 포맷팅, 데이터 처리" },
  { tool: "password-generator", area: "비밀번호 보안, 계정 관리" },
  { tool: "color-converter", area: "색상 코드, 디자인" },
  { tool: "base64", area: "인코딩, 데이터 변환" },
  { tool: "url-encoder", area: "URL 처리, 웹 개발" },
  { tool: "lorem-ipsum", area: "더미 텍스트, UI 디자인" },
  { tool: "timestamp-converter", area: "시간 변환, 타임존" },
  { tool: "hash-generator", area: "해시, 보안, 무결성" },
  { tool: "markdown-preview", area: "마크다운, 문서 작성" },
  { tool: "regex-tester", area: "정규표현식, 텍스트 처리" },
  { tool: "diff-checker", area: "텍스트 비교, 코드 리뷰" },
  { tool: "case-converter", area: "대소문자 변환, 네이밍" },
  { tool: "uuid-generator", area: "UUID, 고유 식별자" },
  { tool: "css-minifier", area: "CSS 최적화, 웹 성능" },
  { tool: "number-base-converter", area: "진법 변환, 컴퓨터 과학" },
  { tool: "text-counter", area: "텍스트 카운터, 글쓰기" },
];

// General topics not tied to a specific tool
const GENERAL_TOPICS = [
  "웹 개발자를 위한 필수 온라인 도구 모음",
  "프론트엔드 개발 생산성을 높이는 무료 도구",
  "SEO 최적화를 위한 텍스트 작성 팁",
  "웹사이트 성능 최적화 체크리스트",
  "개발자의 일상 업무를 자동화하는 방법",
  "디자이너와 개발자가 함께 쓰는 온라인 도구",
  "블로그 글쓰기 최적 길이와 구조",
  "모바일 최적화를 위한 이미지 처리 가이드",
  "API 디버깅에 필요한 도구와 팁",
  "보안을 위한 필수 개발자 습관",
];

async function generateTopic(existingSlugs) {
  const existingList = Array.from(existingSlugs).join(", ");

  const prompt = `You are a content strategist for toolkio.com, a free online tools website.

Existing blog slugs (DO NOT repeat these): ${existingList}

Available tools and their areas:
${TOOL_TOPICS.map((t) => `- ${t.tool}: ${t.area}`).join("\n")}

General topic ideas:
${GENERAL_TOPICS.join("\n")}

Generate ONE new blog post topic. It can be:
1. A new angle on one of the tools (advanced tips, specific use case, comparison)
2. A general topic about online tools, web development, or productivity

Output ONLY valid JSON (no markdown fences):
{
  "slug": "kebab-case-slug-in-english",
  "toolId": "tool-id-or-empty-string",
  "titleKo": "SEO optimized Korean title (40-60 chars)",
  "titleEn": "English title",
  "descKo": "Korean meta description (80-120 chars)",
  "descEn": "English meta description",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}

Rules:
- slug must be unique (not in existing list)
- Korean title should include target keyword naturally
- Keywords should mix Korean and English terms
- Focus on topics people actually search for`;

  const result = await callGemini(prompt, "Blog topic generator for Korean online tools website");
  const cleaned = result.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  return JSON.parse(cleaned);
}

// ─── Content generation ──────────────────────────────────────────────────────
async function generateContent(topic) {
  const prompt = `Write a blog post for toolkio.com (Korean online tools website).

Topic: ${topic.titleKo}
Description: ${topic.descKo}
Related tool: ${topic.toolId || "none"}

Output ONLY valid JSON (no markdown fences):
{
  "ko": [
    { "heading": "한국어 섹션 제목 1", "body": "한국어 본문 (200-400자, 자연스러운 한국어)..." },
    { "heading": "한국어 섹션 제목 2", "body": "..." },
    { "heading": "한국어 섹션 제목 3", "body": "..." },
    { "heading": "한국어 섹션 제목 4", "body": "..." }
  ],
  "en": [
    { "heading": "English Section Title 1", "body": "English body text (100-200 words)..." },
    { "heading": "English Section Title 2", "body": "..." },
    { "heading": "English Section Title 3", "body": "..." },
    { "heading": "English Section Title 4", "body": "..." }
  ]
}

Rules:
- Write 4 sections in each language
- Korean must be natural, NOT machine-translated
- Include practical, useful information
- Target keywords should appear naturally in headings and body
- Each section body should be 200-400 characters in Korean
- If a tool is related, include a section about using it on Toolkio
- Do NOT include any markdown formatting in body text
- Lists should use \\n- format (dash with newline)`;

  const result = await callGemini(prompt, "SEO blog content writer for Korean online tools website. Write natural Korean, not translated text.");
  const cleaned = result.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  return JSON.parse(cleaned);
}

// ─── FAQ generation ──────────────────────────────────────────────────────────
async function generateFAQ(topic) {
  const prompt = `Generate 3 FAQ items for this blog post.
Title: ${topic.titleKo}
Description: ${topic.descKo}

Output ONLY valid JSON (no markdown fences):
[
  { "question": "한국어 질문?", "answer": "한국어 답변 (2-3문장)" },
  { "question": "한국어 질문?", "answer": "한국어 답변 (2-3문장)" },
  { "question": "한국어 질문?", "answer": "한국어 답변 (2-3문장)" }
]

Rules:
- Questions people actually search for
- Concise, helpful answers (2-3 sentences each)
- Natural Korean`;

  try {
    const result = await callGemini(prompt, "FAQ generator");
    const cleaned = result.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

// ─── Image generation ────────────────────────────────────────────────────────
async function generateImage(topic) {
  const filepath = path.join(ROOT, "public/images/blog", `${topic.slug}.webp`);
  if (fs.existsSync(filepath) && fs.statSync(filepath).size > 5000) {
    console.log(`   ✅ Image already exists`);
    return;
  }

  // Generate prompt
  let imagePrompt;
  try {
    const promptResult = await callGemini(
      `Generate ONE English image prompt for a blog thumbnail about: "${topic.titleKo}".
Style: clean modern illustration, vibrant colors, dark background, professional quality, 8K.
Max 100 words. End with: "ABSOLUTELY NO text, letters, numbers, words, or characters of any language in the image."
Output ONLY the prompt.`,
      "Image prompt generator"
    );
    imagePrompt = promptResult.trim();
  } catch {
    imagePrompt = `Clean modern digital illustration about ${topic.titleEn}. Professional quality, vibrant colors, dark background, 8K. ABSOLUTELY NO text, letters, numbers, words, or characters of any language in the image.`;
  }

  console.log(`   📝 Image prompt: "${imagePrompt.slice(0, 80)}..."`);

  // Try Gemini Image
  const models = ["gemini-2.0-flash-exp-image-generation", "gemini-2.5-flash-image"];
  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Generate an image: ${imagePrompt}` }] }],
          generationConfig: { responseModalities: ["IMAGE", "TEXT"], temperature: 1.0 },
        }),
        signal: AbortSignal.timeout(90000),
      });
      if (!resp.ok) continue;
      const data = await resp.json();
      const parts = data?.candidates?.[0]?.content?.parts;
      if (!parts) continue;
      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith("image/")) {
          const buf = Buffer.from(part.inlineData.data, "base64");
          if (buf.length > 15000) {
            // Convert to WebP using sharp if available, otherwise save as-is
            try {
              const sharp = (await import("sharp")).default;
              await sharp(buf).webp({ quality: 80 }).resize(1200, null, { withoutEnlargement: true }).toFile(filepath);
            } catch {
              fs.writeFileSync(filepath, buf);
            }
            console.log(`   ✅ Image saved (${(fs.statSync(filepath).size / 1024).toFixed(0)}KB)`);
            return;
          }
        }
      }
    } catch { continue; }
  }

  // Fallback: try HuggingFace
  const hfKey = process.env.HUGGINGFACE_API_KEY;
  if (hfKey) {
    try {
      console.log(`   🔄 Trying HF FLUX...`);
      const resp = await fetch(
        "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${hfKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({ inputs: imagePrompt }),
          signal: AbortSignal.timeout(90000),
        }
      );
      if (resp.ok) {
        const buf = Buffer.from(await resp.arrayBuffer());
        if (buf.length > 15000) {
          try {
            const sharp = (await import("sharp")).default;
            await sharp(buf).webp({ quality: 80 }).resize(1200, null, { withoutEnlargement: true }).toFile(filepath);
          } catch {
            fs.writeFileSync(filepath, buf);
          }
          console.log(`   ✅ Image saved via HF (${(fs.statSync(filepath).size / 1024).toFixed(0)}KB)`);
          return;
        }
      }
    } catch {}
  }

  console.log(`   ⚠️ Image generation failed, post will have no image`);
}

// ─── Update blog.ts ──────────────────────────────────────────────────────────
function updateBlogFile(topic, content, faq) {
  const blogPath = path.join(ROOT, "src/lib/blog.ts");
  let blogFile = fs.readFileSync(blogPath, "utf-8");

  const today = new Date().toISOString().split("T")[0];
  const imagePath = `/images/blog/${topic.slug}.webp`;
  const hasImage = fs.existsSync(path.join(ROOT, "public", imagePath.slice(1)));

  // Escape content for TypeScript string
  const escapeTS = (s) => s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$").replace(/"/g, '\\"');

  const faqStr = faq
    ? `\n    faq: [\n${faq
        .map(
          (f) =>
            `      { question: "${escapeTS(f.question)}", answer: "${escapeTS(f.answer)}" }`
        )
        .join(",\n")}\n    ],`
    : "";

  const koSections = content.ko
    .map(
      (s) =>
        `        {\n          heading: "${escapeTS(s.heading)}",\n          body: "${escapeTS(s.body)}",\n        }`
    )
    .join(",\n");

  const enSections = content.en
    .map(
      (s) =>
        `        {\n          heading: "${escapeTS(s.heading)}",\n          body: "${escapeTS(s.body)}",\n        }`
    )
    .join(",\n");

  const newPost = `  {
    slug: "${topic.slug}",
    title: {
      ko: "${escapeTS(topic.titleKo)}",
      en: "${escapeTS(topic.titleEn)}",
    },
    description: {
      ko: "${escapeTS(topic.descKo)}",
      en: "${escapeTS(topic.descEn)}",
    },
    date: "${today}",
    toolId: "${topic.toolId || ""}",${hasImage ? `\n    image: "${imagePath}",` : ""}
    keywords: ${JSON.stringify(topic.keywords)},${faqStr}
    content: {
      ko: [
${koSections}
      ],
      en: [
${enSections}
      ],
    },
  }`;

  // Insert before final ];
  blogFile = blogFile.replace(/\n\];(\s*)$/, `,\n${newPost}\n];$1`);
  fs.writeFileSync(blogPath, blogFile);
  console.log(`   ✅ blog.ts updated`);
}

// ─── Update sitemap.xml ──────────────────────────────────────────────────────
function updateSitemap(slug) {
  const sitemapPath = path.join(ROOT, "public/sitemap.xml");
  let sitemap = fs.readFileSync(sitemapPath, "utf-8");

  const newEntry = `  <url>
    <loc>https://toolkio.com/blog/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;

  sitemap = sitemap.replace("</urlset>", `${newEntry}\n</urlset>`);
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`   ✅ sitemap.xml updated`);
}

// ─── Update rss.xml ──────────────────────────────────────────────────────────
function updateRSS(topic) {
  const rssPath = path.join(ROOT, "public/rss.xml");
  if (!fs.existsSync(rssPath)) return;

  let rss = fs.readFileSync(rssPath, "utf-8");
  const today = new Date().toUTCString();

  const escapeXml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const newItem = `    <item>
      <title>${escapeXml(topic.titleKo)}</title>
      <link>https://toolkio.com/blog/${topic.slug}</link>
      <description>${escapeXml(topic.descKo)}</description>
      <pubDate>${today}</pubDate>
      <guid isPermaLink="true">https://toolkio.com/blog/${topic.slug}</guid>
    </item>`;

  // Insert after the first <item> (after channel metadata)
  const firstItemIdx = rss.indexOf("<item>");
  if (firstItemIdx > -1) {
    rss = rss.slice(0, firstItemIdx) + newItem + "\n    " + rss.slice(firstItemIdx);
  }

  // Update lastBuildDate
  rss = rss.replace(/<lastBuildDate>[^<]*<\/lastBuildDate>/, `<lastBuildDate>${today}</lastBuildDate>`);

  fs.writeFileSync(rssPath, rss);

  // Copy to feed.xml
  const feedPath = path.join(ROOT, "public/feed.xml");
  if (fs.existsSync(feedPath)) fs.writeFileSync(feedPath, rss);

  console.log(`   ✅ rss.xml updated`);
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🚀 Toolkio Daily Blog Post Generator\n");

  const existingSlugs = getExistingSlugs();
  console.log(`📝 Existing posts: ${existingSlugs.size}`);

  // 1. Generate topic
  console.log("\n1️⃣ Generating topic...");
  const topic = await generateTopic(existingSlugs);
  console.log(`   📌 "${topic.titleKo}"`);
  console.log(`   🔗 slug: ${topic.slug}`);

  if (existingSlugs.has(topic.slug)) {
    console.log(`   ⚠️ Slug "${topic.slug}" already exists, adding suffix`);
    topic.slug += "-" + Date.now().toString(36).slice(-4);
  }

  // 2. Generate content
  console.log("\n2️⃣ Generating content...");
  const content = await generateContent(topic);
  console.log(`   ✅ ${content.ko.length} sections (ko), ${content.en.length} sections (en)`);

  // 3. Generate FAQ
  console.log("\n3️⃣ Generating FAQ...");
  const faq = await generateFAQ(topic);
  console.log(`   ✅ ${faq ? faq.length + " FAQ items" : "skipped"}`);

  // 4. Generate image
  console.log("\n4️⃣ Generating image...");
  await generateImage(topic);

  // 5. Update files
  console.log("\n5️⃣ Updating files...");
  updateBlogFile(topic, content, faq);
  updateSitemap(topic.slug);
  updateRSS(topic);

  console.log("\n═══════════════════════════════════════");
  console.log(`✅ New post created: ${topic.slug}`);
  console.log(`   Title: ${topic.titleKo}`);
  console.log(`   URL: https://toolkio.com/blog/${topic.slug}`);
  console.log("═══════════════════════════════════════");

  // Output for GitHub Actions
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `POST_SLUG=${topic.slug}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `POST_TITLE=${topic.titleKo}\n`);
  }
}

main().catch((err) => {
  console.error("❌ Fatal error:", err.message);
  process.exit(1);
});
