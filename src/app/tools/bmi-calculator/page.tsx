"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

interface BmiResult {
  bmi: number;
  category: string;
  color: string;
  bgColor: string;
  minHealthy: number;
  maxHealthy: number;
}

export default function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<BmiResult | null>(null);
  const { locale } = useLocale();

  const categories = [
    { min: 0, max: 18.5, ko: "저체중", en: "Underweight", color: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-500", barColor: "bg-blue-400" },
    { min: 18.5, max: 23, ko: "정상", en: "Normal", color: "text-green-600 dark:text-green-400", bgColor: "bg-green-500", barColor: "bg-green-400" },
    { min: 23, max: 25, ko: "과체중", en: "Overweight", color: "text-yellow-600 dark:text-yellow-400", bgColor: "bg-yellow-500", barColor: "bg-yellow-400" },
    { min: 25, max: 30, ko: "비만", en: "Obese", color: "text-orange-600 dark:text-orange-400", bgColor: "bg-orange-500", barColor: "bg-orange-400" },
    { min: 30, max: 100, ko: "고도비만", en: "Severely Obese", color: "text-red-600 dark:text-red-400", bgColor: "bg-red-500", barColor: "bg-red-400" },
  ];

  const calculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return;

    const heightM = h / 100;
    const bmi = w / (heightM * heightM);
    const cat = categories.find((c) => bmi < c.max) || categories[categories.length - 1];

    const minHealthy = 18.5 * heightM * heightM;
    const maxHealthy = 22.9 * heightM * heightM;

    setResult({
      bmi,
      category: locale === "ko" ? cat.ko : cat.en,
      color: cat.color,
      bgColor: cat.bgColor,
      minHealthy: Math.round(minHealthy * 10) / 10,
      maxHealthy: Math.round(maxHealthy * 10) / 10,
    });
  };

  const getIndicatorPosition = (bmi: number) => {
    // Scale: 10 to 40 maps to 0% to 100%
    const clamped = Math.max(10, Math.min(40, bmi));
    return ((clamped - 10) / 30) * 100;
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "BMI 계산기" : "BMI Calculator"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "키와 몸무게를 입력하면 체질량지수(BMI)를 계산합니다."
          : "Enter your height and weight to calculate your Body Mass Index."}
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "키 (cm)" : "Height (cm)"}
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={locale === "ko" ? "예: 170" : "e.g. 170"}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "몸무게 (kg)" : "Weight (kg)"}
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={locale === "ko" ? "예: 65" : "e.g. 65"}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full rounded-lg bg-red-600 py-3 text-sm font-medium text-white hover:bg-red-700"
        >
          {locale === "ko" ? "BMI 계산하기" : "Calculate BMI"}
        </button>

        {result && (
          <div className="mt-8 space-y-6">
            {/* BMI Result */}
            <div className="rounded-xl bg-gray-50 p-6 text-center dark:bg-gray-800">
              <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                {locale === "ko" ? "당신의 BMI" : "Your BMI"}
              </p>
              <p className={`text-5xl font-bold ${result.color}`}>
                {result.bmi.toFixed(1)}
              </p>
              <p className={`mt-2 text-lg font-semibold ${result.color}`}>
                {result.category}
              </p>
            </div>

            {/* BMI Scale Bar */}
            <div>
              <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                {locale === "ko" ? "BMI 범위" : "BMI Scale"}
              </p>
              <div className="relative">
                <div className="flex h-6 overflow-hidden rounded-full">
                  <div className="w-[28%] bg-blue-400" title={locale === "ko" ? "저체중" : "Underweight"} />
                  <div className="w-[15%] bg-green-400" title={locale === "ko" ? "정상" : "Normal"} />
                  <div className="w-[7%] bg-yellow-400" title={locale === "ko" ? "과체중" : "Overweight"} />
                  <div className="w-[17%] bg-orange-400" title={locale === "ko" ? "비만" : "Obese"} />
                  <div className="w-[33%] bg-red-400" title={locale === "ko" ? "고도비만" : "Severely Obese"} />
                </div>
                {/* Indicator */}
                <div
                  className="absolute -top-1 h-8 w-1 rounded bg-gray-900 dark:bg-white"
                  style={{ left: `${getIndicatorPosition(result.bmi)}%`, transform: "translateX(-50%)" }}
                />
                <div
                  className="absolute top-9 text-xs font-bold text-gray-900 dark:text-white"
                  style={{ left: `${getIndicatorPosition(result.bmi)}%`, transform: "translateX(-50%)" }}
                >
                  {result.bmi.toFixed(1)}
                </div>
              </div>
              <div className="mt-8 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>10</span>
                <span>18.5</span>
                <span>23</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
              </div>
            </div>

            {/* Category Legend */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {categories.map((cat) => (
                <div
                  key={cat.ko}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 p-2 dark:border-gray-700"
                >
                  <div className={`h-3 w-3 rounded-full ${cat.bgColor}`} />
                  <div className="text-xs">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {locale === "ko" ? cat.ko : cat.en}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {cat.max < 100 ? `${cat.min}–${cat.max}` : `${cat.min}+`}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Healthy Weight Range */}
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                {locale === "ko"
                  ? `키 ${height}cm 기준 정상 체중 범위`
                  : `Healthy weight range for ${height}cm`}
              </p>
              <p className="mt-1 text-2xl font-bold text-green-700 dark:text-green-400">
                {result.minHealthy.toFixed(1)} – {result.maxHealthy.toFixed(1)} kg
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "BMI(체질량지수)란?" : "What is BMI?"}
        </h2>
        <p>
          {locale === "ko"
            ? "BMI(Body Mass Index, 체질량지수)는 키와 몸무게를 이용해 비만도를 측정하는 지표입니다. BMI = 체중(kg) ÷ 키(m)²로 계산합니다. 간편하게 건강 상태를 파악할 수 있지만, 근육량이나 체지방률은 반영하지 않으므로 참고 지표로 활용하세요."
            : "BMI (Body Mass Index) is a measure of body fat based on height and weight. It is calculated as weight (kg) divided by height (m) squared. While it provides a quick health indicator, it does not account for muscle mass or body fat percentage."}
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "한국 기준 vs WHO 기준" : "Korean vs WHO Standards"}
        </h3>
        <p>
          {locale === "ko"
            ? "이 계산기는 대한비만학회 기준을 사용합니다. WHO 기준에서는 BMI 25 이상을 과체중으로 분류하지만, 한국인을 포함한 아시아인은 같은 BMI에서도 체지방률이 높고 대사 질환 위험이 크기 때문에 BMI 23부터 과체중으로 분류합니다."
            : "This calculator uses Korean Obesity Society standards. While the WHO classifies overweight as BMI ≥ 25, Asian populations including Koreans tend to have higher body fat percentages and metabolic risks at lower BMI levels, so overweight is classified from BMI 23."}
        </p>
      </div>
    </div>
  );
}
