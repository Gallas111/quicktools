"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const { locale, t } = useLocale();

  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.trim() ? text.split(/[.!?。]+/).filter((s) => s.trim()).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter((s) => s.trim()).length : 0;
  const bytes = new TextEncoder().encode(text).length;

  const stats = locale === "ko"
    ? [
        { label: "글자수", value: chars },
        { label: "공백 제외", value: charsNoSpace },
        { label: "단어수", value: words },
        { label: "문장수", value: sentences },
        { label: "문단수", value: paragraphs },
        { label: "바이트", value: bytes },
      ]
    : [
        { label: "Characters", value: chars },
        { label: "No Spaces", value: charsNoSpace },
        { label: "Words", value: words },
        { label: "Sentences", value: sentences },
        { label: "Paragraphs", value: paragraphs },
        { label: "Bytes", value: bytes },
      ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "글자수 세기" : "Character Counter"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "텍스트를 입력하면 글자수, 단어수, 바이트 등을 실시간으로 확인할 수 있습니다."
          : "Type or paste text to count characters, words, bytes and more in real-time."}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6 sm:grid-cols-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 bg-white p-4 text-center dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stat.value.toLocaleString()}
            </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            locale === "ko"
              ? "여기에 텍스트를 입력하거나 붙여넣으세요..."
              : "Type or paste your text here..."
          }
          className="h-64 w-full resize-y rounded-xl border border-gray-200 bg-white p-4 text-base outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400"
        />
        {text && (
          <button
            onClick={() => setText("")}
            className="absolute right-3 top-3 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            {t.clear}
          </button>
        )}
      </div>

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "글자수 세기란?" : "What is a Character Counter?"}
        </h2>
        <p>
          {locale === "ko"
            ? "글자수 세기는 입력한 텍스트의 글자수, 공백 제외 글자수, 단어수, 문장수, 문단수, 바이트 수를 실시간으로 확인할 수 있는 무료 온라인 도구입니다. 블로그 글, 자기소개서, SNS 포스팅 등 글자수 제한이 있는 곳에서 유용하게 사용할 수 있습니다."
            : "A character counter is a free online tool that counts characters, words, sentences, paragraphs, and bytes in real-time. It's useful for social media posts, essays, articles, and any writing with character limits."}
        </p>
      </div>
    </div>
  );
}
