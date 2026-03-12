import { createCanvas, registerFont } from "canvas";
import fs from "fs";
import path from "path";

// Register Korean font
registerFont("C:/Windows/Fonts/malgunbd.ttf", { family: "Malgun Gothic", weight: "bold" });
registerFont("C:/Windows/Fonts/malgun.ttf", { family: "Malgun Gothic", weight: "normal" });

const publicDir = path.join(process.cwd(), "public");

// --- Favicon (32x32, 16x16, 180x180, 192x192, 512x512) ---
function drawFavicon(ctx, size) {
  const s = size;
  const pad = s * 0.08;

  // Background - emerald/teal gradient (completely different from hotdeal)
  const gradient = ctx.createLinearGradient(0, 0, s, s);
  gradient.addColorStop(0, "#10b981");
  gradient.addColorStop(1, "#0d9488");

  const radius = s * 0.22;
  ctx.beginPath();
  ctx.roundRect(pad, pad, s - pad * 2, s - pad * 2, radius);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Draw "T" letter with wrench-style notch
  ctx.fillStyle = "#ffffff";
  const cx = s / 2;
  const cy = s / 2;

  // T horizontal bar
  const barW = s * 0.5;
  const barH = s * 0.12;
  const barX = cx - barW / 2;
  const barY = cy - s * 0.22;
  ctx.beginPath();
  ctx.roundRect(barX, barY, barW, barH, barH / 2);
  ctx.fill();

  // T vertical stem
  const stemW = s * 0.14;
  const stemH = s * 0.38;
  const stemX = cx - stemW / 2;
  const stemY = barY + barH - 1;
  ctx.beginPath();
  ctx.roundRect(stemX, stemY, stemW, stemH, stemW / 3);
  ctx.fill();

  // Small dot accent (like a tool joint)
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.beginPath();
  ctx.arc(cx + barW / 2 - s * 0.04, barY + barH / 2, s * 0.035, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx - barW / 2 + s * 0.04, barY + barH / 2, s * 0.035, 0, Math.PI * 2);
  ctx.fill();
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
      <stop offset="0%" style="stop-color:#10b981"/>
      <stop offset="100%" style="stop-color:#0d9488"/>
    </linearGradient>
  </defs>
  <rect x="2.5" y="2.5" width="27" height="27" rx="7" fill="url(#g)"/>
  <rect x="8" y="8.5" width="16" height="3.8" rx="1.9" fill="white"/>
  <rect x="13.8" y="11.5" width="4.4" height="12.5" rx="1.5" fill="white"/>
  <circle cx="22" cy="10.4" r="1.1" fill="rgba(255,255,255,0.4)"/>
  <circle cx="10" cy="10.4" r="1.1" fill="rgba(255,255,255,0.4)"/>
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
iconGradient.addColorStop(0, "#10b981");
iconGradient.addColorStop(1, "#0d9488");
ogCtx.beginPath();
ogCtx.roundRect(iconX, iconY, iconSize, iconSize, 16);
ogCtx.fillStyle = iconGradient;
ogCtx.fill();

// Icon "T" letter
ogCtx.fillStyle = "#ffffff";
const icx = ogWidth / 2;
const icy = iconY + iconSize / 2;
// T bar
ogCtx.beginPath();
ogCtx.roundRect(icx - 20, icy - 16, 40, 9, 4);
ogCtx.fill();
// T stem
ogCtx.beginPath();
ogCtx.roundRect(icx - 5, icy - 8, 10, 28, 4);
ogCtx.fill();

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
