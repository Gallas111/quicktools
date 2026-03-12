"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/components/LocaleProvider";

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const [copied, setCopied] = useState("");
  const { locale, t } = useLocale();

  const updateFromHex = (value: string) => {
    setHex(value);
    const result = hexToRgb(value);
    if (result) {
      setRgb(result);
      setHsl(rgbToHsl(result.r, result.g, result.b));
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  };

  const copyValue = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const colorValues = [
    { label: "HEX", value: hex.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "색상 코드 변환기" : "Color Converter"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "HEX, RGB, HSL 색상 코드를 실시간으로 변환하세요."
          : "Convert between HEX, RGB, and HSL color codes in real-time."}
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div
          className="mb-6 h-32 rounded-xl border border-gray-200 dark:border-gray-700"
          style={{ backgroundColor: hex }}
        />

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "컬러 피커" : "Color Picker"}
          </label>
          <input
            type="color"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="h-12 w-full cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">HEX</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hex}
                onChange={(e) => updateFromHex(e.target.value)}
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <button
                onClick={() => copyValue(hex.toUpperCase(), "HEX")}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {copied === "HEX" ? t.copied : t.copy}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">RGB</label>
            <div className="flex gap-2">
              <div className="flex flex-1 gap-2">
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={(e) => updateFromRgb(Number(e.target.value), rgb.g, rgb.b)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center font-mono text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="R"
                />
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={(e) => updateFromRgb(rgb.r, Number(e.target.value), rgb.b)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center font-mono text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="G"
                />
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={(e) => updateFromRgb(rgb.r, rgb.g, Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center font-mono text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="B"
                />
              </div>
              <button
                onClick={() => copyValue(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {copied === "RGB" ? t.copied : t.copy}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">HSL</label>
            <div className="flex gap-2">
              <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
              </div>
              <button
                onClick={() => copyValue(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {copied === "HSL" ? t.copied : t.copy}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "색상 코드 변환기란?" : "What is a Color Converter?"}
        </h2>
        <p>
          {locale === "ko"
            ? "색상 코드 변환기는 HEX, RGB, HSL 형식의 색상 코드를 실시간으로 변환하는 무료 온라인 도구입니다. 웹 디자인, CSS 작업 시 필요한 색상 코드를 빠르게 변환하고 복사할 수 있습니다."
            : "A color converter transforms color codes between HEX, RGB, and HSL formats in real-time. Quickly convert and copy color codes for web design and CSS work."}
        </p>
      </div>
    </div>
  );
}
