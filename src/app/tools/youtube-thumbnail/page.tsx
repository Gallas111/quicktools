"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale } from "@/components/LocaleProvider";

/* ─── Template type ─── */
interface ThumbnailTemplate {
  id: string;
  name: { ko: string; en: string };
  bg: string[];          // gradient color stops
  textColor: string;
  subTextColor: string;
  textStroke: string;
  textShadow: string;
  textY: number;         // vertical position ratio (0-1)
  fontFamily: string;
  decorations: string;   // identifier for decoration drawing
  overlayBar: boolean;
}

/* ─── 10 templates ─── */
const templates: ThumbnailTemplate[] = [
  {
    id: "bold-red",
    name: { ko: "볼드 레드", en: "Bold Red" },
    bg: ["#e53e3e", "#dd6b20"],
    textColor: "#ffffff",
    subTextColor: "#fefcbf",
    textStroke: "#000000",
    textShadow: "rgba(0,0,0,0.7)",
    textY: 0.5,
    fontFamily: "'Arial Black', 'Impact', sans-serif",
    decorations: "diagonal-stripes",
    overlayBar: false,
  },
  {
    id: "blue-purple",
    name: { ko: "블루 퍼플", en: "Blue Purple" },
    bg: ["#4299e1", "#805ad5"],
    textColor: "#ffffff",
    subTextColor: "#e9d8fd",
    textStroke: "#1a202c",
    textShadow: "rgba(0,0,0,0.6)",
    textY: 0.5,
    fontFamily: "'Arial Black', 'Impact', sans-serif",
    decorations: "circles",
    overlayBar: false,
  },
  {
    id: "green-teal",
    name: { ko: "그린 틸", en: "Green Teal" },
    bg: ["#38a169", "#319795"],
    textColor: "#ffffff",
    subTextColor: "#c6f6d5",
    textStroke: "#1a202c",
    textShadow: "rgba(0,0,0,0.6)",
    textY: 0.52,
    fontFamily: "'Arial Black', 'Impact', sans-serif",
    decorations: "corner-accents",
    overlayBar: true,
  },
  {
    id: "dark-cinematic",
    name: { ko: "다크 시네마", en: "Dark Cinematic" },
    bg: ["#1a202c", "#2d3748"],
    textColor: "#f7fafc",
    subTextColor: "#a0aec0",
    textStroke: "#000000",
    textShadow: "rgba(0,0,0,0.9)",
    textY: 0.55,
    fontFamily: "'Arial Black', 'Impact', sans-serif",
    decorations: "vignette",
    overlayBar: true,
  },
  {
    id: "bright-vibrant",
    name: { ko: "브라이트", en: "Bright Vibrant" },
    bg: ["#f6e05e", "#ed64a6"],
    textColor: "#1a202c",
    subTextColor: "#553c9a",
    textStroke: "#ffffff",
    textShadow: "rgba(255,255,255,0.5)",
    textY: 0.5,
    fontFamily: "'Arial Black', 'Impact', sans-serif",
    decorations: "dots",
    overlayBar: false,
  },
  {
    id: "minimal-white",
    name: { ko: "미니멀 화이트", en: "Minimal White" },
    bg: ["#ffffff", "#edf2f7"],
    textColor: "#1a202c",
    subTextColor: "#718096",
    textStroke: "",
    textShadow: "rgba(0,0,0,0.1)",
    textY: 0.5,
    fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
    decorations: "line-accent",
    overlayBar: false,
  },
  {
    id: "gaming-neon",
    name: { ko: "게이밍 네온", en: "Gaming Neon" },
    bg: ["#0d0d0d", "#1a0533"],
    textColor: "#00ff88",
    subTextColor: "#00ccff",
    textStroke: "#000000",
    textShadow: "rgba(0,255,136,0.6)",
    textY: 0.5,
    fontFamily: "'Impact', 'Arial Black', sans-serif",
    decorations: "neon-border",
    overlayBar: false,
  },
  {
    id: "news-breaking",
    name: { ko: "뉴스 속보", en: "Breaking News" },
    bg: ["#c53030", "#9b2c2c"],
    textColor: "#ffffff",
    subTextColor: "#fed7d7",
    textStroke: "#000000",
    textShadow: "rgba(0,0,0,0.8)",
    textY: 0.42,
    fontFamily: "'Arial Black', 'Impact', sans-serif",
    decorations: "news-banner",
    overlayBar: false,
  },
  {
    id: "tutorial",
    name: { ko: "튜토리얼", en: "Tutorial" },
    bg: ["#2b6cb0", "#2c5282"],
    textColor: "#ffffff",
    subTextColor: "#bee3f8",
    textStroke: "#1a365d",
    textShadow: "rgba(0,0,0,0.5)",
    textY: 0.45,
    fontFamily: "'Arial Black', 'Impact', sans-serif",
    decorations: "step-badge",
    overlayBar: true,
  },
  {
    id: "top10-list",
    name: { ko: "TOP 10 리스트", en: "Top 10 List" },
    bg: ["#d69e2e", "#b7791f"],
    textColor: "#ffffff",
    subTextColor: "#fefcbf",
    textStroke: "#000000",
    textShadow: "rgba(0,0,0,0.7)",
    textY: 0.55,
    fontFamily: "'Impact', 'Arial Black', sans-serif",
    decorations: "top-number",
    overlayBar: true,
  },
];

