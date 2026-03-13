"use client";

import { useState, useCallback, useEffect } from "react";
import { useLocale } from "@/components/LocaleProvider";

export default function UuidGenerator() {
  const [uuid, setUuid] = useState("");
  const [batch, setBatch] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [isUppercase, setIsUppercase] = useState(false);
  const [withHyphens, setWithHyphens] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const { locale, t } = useLocale();

  const formatUuid = useCallback(
    (raw: string) => {
      let result = raw;
      if (!withHyphens) result = result.replace(/-/g, "");
      if (isUppercase) result = result.toUpperCase();
      else result = result.toLowerCase();
      return result;
    },
    [isUppercase, withHyphens]
  );

  const generate = useCallback(() => {
    const results: string[] = [];
    for (let i = 0; i < count; i++) {
      results.push(formatUuid(crypto.randomUUID()));
    }
    setUuid(results[0]);
    setBatch(results);
    setCopied(false);
    setCopiedAll(false);
  }, [count, formatUuid]);

  useEffect(() => {
    generate();
  }, [generate]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(batch.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "UUID 생성기" : "UUID Generator"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "고유한 UUID v4를 즉시 생성하세요."
          : "Generate unique UUID v4 identifiers instantly."}
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        {/* Main UUID display */}
        <div className="mb-4 flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <code className="flex-1 break-all font-mono text-lg text-gray-900 dark:text-white">
            {uuid}
          </code>
          <button
            onClick={handleCopy}
            className="shrink-0 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            {copied ? t.copied : t.copy}
          </button>
        </div>

        {/* Options */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              checked={isUppercase}
              onChange={(e) => setIsUppercase(e.target.checked)}
              className="h-4 w-4 rounded text-cyan-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "대문자" : "Uppercase"}
            </span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              checked={withHyphens}
              onChange={(e) => setWithHyphens(e.target.checked)}
              className="h-4 w-4 rounded text-cyan-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "하이픈 포함" : "With Hyphens"}
            </span>
          </label>
        </div>

        {/* Batch count */}
        <div className="mb-6">
          <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
            <span>
              {locale === "ko" ? "생성 개수" : "Count"}: {count}
            </span>
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-400">
            <span>1</span>
            <span>100</span>
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={generate}
          className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-sm font-medium text-white hover:from-cyan-600 hover:to-blue-600"
        >
          {locale === "ko" ? "새로 생성" : "Generate New"}
        </button>

        {/* Batch list */}
        {batch.length > 1 && (
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {locale === "ko"
                  ? `생성된 UUID (${batch.length}개)`
                  : `Generated UUIDs (${batch.length})`}
              </span>
              <button
                onClick={handleCopyAll}
                className="rounded-lg bg-gray-900 px-3 py-1 text-xs text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {copiedAll
                  ? t.copied
                  : locale === "ko"
                    ? "전체 복사"
                    : "Copy All"}
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
              {batch.map((id, i) => (
                <div
                  key={i}
                  className="border-b border-gray-200 py-1 font-mono text-xs text-gray-800 last:border-0 dark:border-gray-700 dark:text-gray-200"
                >
                  {id}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "UUID란?" : "What is a UUID?"}
        </h2>
        <p>
          {locale === "ko"
            ? "UUID(Universally Unique Identifier)는 128비트 고유 식별자입니다. UUID v4는 난수를 기반으로 생성되며, 데이터베이스 기본 키, API 요청 식별, 세션 관리 등에 널리 사용됩니다. 이 도구는 브라우저의 crypto.randomUUID() API를 사용하여 암호학적으로 안전한 UUID를 생성합니다."
            : "UUID (Universally Unique Identifier) is a 128-bit unique identifier. UUID v4 is generated using random numbers and is widely used for database primary keys, API request identification, and session management. This tool uses the browser's crypto.randomUUID() API for cryptographically secure UUID generation."}
        </p>
      </div>
    </div>
  );
}
