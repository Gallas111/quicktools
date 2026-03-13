"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const { locale, t } = useLocale();

  const handleConvert = (text: string, m: "encode" | "decode") => {
    setInput(text);
    setError("");
    if (!text) {
      setOutput("");
      return;
    }
    try {
      if (m === "encode") {
        setOutput(encodeURIComponent(text));
      } else {
        setOutput(decodeURIComponent(text));
      }
    } catch {
      setError(locale === "ko" ? "유효하지 않은 입력입니다." : "Invalid input.");
      setOutput("");
    }
  };

  const switchMode = (m: "encode" | "decode") => {
    setMode(m);
    handleConvert(input, m);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "URL 인코더/디코더" : "URL Encoder/Decoder"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "URL을 인코딩하거나 디코딩하세요."
          : "Encode or decode URLs instantly."}
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => switchMode("encode")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === "encode"
                ? "bg-sky-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {locale === "ko" ? "인코딩" : "Encode"}
          </button>
          <button
            onClick={() => switchMode("decode")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === "decode"
                ? "bg-sky-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {locale === "ko" ? "디코딩" : "Decode"}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "입력" : "Input"}
            </label>
            <textarea
              value={input}
              onChange={(e) => handleConvert(e.target.value, mode)}
              placeholder={
                mode === "encode"
                  ? locale === "ko" ? "인코딩할 URL이나 텍스트를 입력하세요..." : "Enter URL or text to encode..."
                  : locale === "ko" ? "디코딩할 URL을 입력하세요..." : "Enter encoded URL to decode..."
              }
              className="h-36 w-full resize-y rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {locale === "ko" ? "결과" : "Output"}
              </label>
              {output && (
                <button
                  onClick={handleCopy}
                  className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  {copied ? t.copied : t.copy}
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              className="h-36 w-full resize-y rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "URL 인코딩이란?" : "What is URL Encoding?"}
        </h2>
        <p>
          {locale === "ko"
            ? "URL 인코딩(퍼센트 인코딩)은 URL에서 사용할 수 없는 특수문자를 %XX 형식으로 변환하는 방식입니다. 한글, 공백, 특수문자가 포함된 URL을 안전하게 전송할 때 필요합니다."
            : "URL encoding (percent encoding) converts special characters into a %XX format safe for use in URLs. It's essential for handling non-ASCII characters, spaces, and special symbols in web addresses."}
        </p>
      </div>
    </div>
  );
}
