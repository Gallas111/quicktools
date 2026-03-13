"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

export default function Base64Tool() {
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
        setOutput(btoa(unescape(encodeURIComponent(text))));
      } else {
        setOutput(decodeURIComponent(escape(atob(text))));
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
        {locale === "ko" ? "Base64 인코더/디코더" : "Base64 Encoder/Decoder"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "텍스트를 Base64로 인코딩하거나 디코딩하세요."
          : "Encode or decode text with Base64 instantly."}
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => switchMode("encode")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === "encode"
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {locale === "ko" ? "인코딩" : "Encode"}
          </button>
          <button
            onClick={() => switchMode("decode")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === "decode"
                ? "bg-teal-600 text-white"
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
                  ? locale === "ko" ? "인코딩할 텍스트를 입력하세요..." : "Enter text to encode..."
                  : locale === "ko" ? "디코딩할 Base64 문자열을 입력하세요..." : "Enter Base64 string to decode..."
              }
              className="h-36 w-full resize-y rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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
          {locale === "ko" ? "Base64란?" : "What is Base64?"}
        </h2>
        <p>
          {locale === "ko"
            ? "Base64는 바이너리 데이터를 ASCII 문자열로 변환하는 인코딩 방식입니다. 이메일 첨부파일, 데이터 URI, API 토큰 등에서 널리 사용됩니다. 이 도구는 브라우저에서 바로 실행되며 데이터가 서버로 전송되지 않습니다."
            : "Base64 is an encoding scheme that converts binary data to ASCII strings. It's widely used in email attachments, data URIs, and API tokens. This tool runs entirely in your browser — no data is sent to any server."}
        </p>
      </div>
    </div>
  );
}
