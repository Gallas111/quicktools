"use client";

import { useState, useCallback } from "react";
import { useLocale } from "@/components/LocaleProvider";

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "semper", "ligula",
  "nec", "volutpat", "maecenas", "tristique", "gravida", "dictum", "pellentesque",
  "viverra", "accumsan", "pharetra", "vulputate", "lacinia", "tortor", "posuere",
  "praesent", "blandit", "nam", "ante", "ornare", "diam", "eget", "faucibus",
  "nisl", "tincidunt", "orci", "sagittis", "eu", "auctor", "convallis",
];

function generateSentence(): string {
  const len = 8 + Math.floor(Math.random() * 12);
  const words = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(): string {
  const count = 3 + Math.floor(Math.random() * 5);
  return Array.from({ length: count }, generateSentence).join(" ");
}

export default function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const { locale, t } = useLocale();

  const generate = useCallback(() => {
    let result = "";
    if (unit === "paragraphs") {
      result = Array.from({ length: count }, generateParagraph).join("\n\n");
    } else if (unit === "sentences") {
      result = Array.from({ length: count }, generateSentence).join(" ");
    } else {
      const words: string[] = [];
      while (words.length < count) {
        words.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
      }
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      result = words.join(" ") + ".";
    }
    setOutput(result);
    setCopied(false);
  }, [count, unit]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const unitLabels = locale === "ko"
    ? { paragraphs: "문단", sentences: "문장", words: "단어" }
    : { paragraphs: "Paragraphs", sentences: "Sentences", words: "Words" };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "Lorem Ipsum 생성기" : "Lorem Ipsum Generator"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "디자인 및 레이아웃용 더미 텍스트를 생성하세요."
          : "Generate placeholder text for your designs and layouts."}
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
            className="w-20 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <div className="flex gap-1">
            {(["paragraphs", "sentences", "words"] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  unit === u
                    ? "bg-amber-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {unitLabels[u]}
              </button>
            ))}
          </div>
          <button
            onClick={generate}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
          >
            {locale === "ko" ? "생성" : "Generate"}
          </button>
        </div>

        {output && (
          <div>
            <div className="mb-2 flex justify-end">
              <button
                onClick={handleCopy}
                className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {copied ? t.copied : t.copy}
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
              {output}
            </div>
          </div>
        )}

        {!output && (
          <div className="flex h-32 items-center justify-center text-sm text-gray-400 dark:text-gray-500">
            {locale === "ko" ? "생성 버튼을 눌러주세요" : "Click Generate to create text"}
          </div>
        )}
      </div>

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "Lorem Ipsum이란?" : "What is Lorem Ipsum?"}
        </h2>
        <p>
          {locale === "ko"
            ? "Lorem Ipsum은 출판 및 디자인 업계에서 사용하는 표준 더미 텍스트입니다. 실제 콘텐츠 없이 레이아웃과 디자인을 미리 확인할 때 사용합니다. 1500년대부터 사용되어 온 전통적인 플레이스홀더 텍스트입니다."
            : "Lorem Ipsum is the standard dummy text used in publishing and design. It helps preview layouts without actual content. This traditional placeholder text has been in use since the 1500s."}
        </p>
      </div>
    </div>
  );
}
