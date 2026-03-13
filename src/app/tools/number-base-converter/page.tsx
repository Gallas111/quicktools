"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

type Base = "bin" | "oct" | "dec" | "hex";

function isValidForBase(value: string, base: Base): boolean {
  if (!value) return true;
  const patterns: Record<Base, RegExp> = {
    bin: /^[01]+$/,
    oct: /^[0-7]+$/,
    dec: /^[0-9]+$/,
    hex: /^[0-9a-fA-F]+$/,
  };
  return patterns[base].test(value);
}

function convertFromDecimal(decimal: number): Record<Base, string> {
  if (decimal < 0 || !Number.isFinite(decimal)) {
    return { bin: "", oct: "", dec: "", hex: "" };
  }
  return {
    bin: decimal.toString(2),
    oct: decimal.toString(8),
    dec: decimal.toString(10),
    hex: decimal.toString(16).toUpperCase(),
  };
}

export default function NumberBaseConverter() {
  const [values, setValues] = useState<Record<Base, string>>({
    bin: "",
    oct: "",
    dec: "",
    hex: "",
  });
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const { locale, t } = useLocale();

  const handleChange = (value: string, base: Base) => {
    if (!value) {
      setValues({ bin: "", oct: "", dec: "", hex: "" });
      setError("");
      return;
    }

    if (!isValidForBase(value, base)) {
      setError(
        locale === "ko"
          ? "입력한 값이 해당 진법에 유효하지 않습니다."
          : "Invalid input for the selected base."
      );
      setValues((prev) => ({ ...prev, [base]: value }));
      return;
    }

    setError("");
    const radix: Record<Base, number> = { bin: 2, oct: 8, dec: 10, hex: 16 };
    const decimal = parseInt(value, radix[base]);
    if (isNaN(decimal)) {
      setValues((prev) => ({ ...prev, [base]: value }));
      setError(locale === "ko" ? "변환할 수 없는 값입니다." : "Unable to convert the value.");
      return;
    }
    const converted = convertFromDecimal(decimal);
    converted[base] = value;
    setValues(converted);
  };

  const copyValue = async (text: string, label: string) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const bases: { key: Base; label: string; labelEn: string; placeholder: string }[] = [
    { key: "bin", label: "2진수 (Binary)", labelEn: "Binary (Base 2)", placeholder: "예: 1010" },
    { key: "oct", label: "8진수 (Octal)", labelEn: "Octal (Base 8)", placeholder: "예: 12" },
    { key: "dec", label: "10진수 (Decimal)", labelEn: "Decimal (Base 10)", placeholder: "예: 10" },
    { key: "hex", label: "16진수 (Hexadecimal)", labelEn: "Hexadecimal (Base 16)", placeholder: "예: A" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "진법 변환기" : "Number Base Converter"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "아무 필드에 숫자를 입력하면 나머지 진법으로 실시간 변환됩니다."
          : "Type a number in any field and all other bases update in real-time."}
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {bases.map((base) => (
            <div key={base.key}>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {locale === "ko" ? base.label : base.labelEn}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={values[base.key]}
                  onChange={(e) => handleChange(e.target.value, base.key)}
                  placeholder={locale === "ko" ? base.placeholder : base.placeholder.replace("예:", "e.g.")}
                  className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-slate-400"
                />
                <button
                  onClick={() => copyValue(values[base.key], base.key)}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  {copied === base.key ? t.copied : t.copy}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "진법 변환기란?" : "What is a Number Base Converter?"}
        </h2>
        <p>
          {locale === "ko"
            ? "진법 변환기는 2진수(Binary), 8진수(Octal), 10진수(Decimal), 16진수(Hexadecimal) 사이의 숫자를 실시간으로 변환하는 무료 온라인 도구입니다. 프로그래밍, 컴퓨터 과학, 디지털 회로 설계 등에서 유용합니다."
            : "A number base converter converts numbers between binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16) in real-time. Useful for programming, computer science, and digital circuit design."}
        </p>
      </div>
    </div>
  );
}
