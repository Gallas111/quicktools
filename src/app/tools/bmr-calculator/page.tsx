"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

type Gender = "male" | "female";

interface BmrResult {
  bmr: number;
  tdee: number;
  loseWeight: number;
  gainWeight: number;
}

const activityLevels = [
  { value: 1.2, ko: "비활동적 (사무직, 운동 안 함)", en: "Sedentary (office job, no exercise)" },
  { value: 1.375, ko: "가벼운 활동 (주 1-3회 가벼운 운동)", en: "Light (light exercise 1-3 days/week)" },
  { value: 1.55, ko: "보통 활동 (주 3-5회 운동)", en: "Moderate (exercise 3-5 days/week)" },
  { value: 1.725, ko: "활동적 (주 6-7회 운동)", en: "Active (hard exercise 6-7 days/week)" },
  { value: 1.9, ko: "매우 활동적 (육체노동, 하루 2회 운동)", en: "Very Active (physical job or 2x training)" },
];

export default function BmrCalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState(1.55);
  const [result, setResult] = useState<BmrResult | null>(null);
  const { locale } = useLocale();

  const calculate = () => {
    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!a || !h || !w || a <= 0 || h <= 0 || w <= 0) return;

    // Mifflin-St Jeor Equation
    const bmr =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = bmr * activity;

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      loseWeight: Math.round(tdee - 500),
      gainWeight: Math.round(tdee + 500),
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "기초대사량 계산기" : "BMR Calculator"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "기초대사량(BMR)과 일일 권장 칼로리(TDEE)를 계산하세요."
          : "Calculate your Basal Metabolic Rate and Total Daily Energy Expenditure."}
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        {/* Gender Selection */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "성별" : "Gender"}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setGender("male")}
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                gender === "male"
                  ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {locale === "ko" ? "남성" : "Male"}
            </button>
            <button
              onClick={() => setGender("female")}
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                gender === "female"
                  ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {locale === "ko" ? "여성" : "Female"}
            </button>
          </div>
        </div>

        {/* Age, Height, Weight */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "나이 (세)" : "Age (years)"}
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder={locale === "ko" ? "예: 25" : "e.g. 25"}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
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

        {/* Activity Level */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "활동 수준" : "Activity Level"}
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(parseFloat(e.target.value))}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            {activityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {locale === "ko" ? level.ko : level.en}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={calculate}
          className="w-full rounded-lg bg-red-600 py-3 text-sm font-medium text-white hover:bg-red-700"
        >
          {locale === "ko" ? "계산하기" : "Calculate"}
        </button>

        {result && (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* BMR */}
            <div className="rounded-xl bg-gray-50 p-5 text-center dark:bg-gray-800">
              <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                {locale === "ko" ? "기초대사량 (BMR)" : "Basal Metabolic Rate"}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {result.bmr.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">kcal / {locale === "ko" ? "일" : "day"}</p>
            </div>

            {/* TDEE */}
            <div className="rounded-xl bg-red-50 p-5 text-center dark:bg-red-950">
              <p className="mb-1 text-sm text-red-600 dark:text-red-400">
                {locale === "ko" ? "일일 권장 칼로리 (TDEE)" : "Total Daily Energy Expenditure"}
              </p>
              <p className="text-3xl font-bold text-red-700 dark:text-red-300">
                {result.tdee.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">kcal / {locale === "ko" ? "일" : "day"}</p>
            </div>

            {/* Weight Loss */}
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-center dark:border-blue-900 dark:bg-blue-950">
              <p className="mb-1 text-sm text-blue-600 dark:text-blue-400">
                {locale === "ko" ? "체중 감량 목표" : "Weight Loss Goal"}
              </p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                {result.loseWeight.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-blue-500 dark:text-blue-400">
                kcal / {locale === "ko" ? "일" : "day"} <span className="text-xs">(-500)</span>
              </p>
            </div>

            {/* Weight Gain */}
            <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-center dark:border-green-900 dark:bg-green-950">
              <p className="mb-1 text-sm text-green-600 dark:text-green-400">
                {locale === "ko" ? "체중 증가 목표" : "Weight Gain Goal"}
              </p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                {result.gainWeight.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-green-500 dark:text-green-400">
                kcal / {locale === "ko" ? "일" : "day"} <span className="text-xs">(+500)</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "기초대사량(BMR)이란?" : "What is BMR?"}
        </h2>
        <p>
          {locale === "ko"
            ? "기초대사량(Basal Metabolic Rate)은 생명을 유지하기 위해 최소한으로 필요한 에너지량입니다. 아무런 활동 없이 안정 상태에서 호흡, 혈액순환, 체온 유지 등에 사용되는 칼로리를 의미합니다. 이 계산기는 가장 정확한 것으로 알려진 Mifflin-St Jeor 공식을 사용합니다."
            : "Basal Metabolic Rate (BMR) is the minimum amount of energy your body needs to sustain basic life functions at rest, including breathing, circulation, and temperature regulation. This calculator uses the Mifflin-St Jeor equation, widely considered the most accurate BMR formula."}
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "TDEE와 칼로리 목표" : "TDEE and Calorie Goals"}
        </h3>
        <p>
          {locale === "ko"
            ? "TDEE(Total Daily Energy Expenditure)는 BMR에 활동 수준을 곱해 하루 동안 실제로 소비하는 총 칼로리입니다. 체중 감량을 위해서는 TDEE보다 약 500kcal 적게, 체중 증가를 위해서는 약 500kcal 더 섭취하는 것이 일반적으로 권장됩니다. 이는 주당 약 0.5kg의 변화에 해당합니다."
            : "TDEE (Total Daily Energy Expenditure) is your BMR multiplied by your activity level, representing the total calories you burn per day. To lose weight, consuming about 500 kcal below TDEE is generally recommended, while gaining weight requires about 500 kcal above TDEE. This translates to roughly 0.5 kg (1 lb) per week."}
        </p>
      </div>
    </div>
  );
}
