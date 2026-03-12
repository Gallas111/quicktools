"use client";

import { useState, useCallback, useEffect } from "react";
import { useLocale } from "@/components/LocaleProvider";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const { locale, t } = useLocale();

  const generate = useCallback(() => {
    let chars = "";
    if (lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    const result = Array.from(array, (n) => chars[n % chars.length]).join("");
    setPassword(result);
    setCopied(false);
  }, [length, uppercase, lowercase, numbers, symbols]);

  useEffect(() => {
    generate();
  }, [generate]);

  const getStrength = () => {
    let pool = 0;
    if (lowercase) pool += 26;
    if (uppercase) pool += 26;
    if (numbers) pool += 10;
    if (symbols) pool += 26;
    const entropy = length * Math.log2(pool || 1);
    if (entropy < 40) return { label: locale === "ko" ? "약함" : "Weak", color: "bg-red-500", width: "w-1/4" };
    if (entropy < 60) return { label: locale === "ko" ? "보통" : "Fair", color: "bg-yellow-500", width: "w-2/4" };
    if (entropy < 80) return { label: locale === "ko" ? "강함" : "Strong", color: "bg-green-500", width: "w-3/4" };
    return { label: locale === "ko" ? "매우 강함" : "Very Strong", color: "bg-emerald-500", width: "w-full" };
  };

  const strength = getStrength();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const options = locale === "ko"
    ? [
        { label: "대문자 (A-Z)", state: uppercase, set: setUppercase },
        { label: "소문자 (a-z)", state: lowercase, set: setLowercase },
        { label: "숫자 (0-9)", state: numbers, set: setNumbers },
        { label: "특수문자 (!@#$)", state: symbols, set: setSymbols },
      ]
    : [
        { label: "Uppercase (A-Z)", state: uppercase, set: setUppercase },
        { label: "Lowercase (a-z)", state: lowercase, set: setLowercase },
        { label: "Numbers (0-9)", state: numbers, set: setNumbers },
        { label: "Symbols (!@#$)", state: symbols, set: setSymbols },
      ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "비밀번호 생성기" : "Password Generator"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "안전하고 강력한 비밀번호를 생성하세요."
          : "Generate strong, secure passwords instantly."}
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <code className="flex-1 break-all font-mono text-lg text-gray-900 dark:text-white">
            {password}
          </code>
          <button
            onClick={handleCopy}
            className="shrink-0 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            {copied ? t.copied : t.copy}
          </button>
        </div>

        <div className="mb-6">
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{strength.label}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div className={`h-full ${strength.color} ${strength.width} rounded-full transition-all`} />
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
            <span>{locale === "ko" ? "길이" : "Length"}: {length}</span>
          </label>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-400">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3">
          {options.map((opt) => (
            <label
              key={opt.label}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <input
                type="checkbox"
                checked={opt.state}
                onChange={(e) => opt.set(e.target.checked)}
                className="h-4 w-4 rounded text-red-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{opt.label}</span>
            </label>
          ))}
        </div>

        <button
          onClick={generate}
          className="w-full rounded-lg bg-red-600 py-3 text-sm font-medium text-white hover:bg-red-700"
        >
          {locale === "ko" ? "새 비밀번호 생성" : "Generate New Password"}
        </button>
      </div>

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "비밀번호 생성기란?" : "What is a Password Generator?"}
        </h2>
        <p>
          {locale === "ko"
            ? "비밀번호 생성기는 대문자, 소문자, 숫자, 특수문자를 조합하여 강력하고 안전한 비밀번호를 자동으로 만들어주는 무료 온라인 도구입니다. 브라우저의 암호학적 난수 생성기(crypto.getRandomValues)를 사용하여 예측 불가능한 비밀번호를 생성합니다."
            : "A password generator creates strong, secure passwords using uppercase, lowercase, numbers, and symbols. It uses your browser's cryptographic random number generator for truly unpredictable passwords."}
        </p>
      </div>
    </div>
  );
}
