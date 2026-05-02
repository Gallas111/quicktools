import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { blogPosts } from "../src/lib/blog";
import { tools } from "../src/lib/tools";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = "https://toolkio.com";
const OUT = resolve(__dirname, "../public/sitemap.xml");

type Entry = { loc: string; changefreq: string; priority: string; lastmod?: string };

const entries: Entry[] = [];

entries.push({ loc: `${SITE}/`, changefreq: "weekly", priority: "1.0" });

for (const tool of tools) {
  entries.push({
    loc: `${SITE}/tools/${tool.id}/`,
    changefreq: "monthly",
    priority: "0.8",
  });
}

entries.push({ loc: `${SITE}/about/`, changefreq: "monthly", priority: "0.5" });
entries.push({ loc: `${SITE}/privacy/`, changefreq: "monthly", priority: "0.5" });
entries.push({ loc: `${SITE}/terms/`, changefreq: "monthly", priority: "0.5" });

entries.push({ loc: `${SITE}/blog/`, changefreq: "daily", priority: "0.9" });

const sortedPosts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
for (const post of sortedPosts) {
  entries.push({
    loc: `${SITE}/blog/${post.slug}/`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: post.date,
  });
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map((e) => {
    const lines = [
      "  <url>",
      `    <loc>${e.loc}</loc>`,
      `    <changefreq>${e.changefreq}</changefreq>`,
      `    <priority>${e.priority}</priority>`,
    ];
    if (e.lastmod) lines.push(`    <lastmod>${e.lastmod}</lastmod>`);
    lines.push("  </url>");
    return lines.join("\n");
  }),
  "</urlset>",
  "",
].join("\n");

writeFileSync(OUT, xml, "utf-8");

console.log(`✅ sitemap.xml 생성 완료 (${entries.length} URL)`);
console.log(`   - tools: ${tools.length}`);
console.log(`   - blog posts: ${blogPosts.length}`);
console.log(`   - static: ${entries.length - tools.length - blogPosts.length}`);
