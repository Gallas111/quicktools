"use client";

import { useState, useCallback } from "react";
import { useLocale } from "@/components/LocaleProvider";

type Mode = "css" | "js";

function minifyCss(code: string): string {
  let result = code;
  // Remove multi-line comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove newlines and carriage returns
  result = result.replace(/[\r\n]+/g, "");
  // Collapse multiple spaces into one
  result = result.replace(/\s{2,}/g, " ");
  // Remove spaces around special characters
  result = result.replace(/\s*([{}:;,>~+])\s*/g, "$1");
  // Remove trailing semicolons before closing braces
  result = result.replace(/;}/g, "}");
  // Trim
  result = result.trim();
  return result;
}

function minifyJs(code: string): string {
  let result = "";
  let i = 0;
  const len = code.length;

  while (i < len) {
    // Handle string literals (single quote)
    if (code[i] === "'") {
      const start = i;
      i++;
      while (i < len && code[i] !== "'") {
        if (code[i] === "\\") i++;
        i++;
      }
      i++; // closing quote
      result += code.slice(start, i);
      continue;
    }

    // Handle string literals (double quote)
    if (code[i] === '"') {
      const start = i;
      i++;
      while (i < len && code[i] !== '"') {
        if (code[i] === "\\") i++;
        i++;
      }
      i++; // closing quote
      result += code.slice(start, i);
      continue;
    }

    // Handle template literals
    if (code[i] === "`") {
      const start = i;
      i++;
      while (i < len && code[i] !== "`") {
        if (code[i] === "\\") i++;
        i++;
      }
      i++; // closing backtick
      result += code.slice(start, i);
      continue;
    }

    // Handle regex literals
    if (code[i] === "/" && i + 1 < len && code[i + 1] !== "/" && code[i + 1] !== "*") {
      // Check if this is likely a regex (preceded by operator or keyword context)
      const prevNonSpace = result.trimEnd();
      const lastChar = prevNonSpace[prevNonSpace.length - 1];
      if (!lastChar || "=(:,;[!&|?{}>~^%*/+-".includes(lastChar)) {
        const start = i;
        i++; // skip opening /
        while (i < len && code[i] !== "/") {
          if (code[i] === "\\") i++;
          i++;
        }
        i++; // closing /
        // Include flags
        while (i < len && /[gimsuy]/.test(code[i])) i++;
        result += code.slice(start, i);
        continue;
      }
    }

    // Handle single-line comments
    if (code[i] === "/" && i + 1 < len && code[i + 1] === "/") {
      i += 2;
      while (i < len && code[i] !== "\n" && code[i] !== "\r") i++;
      continue;
    }

    // Handle multi-line comments
    if (code[i] === "/" && i + 1 < len && code[i + 1] === "*") {
      i += 2;
      while (i < len && !(code[i] === "*" && i + 1 < len && code[i + 1] === "/")) i++;
      i += 2; // skip */
      continue;
    }

    // Handle whitespace
    if (/\s/.test(code[i])) {
      // Keep a single space only if needed between identifiers/keywords
      const prev = result[result.length - 1];
      i++;
      while (i < len && /\s/.test(code[i])) i++;
      const next = code[i];
      if (
        prev &&
        next &&
        /[a-zA-Z0-9_$]/.test(prev) &&
        /[a-zA-Z0-9_$]/.test(next)
      ) {
        result += " ";
      }
      continue;
    }

    result += code[i];
    i++;
  }

  return result.trim();
}

export default function CssMinifier() {
  const [mode, setMode] = useState<Mode>("css");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const { locale, t } = useLocale();

  const originalSize = new Blob([input]).size;
  const minifiedSize = new Blob([output]).size;
  const savings =
    originalSize > 0
      ? (((originalSize - minifiedSize) / originalSize) * 100).toFixed(1)
      : "0";

  const handleMinify = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }
    if (mode === "css") {
      setOutput(minifyCss(input));
    } else {
      setOutput(minifyJs(input));
    }
    setCopied(false);
  }, [input, mode]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "CSS/JS 압축기" : "CSS/JS Minifier"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "CSS 또는 JavaScript 코드를 압축하여 파일 크기를 줄이세요."
          : "Minify CSS or JavaScript code to reduce file size."}
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        {/* Mode toggle */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => {
              setMode("css");
              setOutput("");
              setCopied(false);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === "css"
                ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            CSS
          </button>
          <button
            onClick={() => {
              setMode("js");
              setOutput("");
              setCopied(false);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === "js"
                ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            JavaScript
          </button>
        </div>

        {/* Input */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "입력 코드" : "Input Code"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              locale === "ko"
                ? `${mode === "css" ? "CSS" : "JavaScript"} 코드를 붙여넣으세요...`
                : `Paste your ${mode === "css" ? "CSS" : "JavaScript"} code here...`
            }
            className="h-48 w-full resize-y rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Minify button */}
        <button
          onClick={handleMinify}
          className="mb-4 w-full rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 py-3 text-sm font-medium text-white hover:from-yellow-600 hover:to-amber-600"
        >
          {locale === "ko" ? "압축하기" : "Minify"}
        </button>

        {/* Output */}
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "압축 결과" : "Minified Output"}
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="rounded-lg bg-gray-900 px-3 py-1 text-xs text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {copied ? t.copied : t.copy}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            className="h-48 w-full resize-y rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm text-gray-800 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>

        {/* Stats */}
        {output && (
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-gray-200 p-3 text-center dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {locale === "ko" ? "원본 크기" : "Original"}
              </div>
              <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {originalSize.toLocaleString()} B
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 p-3 text-center dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {locale === "ko" ? "압축 크기" : "Minified"}
              </div>
              <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {minifiedSize.toLocaleString()} B
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 p-3 text-center dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {locale === "ko" ? "절감률" : "Savings"}
              </div>
              <div className="mt-1 text-sm font-semibold text-green-600 dark:text-green-400">
                {savings}%
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "코드 압축이란?" : "What is Code Minification?"}
        </h2>
        <p>
          {locale === "ko"
            ? "코드 압축(Minification)은 CSS나 JavaScript 파일에서 주석, 불필요한 공백, 줄바꿈 등을 제거하여 파일 크기를 줄이는 최적화 기법입니다. 압축된 코드는 기능은 동일하지만 파일 크기가 작아져 웹 페이지 로딩 속도가 향상됩니다. 이 도구는 외부 라이브러리 없이 브라우저에서 직접 압축을 수행합니다."
            : "Code minification removes comments, unnecessary whitespace, and newlines from CSS or JavaScript files to reduce file size. Minified code functions identically but loads faster due to its smaller size. This tool performs minification directly in your browser without any external libraries."}
        </p>
      </div>
    </div>
  );
}
