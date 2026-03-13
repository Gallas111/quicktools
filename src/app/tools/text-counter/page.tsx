"use client";

import { useState, useMemo } from "react";
import { useLocale } from "@/components/LocaleProvider";

function isKorean(text: string): boolean {
  const koreanChars = text.match(/[\uAC00-\uD7AF]/g);
  const totalAlphaNum = text.match(/[\uAC00-\uD7AFa-zA-Z0-9]/g);
  if (!totalAlphaNum || totalAlphaNum.length === 0) return false;
  return (koreanChars?.length || 0) / totalAlphaNum.length > 0.3;
}

function getWords(text: string): string[] {
  if (!text.trim()) return [];
  return text.trim().split(/\s+/).filter((w) => w.length > 0);
}

function formatTime(minutes: number, locale: string): string {
  if (minutes < 1) {
    const seconds = Math.max(1, Math.round(minutes * 60));
    return locale === "ko" ? `${seconds}초` : `${seconds}s`;
  }
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  if (mins === 0) {
    return locale === "ko" ? `${secs}초` : `${secs}s`;
  }
  if (secs === 0) {
    return locale === "ko" ? `${mins}분` : `${mins}m`;
  }
  return locale === "ko" ? `${mins}분 ${secs}초` : `${mins}m ${secs}s`;
}

function getWordFrequency(text: string): { word: string; count: number }[] {
  if (!text.trim()) return [];
  const words = text
    .toLowerCase()
    .replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 1);

  const freq: Record<string, number> = {};
  for (const word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }

  return Object.entries(freq)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export default function TextCounterPro() {
  const [text, setText] = useState("");
  const { locale, t } = useLocale();

  const analysis = useMemo(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const words = getWords(text);
    const wordCount = words.length;
    const sentences = text.trim()
      ? text.split(/[.!?。！？]+/).filter((s) => s.trim()).length
      : 0;
    const paragraphs = text.trim()
      ? text.split(/\n\n+/).filter((s) => s.trim()).length
      : 0;

    const isKo = isKorean(text);
    const readingWpm = isKo ? 200 : 250;
    const speakingWpm = 120;
    const readingTime = wordCount > 0 ? wordCount / readingWpm : 0;
    const speakingTime = wordCount > 0 ? wordCount / speakingWpm : 0;

    const wordFreq = getWordFrequency(text);

    return {
      chars,
      charsNoSpace,
      wordCount,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      wordFreq,
    };
  }, [text]);

  const stats =
    locale === "ko"
      ? [
          { label: "글자수", value: analysis.chars.toLocaleString() },
          { label: "공백 제외", value: analysis.charsNoSpace.toLocaleString() },
          { label: "단어수", value: analysis.wordCount.toLocaleString() },
          { label: "문장수", value: analysis.sentences.toLocaleString() },
          { label: "문단수", value: analysis.paragraphs.toLocaleString() },
          { label: "읽기 시간", value: analysis.chars > 0 ? formatTime(analysis.readingTime, locale) : "0초" },
          { label: "말하기 시간", value: analysis.chars > 0 ? formatTime(analysis.speakingTime, locale) : "0초" },
        ]
      : [
          { label: "Characters", value: analysis.chars.toLocaleString() },
          { label: "No Spaces", value: analysis.charsNoSpace.toLocaleString() },
          { label: "Words", value: analysis.wordCount.toLocaleString() },
          { label: "Sentences", value: analysis.sentences.toLocaleString() },
          { label: "Paragraphs", value: analysis.paragraphs.toLocaleString() },
          { label: "Reading Time", value: analysis.chars > 0 ? formatTime(analysis.readingTime, locale) : "0s" },
          { label: "Speaking Time", value: analysis.chars > 0 ? formatTime(analysis.speakingTime, locale) : "0s" },
        ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "텍스트 분석기" : "Text Analyzer"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "텍스트를 입력하면 글자수, 단어수, 읽기 시간, 단어 빈도 등을 상세히 분석합니다."
          : "Enter text to analyze character count, word count, reading time, word frequency, and more."}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6 sm:grid-cols-4 lg:grid-cols-7">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 bg-white p-4 text-center dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {stat.value}
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
          className="h-64 w-full resize-y rounded-xl border border-gray-200 bg-white p-4 text-base outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-orange-400"
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

      {analysis.wordFreq.length > 0 && (
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {locale === "ko" ? "단어 빈도 (상위 10개)" : "Word Frequency (Top 10)"}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-2 pr-4 text-left font-medium text-gray-500 dark:text-gray-400">#</th>
                  <th className="py-2 pr-4 text-left font-medium text-gray-500 dark:text-gray-400">
                    {locale === "ko" ? "단어" : "Word"}
                  </th>
                  <th className="py-2 text-right font-medium text-gray-500 dark:text-gray-400">
                    {locale === "ko" ? "횟수" : "Count"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {analysis.wordFreq.map((item, index) => (
                  <tr
                    key={item.word}
                    className="border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="py-2 pr-4 text-gray-400 dark:text-gray-500">
                      {index + 1}
                    </td>
                    <td className="py-2 pr-4 font-mono text-gray-900 dark:text-white">
                      {item.word}
                    </td>
                    <td className="py-2 text-right font-semibold text-orange-600 dark:text-orange-400">
                      {item.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "텍스트 분석기란?" : "What is a Text Analyzer?"}
        </h2>
        <p>
          {locale === "ko"
            ? "텍스트 분석기는 입력한 텍스트의 글자수, 공백 제외 글자수, 단어수, 문장수, 문단수, 예상 읽기 시간, 말하기 시간, 단어 빈도를 상세히 분석하는 무료 온라인 도구입니다. 한국어는 분당 200단어, 영어는 분당 250단어 기준으로 읽기 시간을 계산하며, 말하기 시간은 분당 120단어 기준으로 산출합니다. 블로그 글쓰기, 프레젠테이션 준비, 번역 작업 등에 유용합니다."
            : "A text analyzer is a free online tool that provides detailed analysis of your text including character count, word count, sentence count, paragraph count, estimated reading time, speaking time, and word frequency. Reading time is calculated at 200 words/min for Korean and 250 words/min for English, while speaking time uses 120 words/min. It's useful for blog writing, presentation preparation, and translation work."}
        </p>
      </div>
    </div>
  );
}
