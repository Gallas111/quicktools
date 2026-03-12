import { createCanvas, registerFont } from "canvas";
import fs from "fs";
import path from "path";

// Register Korean font
registerFont("C:/Windows/Fonts/malgunbd.ttf", { family: "Malgun Gothic", weight: "bold" });
registerFont("C:/Windows/Fonts/malgun.ttf", { family: "Malgun Gothic", weight: "normal" });

const publicDir = path.join(process.cwd(), "public");

// --- Favicon (32x32, 16x16, 180x180, 192x192, 512x512) ---
function drawFavicon(ctx, size) {
  // Background - rounded square with gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, "#3b82f6");
  gradient.addColorStop(1, "#8b5cf6");

  const radius = size * 0.2;
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, radius);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Lightning bolt ⚡
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${size * 0.55}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("⚡", size / 2, size / 2 + size * 0.02);
}

const faviconSizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

for (const { name, size } of faviconSizes) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  drawFavicon(ctx, size);
  fs.writeFileSync(path.join(publicDir, name), canvas.toBuffer("image/png"));
  console.log(`Created ${name}`);
}

// --- SVG Favicon ---
const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6"/>
      <stop offset="100%" style="stop-color:#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="6" fill="url(#g)"/>
  <text x="16" y="22" font-size="20" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">⚡</text>
</svg>`;
fs.writeFileSync(path.join(publicDir, "favicon.svg"), svgFavicon);
console.log("Created favicon.svg");

// --- OG Image (1200x630) ---
const ogWidth = 1200;
const ogHeight = 630;
const ogCanvas = createCanvas(ogWidth, ogHeight);
const ogCtx = ogCanvas.getContext("2d");

// Background gradient
const bgGradient = ogCtx.createLinearGradient(0, 0, ogWidth, ogHeight);
bgGradient.addColorStop(0, "#0f172a");
bgGradient.addColorStop(1, "#1e293b");
ogCtx.fillStyle = bgGradient;
ogCtx.fillRect(0, 0, ogWidth, ogHeight);

// Decorative circles
ogCtx.globalAlpha = 0.08;
ogCtx.fillStyle = "#3b82f6";
ogCtx.beginPath();
ogCtx.arc(1000, 100, 300, 0, Math.PI * 2);
ogCtx.fill();
ogCtx.fillStyle = "#8b5cf6";
ogCtx.beginPath();
ogCtx.arc(200, 500, 250, 0, Math.PI * 2);
ogCtx.fill();
ogCtx.globalAlpha = 1;

// Icon background
const iconSize = 80;
const iconX = ogWidth / 2 - iconSize / 2;
const iconY = 160;
const iconGradient = ogCtx.createLinearGradient(iconX, iconY, iconX + iconSize, iconY + iconSize);
iconGradient.addColorStop(0, "#3b82f6");
iconGradient.addColorStop(1, "#8b5cf6");
ogCtx.beginPath();
ogCtx.roundRect(iconX, iconY, iconSize, iconSize, 16);
ogCtx.fillStyle = iconGradient;
ogCtx.fill();

// Icon text
ogCtx.fillStyle = "#ffffff";
ogCtx.font = "bold 44px Arial";
ogCtx.textAlign = "center";
ogCtx.textBaseline = "middle";
ogCtx.fillText("⚡", ogWidth / 2, iconY + iconSize / 2 + 2);

// Title
ogCtx.fillStyle = "#ffffff";
ogCtx.font = "bold 64px 'Malgun Gothic'";
ogCtx.textAlign = "center";
ogCtx.fillText("Toolkio", ogWidth / 2, 320);

// Subtitle
ogCtx.fillStyle = "#94a3b8";
ogCtx.font = "32px 'Malgun Gothic'";
ogCtx.fillText("무료 온라인 도구 모음 | Free Online Tools", ogWidth / 2, 390);

// Tool pills
const tools = ["글자수 세기", "이미지 압축", "QR코드", "JSON", "비밀번호", "색상 변환"];
const pillY = 470;
const pillHeight = 40;
const pillPadding = 24;
const pillGap = 16;

ogCtx.font = "20px 'Malgun Gothic'";
let totalWidth = 0;
const pillWidths = tools.map((t) => {
  const w = ogCtx.measureText(t).width + pillPadding * 2;
  totalWidth += w + pillGap;
  return w;
});
totalWidth -= pillGap;

let pillX = (ogWidth - totalWidth) / 2;
tools.forEach((tool, i) => {
  const w = pillWidths[i];
  ogCtx.fillStyle = "rgba(59, 130, 246, 0.15)";
  ogCtx.beginPath();
  ogCtx.roundRect(pillX, pillY, w, pillHeight, pillHeight / 2);
  ogCtx.fill();

  ogCtx.fillStyle = "#60a5fa";
  ogCtx.textAlign = "center";
  ogCtx.textBaseline = "middle";
  ogCtx.fillText(tool, pillX + w / 2, pillY + pillHeight / 2);

  pillX += w + pillGap;
});

// URL at bottom
ogCtx.fillStyle = "#64748b";
ogCtx.font = "24px 'Malgun Gothic'";
ogCtx.textAlign = "center";
ogCtx.fillText("toolkio.com", ogWidth / 2, 560);

fs.writeFileSync(path.join(publicDir, "og-image.png"), ogCanvas.toBuffer("image/png"));
console.log("Created og-image.png");

console.log("\nAll assets generated!");
