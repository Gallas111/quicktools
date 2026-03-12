"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import CopyButton from "@/components/CopyButton";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);
  const { locale, t } = useLocale();

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setError(
        locale === "ko"
          ? `JSON 오류: ${(e as Error).message}`
          : `JSON Error: ${(e as Error).message}`
      );
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError(
        locale === "ko"
          ? `JSON 오류: ${(e as Error).message}`
          : `JSON Error: ${(e as Error).message}`
      );
      setOutput("");
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (!value.trim()) {
      setOutput("");
      setError("");
      return;
    }
    try {
      const parsed = JSON.parse(value);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch {
      setOutput("");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "JSON 포맷터" : "JSON Formatter"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "JSON을 예쁘게 정렬하거나 압축하세요. 문법 오류도 확인할 수 있습니다."
          : "Format, beautify, or minify JSON. Validates syntax errors."}
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "들여쓰기" : "Indent"}:
          </label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>1 tab</option>
          </select>
        </div>
        <button
          onClick={format}
          disabled={!input.trim()}
          className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-50"
        >
          {locale === "ko" ? "정렬" : "Format"}
        </button>
        <button
          onClick={minify}
          disabled={!input.trim()}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {locale === "ko" ? "압축" : "Minify"}
        </button>
        <button
          onClick={() => {
            setInput("");
            setOutput("");
            setError("");
          }}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {t.clear}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "입력" : "Input"}
            </label>
          </div>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={locale === "ko" ? "JSON을 붙여넣으세요..." : "Paste your JSON here..."}
            spellCheck={false}
            className="h-96 w-full resize-y rounded-xl border border-gray-200 bg-white p-4 font-mono text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "결과" : "Output"}
            </label>
            {output && <CopyButton text={output} />}
          </div>
          <pre className="h-96 overflow-auto rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm dark:border-gray-800 dark:bg-gray-900 dark:text-white">
            {output || (
              <span className="text-gray-400">
                {locale === "ko" ? "결과가 여기에 표시됩니다" : "Output will appear here"}
              </span>
            )}
          </pre>
        </div>
      </div>

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "JSON 포맷터란?" : "What is a JSON Formatter?"}
        </h2>
        <p>
          {locale === "ko"
            ? "JSON 포맷터는 JSON 데이터를 보기 좋게 정렬(beautify)하거나 압축(minify)하는 무료 온라인 도구입니다. 잘못된 JSON 문법을 검증하고 오류 위치를 알려줍니다. 개발자들이 API 응답 확인, 설정 파일 편집 등에 매일 사용합니다."
            : "A JSON formatter beautifies or minifies JSON data. It validates JSON syntax and shows error locations. Developers use it daily for checking API responses, editing config files, and more."}
        </p>
      </div>
    </div>
  );
}