/* ─── Canvas rendering ─── */
function drawTemplate(
  ctx: CanvasRenderingContext2D,
  tpl: ThumbnailTemplate,
  mainText: string,
  subText: string,
  bgImage: HTMLImageElement | null,
  fontSize: number,
  customTextColor: string
) {
  const W = 1280;
  const H = 720;
  ctx.clearRect(0, 0, W, H);

  /* 1. Background gradient */
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, tpl.bg[0]);
  grad.addColorStop(1, tpl.bg[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  /* 2. Background image if provided */
  if (bgImage) {
    const imgRatio = bgImage.width / bgImage.height;
    const canvasRatio = W / H;
    let sx = 0, sy = 0, sw = bgImage.width, sh = bgImage.height;
    if (imgRatio > canvasRatio) {
      sw = bgImage.height * canvasRatio;
      sx = (bgImage.width - sw) / 2;
    } else {
      sh = bgImage.width / canvasRatio;
      sy = (bgImage.height - sh) / 2;
    }
    ctx.drawImage(bgImage, sx, sy, sw, sh, 0, 0, W, H);
    // darken overlay so text is readable
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, W, H);
  }

  /* 3. Decorations */
  drawDecorations(ctx, tpl, W, H);

  /* 4. Overlay bar for text readability */
  if (tpl.overlayBar) {
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    const barY = H * tpl.textY - fontSize * 0.8;
    const barH = fontSize * 2.2 + (subText ? fontSize * 0.7 : 0);
    ctx.fillRect(0, barY, W, barH);
  }

  /* 5. Main text */
  const textColor = customTextColor || tpl.textColor;
  const mainFontSize = fontSize;
  ctx.font = `bold ${mainFontSize}px ${tpl.fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const mainY = H * tpl.textY;

  // shadow
  ctx.shadowColor = tpl.textShadow;
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;

  // stroke (outline)
  if (tpl.textStroke) {
    ctx.strokeStyle = tpl.textStroke;
    ctx.lineWidth = Math.max(3, mainFontSize / 18);
    ctx.lineJoin = "round";
    wrapText(ctx, mainText || (tpl.name.ko), W / 2, mainY, W - 120, mainFontSize * 1.1, true);
  }

  // fill
  ctx.fillStyle = textColor;
  wrapText(ctx, mainText || (tpl.name.ko), W / 2, mainY, W - 120, mainFontSize * 1.1, false);

  // reset shadow
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  /* 6. Sub text */
  if (subText) {
    const subFontSize = Math.round(mainFontSize * 0.4);
    ctx.font = `bold ${subFontSize}px ${tpl.fontFamily}`;
    ctx.fillStyle = tpl.subTextColor;
    ctx.shadowColor = tpl.textShadow;
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    const lines = getWrappedLines(ctx, mainText || tpl.name.ko, W - 120, mainFontSize);
    const mainBlockH = lines.length * mainFontSize * 1.1;
    const subY = mainY + mainBlockH / 2 + subFontSize * 1.2;
    ctx.fillText(subText, W / 2, subY, W - 120);

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }
}

/* Word-wrap helper */
function getWrappedLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, _fontSize: number): string[] {
  const chars = text.split("");
  const lines: string[] = [];
  let line = "";
  for (const ch of chars) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line.length > 0) {
      lines.push(line);
      line = ch;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  stroke: boolean
) {
  const lines = getWrappedLines(ctx, text, maxWidth, lineHeight);
  const totalH = lines.length * lineHeight;
  const startY = y - totalH / 2 + lineHeight / 2;
  for (let i = 0; i < lines.length; i++) {
    const ly = startY + i * lineHeight;
    if (stroke) {
      ctx.strokeText(lines[i], x, ly, maxWidth);
    } else {
      ctx.fillText(lines[i], x, ly, maxWidth);
    }
  }
}

/* Decoration drawing */
function drawDecorations(ctx: CanvasRenderingContext2D, tpl: ThumbnailTemplate, W: number, H: number) {
  switch (tpl.decorations) {
    case "diagonal-stripes": {
      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 40;
      for (let i = -H; i < W + H; i += 120) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + H, H);
        ctx.stroke();
      }
      ctx.restore();
      break;
    }
    case "circles": {
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath(); ctx.arc(W * 0.85, H * 0.2, 200, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(W * 0.1, H * 0.8, 150, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(W * 0.5, H * 0.1, 80, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      break;
    }
    case "corner-accents": {
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = "#ffffff";
      // top-left triangle
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(200, 0); ctx.lineTo(0, 200); ctx.closePath(); ctx.fill();
      // bottom-right triangle
      ctx.beginPath(); ctx.moveTo(W, H); ctx.lineTo(W - 200, H); ctx.lineTo(W, H - 200); ctx.closePath(); ctx.fill();
      ctx.restore();
      break;
    }
    case "vignette": {
      const vigGrad = ctx.createRadialGradient(W / 2, H / 2, W * 0.25, W / 2, H / 2, W * 0.7);
      vigGrad.addColorStop(0, "rgba(0,0,0,0)");
      vigGrad.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, W, H);
      // subtle film grain lines
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      for (let i = 0; i < W; i += 4) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke();
      }
      ctx.restore();
      break;
    }
    case "dots": {
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = "#000000";
      for (let x = 30; x < W; x += 60) {
        for (let y = 30; y < H; y += 60) {
          ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.restore();
      break;
    }
    case "line-accent": {
      ctx.save();
      ctx.strokeStyle = "#4299e1";
      ctx.lineWidth = 6;
      // top accent line
      ctx.beginPath(); ctx.moveTo(W * 0.3, 80); ctx.lineTo(W * 0.7, 80); ctx.stroke();
      // bottom accent line
      ctx.beginPath(); ctx.moveTo(W * 0.3, H - 80); ctx.lineTo(W * 0.7, H - 80); ctx.stroke();
      // left vertical
      ctx.strokeStyle = "#ed64a6";
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(60, H * 0.2); ctx.lineTo(60, H * 0.8); ctx.stroke();
      ctx.restore();
      break;
    }
    case "neon-border": {
      ctx.save();
      // outer glow border
      ctx.shadowColor = "#00ff88";
      ctx.shadowBlur = 30;
      ctx.strokeStyle = "#00ff88";
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 30, W - 60, H - 60);
      // inner secondary glow
      ctx.shadowColor = "#00ccff";
      ctx.shadowBlur = 20;
      ctx.strokeStyle = "#00ccff";
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 50, W - 100, H - 100);
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      // grid lines
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = "#00ff88";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 80) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 80) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.restore();
      break;
    }
    case "news-banner": {
      // "BREAKING" banner bar at top
      ctx.save();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W, 70);
      ctx.fillStyle = "#c53030";
      ctx.font = "bold 36px 'Arial Black', 'Impact', sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText("BREAKING NEWS", 30, 36);
      // bottom ticker bar
      ctx.fillStyle = "rgba(0,0,0,0.8)";
      ctx.fillRect(0, H - 80, W, 80);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px 'Arial', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("LIVE", W / 2, H - 40);
      ctx.restore();
      break;
    }
    case "step-badge": {
      ctx.save();
      // "HOW TO" badge top-left
      ctx.fillStyle = "#f6e05e";
      roundRect(ctx, 40, 40, 200, 60, 12);
      ctx.fill();
      ctx.fillStyle = "#1a202c";
      ctx.font = "bold 28px 'Arial Black', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("HOW TO", 140, 70);
      // step dots at bottom
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(W / 2 - 100 + i * 50, H - 60, 10, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#f6e05e";
      ctx.beginPath();
      ctx.arc(W / 2 - 100, H - 60, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      break;
    }
    case "top-number": {
      ctx.save();
      // Large "TOP" text in background
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 350px 'Impact', 'Arial Black', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("TOP", W / 2, H / 2);
      // "10" slightly below
      ctx.font = "bold 250px 'Impact', 'Arial Black', sans-serif";
      ctx.fillText("10", W / 2, H / 2 + 50);
      // crown/star at top
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#f6e05e";
      ctx.beginPath();
      const cx = W / 2, cy = 80;
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const r = i === 0 ? 0 : 40;
        const method = i === 0 ? "moveTo" : "lineTo";
        ctx[method](cx + 40 * Math.cos(angle), cy + 40 * Math.sin(angle));
        const midAngle = angle + (2 * Math.PI) / 5;
        ctx.lineTo(cx + 18 * Math.cos(midAngle), cy + 18 * Math.sin(midAngle));
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      break;
    }
  }
}

/* Rounded rect helper */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ─── Mini preview for template cards ─── */
function drawMiniPreview(canvas: HTMLCanvasElement, tpl: ThumbnailTemplate) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // scaled gradient
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, tpl.bg[0]);
  grad.addColorStop(1, tpl.bg[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // simple text preview
  ctx.fillStyle = tpl.textColor;
  ctx.font = `bold 14px ${tpl.fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Aa", W / 2, H / 2);
}

/* ─── Component ─── */
export default function YouTubeThumbnail() {
  const { locale } = useLocale();

  const [selectedTemplate, setSelectedTemplate] = useState<string>("bold-red");
  const [mainText, setMainText] = useState("");
  const [subText, setSubText] = useState("");
  const [fontSize, setFontSize] = useState(80);
  const [textColor, setTextColor] = useState("");
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
  const [bgFileName, setBgFileName] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const miniCanvasRefs = useRef<Map<string, HTMLCanvasElement>>(new Map());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTemplate = templates.find((t) => t.id === selectedTemplate) || templates[0];

  /* Draw mini previews once */
  useEffect(() => {
    templates.forEach((tpl) => {
      const canvas = miniCanvasRefs.current.get(tpl.id);
      if (canvas) drawMiniPreview(canvas, tpl);
    });
  }, []);

  /* Re-render main canvas on state change */
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawTemplate(ctx, currentTemplate, mainText, subText, bgImage, fontSize, textColor);
  }, [currentTemplate, mainText, subText, bgImage, fontSize, textColor]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  /* Handle background image upload */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBgFileName(file.name);
    const img = new Image();
    img.onload = () => setBgImage(img);
    img.src = URL.createObjectURL(file);
  };

  const removeImage = () => {
    setBgImage(null);
    setBgFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* Download */
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "youtube-thumbnail.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  /* When template changes, reset text color to template default */
  const handleTemplateSelect = (id: string) => {
    setSelectedTemplate(id);
    const tpl = templates.find((t) => t.id === id);
    if (tpl) setTextColor(tpl.textColor);
  };

  // initialize text color
  useEffect(() => {
    if (!textColor) setTextColor(currentTemplate.textColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "유튜브 썸네일 만들기" : "YouTube Thumbnail Maker"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "템플릿을 선택하고 텍스트만 입력하면 유튜브 썸네일(1280x720)을 바로 만들 수 있습니다."
          : "Select a template, type your text, and instantly create a YouTube thumbnail (1280x720)."}
      </p>

      {/* ─── Template selector ─── */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {locale === "ko" ? "템플릿 선택" : "Choose Template"}
        </label>
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-5 md:grid-cols-10">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => handleTemplateSelect(tpl.id)}
              className={`group relative flex flex-col items-center rounded-xl border-2 p-1.5 transition-all ${
                selectedTemplate === tpl.id
                  ? "border-blue-500 ring-2 ring-blue-300 dark:ring-blue-700"
                  : "border-gray-200 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
              }`}
            >
              <canvas
                ref={(el) => {
                  if (el) miniCanvasRefs.current.set(tpl.id, el);
                }}
                width={96}
                height={54}
                className="rounded-lg w-full"
              />
              <span className="mt-1 text-[10px] leading-tight text-gray-600 dark:text-gray-400 text-center">
                {locale === "ko" ? tpl.name.ko : tpl.name.en}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Customization panel ─── */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        {/* Main text */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "메인 텍스트 (큰 글씨)" : "Main Text (headline)"}
          </label>
          <input
            type="text"
            value={mainText}
            onChange={(e) => setMainText(e.target.value)}
            placeholder={locale === "ko" ? "썸네일 제목을 입력하세요" : "Enter thumbnail headline"}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:ring-blue-800"
          />
        </div>

        {/* Sub text */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "서브 텍스트 (작은 글씨)" : "Sub Text (subtitle)"}
          </label>
          <input
            type="text"
            value={subText}
            onChange={(e) => setSubText(e.target.value)}
            placeholder={locale === "ko" ? "부제목 (선택사항)" : "Subtitle (optional)"}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:ring-blue-800"
          />
        </div>

        {/* Font size */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "글자 크기" : "Font Size"}: {fontSize}px
          </label>
          <input
            type="range"
            min={30}
            max={160}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        {/* Text color */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "글자 색상" : "Text Color"}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={textColor || currentTemplate.textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded border border-gray-200 dark:border-gray-700"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">{textColor || currentTemplate.textColor}</span>
          </div>
        </div>

        {/* Background image */}
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "배경 이미지 (선택사항)" : "Background Image (optional)"}
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {locale === "ko" ? "이미지 업로드" : "Upload Image"}
            </button>
            {bgFileName && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>{bgFileName}</span>
                <button
                  onClick={removeImage}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  X
                </button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* ─── Canvas preview ─── */}
      <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="w-full"
          style={{ aspectRatio: "1280/720" }}
        />
      </div>

      {/* ─── Download button ─── */}
      <div className="mb-12 flex justify-center">
        <button
          onClick={handleDownload}
          className="rounded-xl bg-gray-900 px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          {locale === "ko" ? "PNG 다운로드 (1280x720)" : "Download PNG (1280x720)"}
        </button>
      </div>

      {/* ─── Info section ─── */}
      <div className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "유튜브 썸네일 만들기란?" : "What is a YouTube Thumbnail Maker?"}
        </h2>
        <p>
          {locale === "ko"
            ? "유튜브 썸네일은 영상의 첫인상을 결정하는 중요한 요소입니다. 이 도구를 사용하면 디자인 경험 없이도 전문적인 썸네일을 빠르게 만들 수 있습니다. 10가지 스타일의 템플릿에서 원하는 것을 고르고, 제목만 입력하면 1280x720 해상도의 고품질 썸네일이 완성됩니다."
            : "YouTube thumbnails are a critical factor that determines the first impression of your video. This tool lets you create professional thumbnails quickly without any design experience. Choose from 10 different template styles, type your title, and get a high-quality 1280x720 thumbnail instantly."}
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "주요 기능" : "Key Features"}
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            {locale === "ko"
              ? "10가지 템플릿: 볼드, 시네마틱, 게이밍, 뉴스, 튜토리얼 등 다양한 스타일"
              : "10 Templates: Bold, Cinematic, Gaming, News, Tutorial and more styles"}
          </li>
          <li>
            {locale === "ko"
              ? "실시간 미리보기: 텍스트를 입력하면 바로 결과를 확인"
              : "Real-time preview: See results instantly as you type"}
          </li>
          <li>
            {locale === "ko"
              ? "배경 이미지 업로드: 나만의 사진을 배경으로 사용 가능"
              : "Background image upload: Use your own photos as backgrounds"}
          </li>
          <li>
            {locale === "ko"
              ? "커스터마이징: 글자 크기, 색상 자유 조절"
              : "Customization: Freely adjust font size and color"}
          </li>
          <li>
            {locale === "ko"
              ? "PNG 다운로드: 유튜브 권장 해상도 1280x720으로 저장"
              : "PNG download: Saved at YouTube recommended resolution 1280x720"}
          </li>
          <li>
            {locale === "ko"
              ? "100% 브라우저 처리: 서버 업로드 없이 안전하게 작업"
              : "100% browser-based: Works safely without any server uploads"}
          </li>
        </ul>
      </div>
    </div>
  );
}
