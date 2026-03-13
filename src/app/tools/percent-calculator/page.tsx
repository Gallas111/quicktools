"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

type Mode = "of" | "is" | "discount" | "change";

export default function PercentCalculator() {
  const { locale } = useLocale();
  const ko = locale === "ko";

  const [mode, setMode] = useState<Mode>("of");

  // Mode 1: What is B% of A?
  const [ofA, setOfA] = useState("");
  const [ofB, setOfB] = useState("");

  // Mode 2: A is what % of B?
  const [isA, setIsA] = useState("");
  const [isB, setIsB] = useState("");

  // Mode 3: Discount
  const [discountPrice, setDiscountPrice] = useState("");
  const [discountRate, setDiscountRate] = useState("");

  // Mode 4: Change rate
  const [changeFrom, setChangeFrom] = useState("");
  const [changeTo, setChangeTo] = useState("");

  const tabs: { key: Mode; label: string; labelEn: string }[] = [
    { key: "of", label: "A의 B%는?", labelEn: "B% of A" },
    { key: "is", label: "A는 B의 몇%?", labelEn: "A is what % of B?" },
    { key: "discount", label: "할인율 계산", labelEn: "Discount" },
    { key: "change", label: "증감률 계산", labelEn: "% Change" },
  ];

  // Calculations
  const ofResult =
    ofA && ofB ? (parseFloat(ofA) * parseFloat(ofB)) / 100 : null;

  const isResult =
    isA && isB && parseFloat(isB) !== 0
      ? (parseFloat(isA) / parseFloat(isB)) * 100
      : null;

  const discountFinal =
    discountPrice && discountRate
      ? parseFloat(discountPrice) * (1 - parseFloat(discountRate) / 100)
      : null;
  const discountSaved =
    discountPrice && discountRate
      ? parseFloat(discountPrice) * (parseFloat(discountRate) / 100)
      : null;

  const changeResult =
    changeFrom && changeTo && parseFloat(changeFrom) !== 0
      ? ((parseFloat(changeTo) - parseFloat(changeFrom)) /
          Math.abs(parseFloat(changeFrom))) *
        100
      : null;

  const formatNumber = (n: number) =>
    Number.isInteger(n) ? n.toLocaleString() : n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-slate-400";

  const resultBox = (content: React.ReactNode) => (
    <div className="mt-4 rounded-lg bg-slate-50 px-5 py-4 dark:bg-slate-800/60">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {ko ? "결과" : "Result"}
      </p>
      <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
        {content}
      </p>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {ko ? "퍼센트 계산기" : "Percent Calculator"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {ko
          ? "퍼센트 계산, 할인율 계산, 증감률 계산을 간편하게 하세요."
          : "Calculate percentages, discounts, and rate changes easily."}
      </p>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setMode(tab.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === tab.key
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            {ko ? tab.label : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Calculator Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        {/* Mode 1: B% of A */}
        {mode === "of" && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              {ko ? "A의 B%는 얼마인가요?" : "What is B% of A?"}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {ko ? "기준 값 (A)" : "Base value (A)"}
                </label>
                <input
                  type="number"
                  value={ofA}
                  onChange={(e) => setOfA(e.target.value)}
                  placeholder={ko ? "예: 50000" : "e.g. 50000"}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {ko ? "퍼센트 (B%)" : "Percent (B%)"}
                </label>
                <input
                  type="number"
                  value={ofB}
                  onChange={(e) => setOfB(e.target.value)}
                  placeholder={ko ? "예: 20" : "e.g. 20"}
                  className={inputClass}
                />
              </div>
            </div>
            {ofResult !== null
              ? resultBox(
                  <>
                    {formatNumber(parseFloat(ofA))}
                    {ko ? "의 " : " x "}
                    {ofB}% = <span className="text-blue-600 dark:text-blue-400">{formatNumber(ofResult)}</span>
                  </>
                )
              : resultBox(
                  <span className="text-gray-400 dark:text-gray-500">
                    {ko ? "값을 입력하세요" : "Enter values above"}
                  </span>
                )}
          </div>
        )}

        {/* Mode 2: A is what % of B */}
        {mode === "is" && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              {ko ? "A는 B의 몇 퍼센트인가요?" : "A is what percent of B?"}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {ko ? "비교 값 (A)" : "Value (A)"}
                </label>
                <input
                  type="number"
                  value={isA}
                  onChange={(e) => setIsA(e.target.value)}
                  placeholder={ko ? "예: 30" : "e.g. 30"}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {ko ? "기준 값 (B)" : "Base value (B)"}
                </label>
                <input
                  type="number"
                  value={isB}
                  onChange={(e) => setIsB(e.target.value)}
                  placeholder={ko ? "예: 50" : "e.g. 50"}
                  className={inputClass}
                />
              </div>
            </div>
            {isResult !== null
              ? resultBox(
                  <>
                    {formatNumber(parseFloat(isA))}
                    {ko ? "는 " : " is "}
                    {formatNumber(parseFloat(isB))}
                    {ko ? "의 " : " x "}
                    <span className="text-blue-600 dark:text-blue-400">{formatNumber(isResult)}%</span>
                  </>
                )
              : resultBox(
                  <span className="text-gray-400 dark:text-gray-500">
                    {ko ? "값을 입력하세요" : "Enter values above"}
                  </span>
                )}
          </div>
        )}

        {/* Mode 3: Discount */}
        {mode === "discount" && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              {ko ? "할인율 계산" : "Discount Calculator"}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {ko ? "원래 가격" : "Original price"}
                </label>
                <input
                  type="number"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  placeholder={ko ? "예: 50000" : "e.g. 50000"}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {ko ? "할인율 (%)" : "Discount rate (%)"}
                </label>
                <input
                  type="number"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(e.target.value)}
                  placeholder={ko ? "예: 20" : "e.g. 20"}
                  className={inputClass}
                />
              </div>
            </div>
            {discountFinal !== null && discountSaved !== null
              ? resultBox(
                  <div className="space-y-1">
                    <div>
                      {ko ? "최종 가격: " : "Final price: "}
                      <span className="text-blue-600 dark:text-blue-400">
                        {formatNumber(discountFinal)}
                      </span>
                    </div>
                    <div className="text-base font-normal text-gray-500 dark:text-gray-400">
                      {ko ? "절약 금액: " : "You save: "}
                      <span className="text-green-600 dark:text-green-400">
                        {formatNumber(discountSaved)}
                      </span>
                    </div>
                  </div>
                )
              : resultBox(
                  <span className="text-gray-400 dark:text-gray-500">
                    {ko ? "값을 입력하세요" : "Enter values above"}
                  </span>
                )}
          </div>
        )}

        {/* Mode 4: % Change */}
        {mode === "change" && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              {ko ? "증감률 계산" : "Percentage Change"}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {ko ? "이전 값 (From)" : "From value"}
                </label>
                <input
                  type="number"
                  value={changeFrom}
                  onChange={(e) => setChangeFrom(e.target.value)}
                  placeholder={ko ? "예: 200" : "e.g. 200"}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {ko ? "이후 값 (To)" : "To value"}
                </label>
                <input
                  type="number"
                  value={changeTo}
                  onChange={(e) => setChangeTo(e.target.value)}
                  placeholder={ko ? "예: 250" : "e.g. 250"}
                  className={inputClass}
                />
              </div>
            </div>
            {changeResult !== null
              ? resultBox(
                  <>
                    {formatNumber(parseFloat(changeFrom))} → {formatNumber(parseFloat(changeTo))}:{" "}
                    <span
                      className={
                        changeResult >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {changeResult >= 0 ? "+" : ""}
                      {formatNumber(changeResult)}%
                    </span>
                    <span className="ml-2 text-base font-normal text-gray-500 dark:text-gray-400">
                      ({changeResult >= 0 ? (ko ? "증가" : "increase") : (ko ? "감소" : "decrease")})
                    </span>
                  </>
                )
              : resultBox(
                  <span className="text-gray-400 dark:text-gray-500">
                    {ko ? "값을 입력하세요" : "Enter values above"}
                  </span>
                )}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {ko ? "퍼센트 계산기란?" : "What is a Percent Calculator?"}
        </h2>
        <p>
          {ko
            ? "퍼센트 계산기는 백분율 관련 계산을 빠르고 정확하게 수행하는 무료 온라인 도구입니다. 특정 값의 퍼센트 계산, 두 수의 비율 계산, 할인율 적용 후 최종 가격 계산, 두 값 사이의 증감률 계산 등을 지원합니다."
            : "A percent calculator is a free online tool for quick and accurate percentage calculations. It supports computing a percentage of a value, finding what percent one number is of another, calculating discounted prices, and determining the percentage change between two values."}
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {ko ? "사용 예시" : "Example Uses"}
        </h3>
        <ul className="list-inside list-disc space-y-1">
          <li>{ko ? "쇼핑할 때 할인 금액 계산" : "Calculate savings when shopping with discounts"}</li>
          <li>{ko ? "시험 점수의 백분율 확인" : "Find the percentage score on a test"}</li>
          <li>{ko ? "매출 증감률 분석" : "Analyze revenue growth or decline"}</li>
          <li>{ko ? "팁이나 세금 계산" : "Calculate tips or tax amounts"}</li>
        </ul>
      </div>
    </div>
  );
}
