"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import ToolGuide from "@/components/ToolGuide";
import { toolGuides } from "@/lib/toolGuides";

const INVISIBLE_CHAR = "\u2800"; // Braille Pattern Blank

function convertText(text: string): string {
  return text
    .split("\n")
    .map((line) => {
      // If the line is empty (blank line), replace with invisible character
      if (line.trim() === "") return INVISIBLE_CHAR;
      return line;
    })
    .join("\n");
}

export default function InstagramLineBreak() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const { locale, t } = useLocale();

  const output = convertText(input);
  const lineCount = input ? input.split("\n").length : 0;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = output;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInput("");
    setCopied(false);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "인스타 줄바꿈" : "Instagram Line Break"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "인스타그램에서 줄바꿈이 사라지는 문제를 해결하세요. 텍스트를 입력하고 변환된 결과를 복사하면 됩니다."
          : "Fix Instagram line break issues. Type your caption, then copy the converted result."}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center dark:border-gray-800 dark:bg-gray-900">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {input.length.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {locale === "ko" ? "글자수" : "Characters"}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center dark:border-gray-800 dark:bg-gray-900">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {lineCount.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {locale === "ko" ? "줄 수" : "Lines"}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="relative mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {locale === "ko" ? "원본 텍스트 입력" : "Enter your text"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            locale === "ko"
              ? "인스타그램에 올릴 글을 여기에 입력하세요...\n\n줄바꿈을 넣고 싶은 곳에서\n엔터를 누르세요."
              : "Type your Instagram caption here...\n\nPress Enter where you want\nline breaks."
          }
          className="h-48 w-full resize-y rounded-xl border border-gray-200 bg-white p-4 text-base outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400"
        />
        {input && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-9 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            {t.clear}
          </button>
        )}
      </div>

      {/* Output / Preview */}
      {input && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "변환 결과 (미리보기)" : "Converted Result (Preview)"}
            </label>
            <button
              onClick={handleCopy}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                copied
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              }`}
            >
              {copied
                ? locale === "ko"
                  ? "복사 완료!"
                  : "Copied!"
                : locale === "ko"
                  ? "클립보드에 복사"
                  : "Copy to Clipboard"}
            </button>
          </div>
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-base whitespace-pre-wrap dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200">
            {output}
          </div>
        </div>
      )}

      {/* How to use */}
      <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "사용 방법" : "How to Use"}
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {locale === "ko" ? (
            <>
              <li>위 입력란에 인스타그램에 올릴 글을 입력하세요.</li>
              <li>줄바꿈을 원하는 곳에서 엔터(Enter)를 누르세요.</li>
              <li>&quot;클립보드에 복사&quot; 버튼을 클릭하세요.</li>
              <li>인스타그램 앱에서 캡션 입력란에 붙여넣기 하세요.</li>
            </>
          ) : (
            <>
              <li>Type or paste your Instagram caption in the input area above.</li>
              <li>Press Enter where you want line breaks.</li>
              <li>Click the &quot;Copy to Clipboard&quot; button.</li>
              <li>Paste the result into your Instagram caption field.</li>
            </>
          )}
        </ol>
      </div>

      <ToolGuide data={toolGuides["instagram-line-break"]} />
    </div>
  );
}
