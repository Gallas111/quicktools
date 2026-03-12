"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { useLocale } from "@/components/LocaleProvider";

export default function QRGenerator() {
  const [text, setText] = useState("https://");
  const [size, setSize] = useState(300);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { locale, t } = useLocale();

  useEffect(() => {
    if (!text.trim()) {
      setQrDataUrl("");
      return;
    }
    QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      color: { dark: fgColor, light: bgColor },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(""));
  }, [text, size, fgColor, bgColor]);

  const downloadQR = async (format: "png" | "svg") => {
    if (!text.trim()) return;

    if (format === "svg") {
      const svgString = await QRCode.toString(text, {
        type: "svg",
        width: size,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
      });
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qrcode.svg";
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const a = document.createElement("a");
      a.href = qrDataUrl;
      a.download = "qrcode.png";
      a.click();
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "QR코드 생성기" : "QR Code Generator"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "URL, 텍스트 등으로 QR코드를 무료로 만들어보세요."
          : "Generate QR codes from URLs, text, and more for free."}
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "내용 입력" : "Content"}
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={locale === "ko" ? "URL 또는 텍스트를 입력하세요" : "Enter URL or text"}
              className="h-28 w-full rounded-xl border border-gray-200 bg-white p-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "크기" : "Size"}: {size}px
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {locale === "ko" ? "QR 색상" : "QR Color"}
              </label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded border border-gray-200 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {locale === "ko" ? "배경 색상" : "Background"}
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded border border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => downloadQR("png")}
              disabled={!text.trim()}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              PNG {t.download}
            </button>
            <button
              onClick={() => downloadQR("svg")}
              disabled={!text.trim()}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              SVG {t.download}
            </button>
          </div>
        </div>

        <div className="flex items-start justify-center">
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="QR Code" className="mx-auto" style={{ maxWidth: 280 }} />
            ) : (
              <div className="flex h-64 w-64 items-center justify-center text-gray-400">
                {locale === "ko" ? "내용을 입력하세요" : "Enter content to generate"}
              </div>
            )}
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "QR코드 생성기란?" : "What is a QR Code Generator?"}
        </h2>
        <p>
          {locale === "ko"
            ? "QR코드 생성기는 URL, 텍스트, 연락처 정보 등을 QR코드로 변환하는 무료 온라인 도구입니다. 생성된 QR코드는 PNG, SVG 형식으로 다운로드할 수 있으며, 크기와 색상을 자유롭게 변경할 수 있습니다."
            : "A QR code generator converts URLs, text, and other data into QR codes. Download in PNG or SVG format with custom sizes and colors."}
        </p>
      </div>
    </div>
  );
}
