"use client";

import { useState, useCallback } from "react";
import { useLocale } from "@/components/LocaleProvider";

type Algorithm = "SHA-1" | "SHA-256" | "SHA-512";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<Algorithm, string>>({
    "SHA-1": "",
    "SHA-256": "",
    "SHA-512": "",
  });
  const [copied, setCopied] = useState("");
  const { locale, t } = useLocale();

  const computeHashes = useCallback(async (text: string) => {
    setInput(text);
    if (!text) {
      setHashes({ "SHA-1": "", "SHA-256": "", "SHA-512": "" });
      return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const algorithms: Algorithm[] = ["SHA-1", "SHA-256", "SHA-512"];
    const results: Record<string, string> = {};
    for (const algo of algorithms) {
      const hashBuffer = await crypto.subtle.digest(algo, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      results[algo] = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    setHashes(results as Record<Algorithm, string>);
  }, []);

  const copyValue = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "해시 생성기" : "Hash Generator"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "텍스트의 SHA-1, SHA-256, SHA-512 해시값을 생성하세요."
          : "Generate SHA-1, SHA-256, SHA-512 hashes from text."}
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "입력 텍스트" : "Input Text"}
          </label>
          <textarea
            value={input}
            onChange={(e) => computeHashes(e.target.value)}
            placeholder={
              locale === "ko"
                ? "해시를 생성할 텍스트를 입력하세요..."
                : "Enter text to hash..."
            }
            className="h-32 w-full resize-y rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="space-y-3">
          {(["SHA-1", "SHA-256", "SHA-512"] as Algorithm[]).map((algo) => (
            <div key={algo}>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{algo}</label>
                {hashes[algo] && (
                  <button
                    onClick={() => copyValue(hashes[algo], algo)}
                    className="rounded-lg bg-gray-900 px-3 py-1 text-xs text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                  >
                    {copied === algo ? t.copied : t.copy}
                  </button>
                )}
              </div>
              <div className="break-all rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                {hashes[algo] || (
                  <span className="text-gray-400 dark:text-gray-500">—</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "해시란?" : "What is a Hash?"}
        </h2>
        <p>
          {locale === "ko"
            ? "해시(Hash)는 입력 데이터를 고정 길이의 고유한 문자열로 변환하는 암호학적 함수입니다. 파일 무결성 검증, 비밀번호 저장, 디지털 서명 등에 사용됩니다. SHA-256은 현재 가장 널리 사용되는 해시 알고리즘입니다. 이 도구는 Web Crypto API를 사용하여 브라우저에서 안전하게 실행됩니다."
            : "A hash function converts input data into a fixed-length unique string. It's used for file integrity verification, password storage, and digital signatures. SHA-256 is the most widely used hash algorithm today. This tool uses the Web Crypto API and runs securely in your browser."}
        </p>
      </div>
    </div>
  );
}
