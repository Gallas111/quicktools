/**
 * Generate RSS feed from blog posts in src/lib/blog.ts
 *
 * Usage: node scripts/generate-rss.mjs
 *
 * Reads blog.ts, extracts slug/title/description/date for each post,
 * and writes public/rss.xml and public/feed.xml.
 */

import { readFileSync, writeFileSync, copyFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, "..");

const blogTs = readFileSync(join(root, "src/lib/blog.ts"), "utf-8");

// Extract all blog post entries using regex
const postRegex =
  /slug:\s*"([^"]+)"[\s\S]*?title:\s*\{[\s\S]*?ko:\s*"([^"]+)"[\s\S]*?\}[\s\S]*?description:\s*\{[\s\S]*?ko:\s*"([^"]+)"[\s\S]*?\}[\s\S]*?date:\s*"([^"]+)"/g;

const posts = [];
let match;
while ((match = postRegex.exec(blogTs)) !== null) {
  posts.push({
    slug: match[1],
    title: match[2],
    description: match[3],
    date: match[4],
  });
}

console.log(`Found ${posts.length} blog posts`);

function toRFC822(dateStr) {
  const d = new Date(dateStr + "T00:00:00+09:00");
  return d.toUTCString().replace("GMT", "+0900");
}

const now = toRFC822(new Date().toISOString().slice(0, 10));

const items = posts
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>https://toolkio.com/blog/${p.slug}</link>
      <description>${escapeXml(p.description)}</description>
      <pubDate>${toRFC822(p.date)}</pubDate>
      <guid isPermaLink="true">https://toolkio.com/blog/${p.slug}</guid>
    </item>`
  )
  .join("\n");

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Toolkio 블로그</title>
    <link>https://toolkio.com/blog</link>
    <description>무료 온라인 도구 사용법과 팁을 소개하는 Toolkio 블로그</description>
    <language>ko</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="https://toolkio.com/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

const outPath = join(root, "public/rss.xml");
const feedPath = join(root, "public/feed.xml");

writeFileSync(outPath, rss, "utf-8");
copyFileSync(outPath, feedPath);

console.log(`Written ${outPath}`);
console.log(`Written ${feedPath}`);
