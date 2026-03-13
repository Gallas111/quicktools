"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/components/LocaleProvider";
import CopyButton from "@/components/CopyButton";

type CaseType =
  | "uppercase"
  | "lowercase"
  | "titlecase"
  | "camelcase"
  | "snakecase"
  | "kebabcase"
  | "constantcase"
  | "sentencecase";

function splitWords(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function toUpperCase(text: string): string {
  return text.toUpperCase();
}

function toLowerCase(text: string): string {
  return text.toLowerCase();
}

function toTitleCase(text: string): string {
  return text
    .split(/(\s+)/)
    .map((word) =>
      /\s/.test(word) ? word : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
}

function toCamelCase(text: string): string {
  return text
    .split("\n")
    .map((line) => {
      const words = splitWords(line);
      if (words.length === 0) return "";
      return words
        .map((w, i) =>
          i === 0
            ? w.toLowerCase()
            : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        )
        .join("");
    })
    .join("\n");
}

function toSnakeCase(text: string): string {
  return text
    .split("\n")
    .map((line) => splitWords(line).map((w) => w.toLowerCase()).join("_"))
    .join("\n");
}

function toKebabCase(text: string): string {
  return text
    .split("\n")
    .map((line) => splitWords(line).map((w) => w.toLowerCase()).join("-"))
    .join("\n");
}

function toConstantCase(text: string): string {
  return text
    .split("\n")
    .map((line) => splitWords(line).map((w) => w.toUpperCase()).join("_"))
    .join("\n");
}

function toSentenceCase(text: string): string {
  return text
    .split("\n")
    .map((line) => {
      if (!line) return line;
      return line.charAt(0).toUpperCase() + line.slice(1).toLowerCase();
    })
    .join("\n");
}

function convertCase(text: string, caseType: CaseType): string {
  switch (caseType) {
    case "uppercase": return toUpperCase(text);
    case "lowercase": return toLowerCase(text);
    case "titlecase": return toTitleCase(text);
    case "camelcase": return toCamelCase(text);
    case "snakecase": return toSnakeCase(text);
    case "kebabcase": return toKebabCase(text);
    case "constantcase": return toConstantCase(text);
    case "sentencecase": return toSentenceCase(text);
  }
}

export default function CaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectedCase, setSelectedCase] = useState<CaseType>("uppercase");
  const { locale, t } = useLocale();

  useEffect(() => {
    if (input.trim()) {
      setOutput(convertCase(input, selectedCase));
    } else {
      setOutput("");
    }
  }, [input, selectedCase]);

  const caseButtons: { type: CaseType; label: string; labelKo: string }[] = [
    { type: "uppercase", label: "UPPERCASE", labelKo: "대문자" },
    { type: "lowercase", label: "lowercase", labelKo: "소문자" },
    { type: "titlecase", label: "Title Case", labelKo: "첫글자 대문자" },
    { type: "camelcase", label: "camelCase", labelKo: "camelCase" },
    { type: "snakecase", label: "snake_case", labelKo: "snake_case" },
    { type: "kebabcase", label: "kebab-case", labelKo: "kebab-case" },
    { type: "constantcase", label: "CONSTANT_CASE", labelKo: "CONSTANT_CASE" },
    { type: "sentencecase", label: "Sentence case", labelKo: "문장형" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "대소문자 변환기" : "Case Converter"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "텍스트의 대소문자를 다양한 형식으로 변환하세요."
          : "Convert text to various case formats instantly."}
      </p>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {locale === "ko" ? "입력" : "Input"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={locale === "ko" ? "변환할 텍스트를 입력하세요..." : "Enter text to convert..."}
          spellCheck={false}
          className="h-40 w-full resize-y rounded-xl border border-gray-200 bg-white p-4 font-mono text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {locale === "ko" ? "변환 형식" : "Conversion Type"}
        </label>
        <div className="flex flex-wrap gap-2">
          {caseButtons.map((btn) => (
            <button
              key={btn.type}
              onClick={() => setSelectedCase(btn.type)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedCase === btn.type
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                  : "border border-gray-200 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {locale === "ko" ? btn.labelKo : btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "결과" : "Output"}
          </label>
          {output && <CopyButton text={output} />}
        </div>
        <textarea
          value={output}
          readOnly
          placeholder={locale === "ko" ? "결과가 여기에 표시됩니다" : "Output will appear here"}
          className="h-40 w-full resize-y rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "대소문자 변환기란?" : "What is a Case Converter?"}
        </h2>
        <p>
          {locale === "ko"
            ? "대소문자 변환기는 텍스트를 UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, CONSTANT_CASE, 문장형 등 다양한 형식으로 변환하는 무료 온라인 도구입니다. 프로그래밍 시 변수명 변환, 텍스트 서식 변경 등에 유용합니다."
            : "A Case Converter transforms text into various formats including UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, CONSTANT_CASE, and Sentence case. It is useful for converting variable names in programming and reformatting text."}
        </p>
      </div>
    </div>
  );
}
