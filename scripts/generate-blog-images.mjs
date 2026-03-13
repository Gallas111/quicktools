/**
 * Toolkio Blog Image Generator
 *
 * 6-tier fallback pipeline (same as ai-blog):
 * 1. Gemini Native Image (FREE)
 * 2. Together AI FLUX (FREE)
 * 3. Hugging Face FLUX (FREE)
 * 4. DALL-E 3 (PAID backup)
 * 5. Unsplash (FREE stock photos)
 * 6. Placeholder SVG (LOCAL, 0% failure)
 *
 * Usage: node scripts/generate-blog-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(ROOT, ".env.local") });

const OUTPUT_DIR = path.join(ROOT, "public", "images", "blog");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── Blog posts (matching src/lib/blog.ts slugs) ────────────────────────────
const BLOG_POSTS = [
  {
    slug: "how-to-count-characters",
    title: "글자수 세기 완벽 가이드",
    description: "글자수 세기, 공백 포함/제외, 바이트 계산",
    keywords: "character counting text tool keyboard typing",
  },
  {
    slug: "how-to-compress-images",
    title: "이미지 압축 방법 총정리",
    description: "이미지 압축, JPG PNG WebP 포맷 비교",
    keywords: "image compression file size optimization",
  },
  {
    slug: "how-to-create-qr-code",
    title: "QR코드 만드는 법",
    description: "QR코드 생성, 명함, 메뉴판 활용",
    keywords: "QR code scanning mobile technology",
  },
  {
    slug: "how-to-create-strong-password",
    title: "안전한 비밀번호 만드는 법",
    description: "비밀번호 보안, 해킹 방지",
    keywords: "password security lock cybersecurity",
  },
  {
    slug: "how-to-compare-text",
    title: "텍스트 비교하는 방법",
    description: "텍스트 비교, diff 도구, 코드 리뷰",
    keywords: "text comparison document diff code review",
  },
];

// ─── Gemini prompt generation ────────────────────────────────────────────────
async function generatePromptWithGemini(post) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const body = {
      contents: [{
        parts: [{
          text: `You are an expert AI image prompt engineer for a Korean online tools website (toolkio.com).
Generate ONE highly specific English image prompt for this blog post thumbnail.

Blog Title: "${post.title}"
Description: "${post.description}"

The image should clearly convey the blog topic at a glance.
DO NOT generate generic abstract art. Make it topic-specific.

Examples:
- "Character counting" → clean modern keyboard with floating holographic character count display, letters streaming upward with count numbers
- "Image compression" → large photo file being squeezed through a funnel into a smaller optimized version, file size indicators
- "QR code" → smartphone scanning a colorful QR code with data rays connecting to a website, modern flat design
- "Password security" → digital vault door with complex lock mechanism, shield icon, binary code background
- "Text comparison" → two document panels side by side with highlighted differences, green/red markers

Style: clean modern illustration, professional quality, vibrant colors on dark background, 8K, cinematic lighting
Output: ONE paragraph, max 100 words, English only
Final line: "ABSOLUTELY NO text, letters, numbers, words, or characters of any language in the image."

Output ONLY the prompt.`
        }]
      }],
    };

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30000),
    });

    if (!resp.ok) return null;
    const data = await resp.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return text && text.length > 20 ? text : null;
  } catch (err) {
    console.error(`   ⚠️ Gemini prompt gen failed: ${err.message}`);
    return null;
  }
}

function buildLocalPrompt(post) {
  return (
    `Clean modern digital illustration for a blog about "${post.title}". ` +
    `Theme: ${post.keywords}. ` +
    `Professional quality, vibrant colors, dark background with glowing elements, ` +
    `8K resolution, cinematic lighting, modern tech aesthetic. ` +
    `ABSOLUTELY NO text, NO letters, NO words, NO numbers, NO characters of any language.`
  );
}

// ─── Image generation sources ────────────────────────────────────────────────

// 1. Gemini Native Image
async function generateGeminiImage(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const models = [
    "gemini-2.0-flash-exp-image-generation",
    "gemini-2.5-flash-image",
  ];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const body = {
        contents: [{ parts: [{ text: `Generate an image: ${prompt}` }] }],
        generationConfig: { responseModalities: ["IMAGE", "TEXT"], temperature: 1.0 },
      };

      console.log(`   🔄 Gemini Image (${model})...`);
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(90000),
      });

      if (!resp.ok) continue;
      const data = await resp.json();
      const parts = data?.candidates?.[0]?.content?.parts;
      if (!parts) continue;

      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith("image/")) {
          const buf = Buffer.from(part.inlineData.data, "base64");
          if (buf.length > 15000) return buf;
        }
      }
    } catch { continue; }
  }
  return null;
}

// 2. Together AI FLUX
async function generateTogetherImage(prompt) {
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) return null;

  try {
    console.log(`   🔄 Together AI FLUX...`);
    const resp = await fetch("https://api.together.xyz/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "black-forest-labs/FLUX.1-schnell-Free",
        prompt, width: 1024, height: 1024, steps: 4, n: 1, response_format: "b64_json",
      }),
      signal: AbortSignal.timeout(60000),
    });

    if (!resp.ok) throw new Error(`Together ${resp.status}`);
    const data = await resp.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) return null;
    const buf = Buffer.from(b64, "base64");
    return buf.length > 15000 ? buf : null;
  } catch (err) {
    console.error(`   ❌ Together AI: ${err.message}`);
    return null;
  }
}

// 3. Hugging Face FLUX
async function generateHFImage(prompt) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) return null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`   🔄 HF FLUX attempt ${attempt}/3...`);
      const resp = await fetch(
        "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({ inputs: prompt }),
          signal: AbortSignal.timeout(90000),
        }
      );

      if (resp.status === 503 || resp.status === 429) {
        const wait = Math.pow(2, attempt) * 3000;
        console.log(`   ⏳ Waiting ${wait / 1000}s...`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }

      if (!resp.ok) throw new Error(`HF ${resp.status}`);
      const buf = Buffer.from(await resp.arrayBuffer());
      return buf.length > 15000 ? buf : null;
    } catch (err) {
      if (attempt === 3) console.error(`   ❌ HF FLUX: ${err.message}`);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  return null;
}

// 4. DALL-E 3
async function generateDalleImage(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  try {
    console.log(`   🔄 DALL-E 3...`);
    const resp = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "dall-e-3", prompt, n: 1, size: "1024x1024", quality: "standard" }),
      signal: AbortSignal.timeout(60000),
    });

    if (!resp.ok) throw new Error(`DALL-E ${resp.status}`);
    const data = await resp.json();
    const imageUrl = data?.data?.[0]?.url;
    if (!imageUrl) return null;

    const imgResp = await fetch(imageUrl, { signal: AbortSignal.timeout(30000) });
    if (!imgResp.ok) return null;
    const buf = Buffer.from(await imgResp.arrayBuffer());
    return buf.length > 15000 ? buf : null;
  } catch (err) {
    console.error(`   ❌ DALL-E 3: ${err.message}`);
    return null;
  }
}

// 5. Unsplash
async function fetchUnsplashImage(keywords) {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return null;

  try {
    console.log(`   🔄 Unsplash: "${keywords}"...`);
    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(keywords)}&orientation=landscape&content_filter=high`;
    const resp = await fetch(url, {
      headers: { Authorization: `Client-ID ${key}` },
      signal: AbortSignal.timeout(15000),
    });
    if (!resp.ok) throw new Error(`Unsplash ${resp.status}`);

    const data = await resp.json();
    const imageUrl = data?.urls?.regular;
    if (!imageUrl) return null;

    const imgResp = await fetch(imageUrl, { signal: AbortSignal.timeout(30000) });
    if (!imgResp.ok) return null;
    const buf = Buffer.from(await imgResp.arrayBuffer());
    return buf.length > 15000 ? buf : null;
  } catch (err) {
    console.error(`   ❌ Unsplash: ${err.message}`);
    return null;
  }
}

// 6. SVG Placeholder (0% failure)
function generatePlaceholderSVG(title) {
  const colors = [
    ["#10b981", "#059669"], // emerald
    ["#3b82f6", "#2563eb"], // blue
    ["#8b5cf6", "#7c3aed"], // violet
    ["#f59e0b", "#d97706"], // amber
    ["#ef4444", "#dc2626"], // red
  ];
  const idx = Array.from(title).reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
  const [c1, c2] = colors[idx];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c1};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${c2};stop-opacity:1"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" rx="0"/>
  <circle cx="600" cy="280" r="80" fill="white" fill-opacity="0.15"/>
  <circle cx="600" cy="280" r="50" fill="white" fill-opacity="0.2"/>
  <text x="600" y="295" text-anchor="middle" fill="white" font-size="48" font-family="Arial, sans-serif" font-weight="bold">T</text>
  <text x="600" y="420" text-anchor="middle" fill="white" font-size="24" font-family="Arial, sans-serif" fill-opacity="0.9">Toolkio</text>
</svg>`;
  return Buffer.from(svg);
}

// ─── Main Orchestrator ───────────────────────────────────────────────────────
async function generateImage(post) {
  const filepath = path.join(OUTPUT_DIR, `${post.slug}.png`);

  // Skip if already exists and valid
  if (fs.existsSync(filepath)) {
    const stat = fs.statSync(filepath);
    if (stat.size > 15000) {
      console.log(`✅ [Skip] ${post.slug} — already exists (${(stat.size / 1024).toFixed(0)}KB)`);
      return filepath;
    }
  }

  console.log(`\n🎨 Generating image for: ${post.slug}`);

  const save = (buf, source) => {
    fs.writeFileSync(filepath, buf);
    console.log(`   ✅ [${source}] Saved — ${(buf.length / 1024).toFixed(0)}KB → ${post.slug}.png`);
    return filepath;
  };

  // Generate prompt
  let prompt = await generatePromptWithGemini(post);
  if (!prompt) prompt = buildLocalPrompt(post);
  console.log(`   📝 Prompt: "${prompt.slice(0, 100)}..."`);

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  // 1. Gemini Native
  try {
    console.log(`   🌟 [1/6] Gemini Image...`);
    const buf = await generateGeminiImage(prompt);
    if (buf) return save(buf, "Gemini Image");
  } catch { /* fall through */ }
  await delay(1000);

  // 2. Together AI
  try {
    console.log(`   🚀 [2/6] Together AI...`);
    const buf = await generateTogetherImage(prompt);
    if (buf) return save(buf, "Together AI");
  } catch { /* fall through */ }
  await delay(1000);

  // 3. HF FLUX
  try {
    console.log(`   🔧 [3/6] HF FLUX...`);
    const buf = await generateHFImage(prompt);
    if (buf) return save(buf, "HF FLUX");
  } catch { /* fall through */ }
  await delay(1000);

  // 4. DALL-E 3
  try {
    console.log(`   💰 [4/6] DALL-E 3...`);
    const buf = await generateDalleImage(prompt);
    if (buf) return save(buf, "DALL-E 3");
  } catch { /* fall through */ }
  await delay(1000);

  // 5. Unsplash
  try {
    console.log(`   🔍 [5/6] Unsplash...`);
    const buf = await fetchUnsplashImage(post.keywords);
    if (buf) return save(buf, "Unsplash");
  } catch { /* fall through */ }

  // 6. SVG Placeholder
  console.log(`   🛡️ [6/6] Placeholder SVG...`);
  const svgPath = path.join(OUTPUT_DIR, `${post.slug}.svg`);
  const svgBuf = generatePlaceholderSVG(post.title);
  fs.writeFileSync(svgPath, svgBuf);
  console.log(`   ✅ [Placeholder] Saved SVG → ${post.slug}.svg`);
  return svgPath;
}

// ─── Run ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🖼️  Toolkio Blog Image Generator");
  console.log(`📂 Output: ${OUTPUT_DIR}`);
  console.log(`📝 Posts: ${BLOG_POSTS.length}\n`);

  const results = [];
  for (const post of BLOG_POSTS) {
    const result = await generateImage(post);
    results.push({ slug: post.slug, path: result });
  }

  console.log("\n═══════════════════════════════════════");
  console.log("📊 Results:");
  for (const r of results) {
    const exists = fs.existsSync(r.path);
    const size = exists ? (fs.statSync(r.path).size / 1024).toFixed(0) + "KB" : "FAILED";
    console.log(`   ${exists ? "✅" : "❌"} ${r.slug} — ${size}`);
  }
  console.log("═══════════════════════════════════════");
}

main().catch(console.error);
