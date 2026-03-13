"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

type Category = "length" | "weight" | "temperature" | "area" | "volume" | "speed";

interface UnitDef {
  key: string;
  label: { ko: string; en: string };
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const categories: Record<Category, { label: { ko: string; en: string }; units: UnitDef[] }> = {
  length: {
    label: { ko: "길이", en: "Length" },
    units: [
      { key: "mm", label: { ko: "밀리미터 (mm)", en: "Millimeter (mm)" }, toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { key: "cm", label: { ko: "센티미터 (cm)", en: "Centimeter (cm)" }, toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { key: "m", label: { ko: "미터 (m)", en: "Meter (m)" }, toBase: (v) => v, fromBase: (v) => v },
      { key: "km", label: { ko: "킬로미터 (km)", en: "Kilometer (km)" }, toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { key: "inch", label: { ko: "인치 (in)", en: "Inch (in)" }, toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      { key: "feet", label: { ko: "피트 (ft)", en: "Feet (ft)" }, toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { key: "yard", label: { ko: "야드 (yd)", en: "Yard (yd)" }, toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { key: "mile", label: { ko: "마일 (mi)", en: "Mile (mi)" }, toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
    ],
  },
  weight: {
    label: { ko: "무게", en: "Weight" },
    units: [
      { key: "mg", label: { ko: "밀리그램 (mg)", en: "Milligram (mg)" }, toBase: (v) => v / 1_000_000, fromBase: (v) => v * 1_000_000 },
      { key: "g", label: { ko: "그램 (g)", en: "Gram (g)" }, toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { key: "kg", label: { ko: "킬로그램 (kg)", en: "Kilogram (kg)" }, toBase: (v) => v, fromBase: (v) => v },
      { key: "ton", label: { ko: "톤 (t)", en: "Ton (t)" }, toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { key: "oz", label: { ko: "온스 (oz)", en: "Ounce (oz)" }, toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
      { key: "lb", label: { ko: "파운드 (lb)", en: "Pound (lb)" }, toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    ],
  },
  temperature: {
    label: { ko: "온도", en: "Temperature" },
    units: [
      { key: "celsius", label: { ko: "섭씨 (°C)", en: "Celsius (°C)" }, toBase: (v) => v, fromBase: (v) => v },
      { key: "fahrenheit", label: { ko: "화씨 (°F)", en: "Fahrenheit (°F)" }, toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
      { key: "kelvin", label: { ko: "켈빈 (K)", en: "Kelvin (K)" }, toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  area: {
    label: { ko: "넓이", en: "Area" },
    units: [
      { key: "mm2", label: { ko: "mm²", en: "mm²" }, toBase: (v) => v / 1_000_000, fromBase: (v) => v * 1_000_000 },
      { key: "cm2", label: { ko: "cm²", en: "cm²" }, toBase: (v) => v / 10_000, fromBase: (v) => v * 10_000 },
      { key: "m2", label: { ko: "m²", en: "m²" }, toBase: (v) => v, fromBase: (v) => v },
      { key: "km2", label: { ko: "km²", en: "km²" }, toBase: (v) => v * 1_000_000, fromBase: (v) => v / 1_000_000 },
      { key: "pyeong", label: { ko: "평", en: "Pyeong" }, toBase: (v) => v * 3.3058, fromBase: (v) => v / 3.3058 },
      { key: "ft2", label: { ko: "ft²", en: "ft²" }, toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      { key: "acre", label: { ko: "에이커 (acre)", en: "Acre" }, toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    ],
  },
  volume: {
    label: { ko: "부피", en: "Volume" },
    units: [
      { key: "mL", label: { ko: "밀리리터 (mL)", en: "Milliliter (mL)" }, toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { key: "L", label: { ko: "리터 (L)", en: "Liter (L)" }, toBase: (v) => v, fromBase: (v) => v },
      { key: "gallon", label: { ko: "갤런 (gal)", en: "Gallon (gal)" }, toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      { key: "floz", label: { ko: "액량 온스 (fl oz)", en: "Fluid Ounce (fl oz)" }, toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
      { key: "cup", label: { ko: "컵 (cup)", en: "Cup" }, toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
    ],
  },
  speed: {
    label: { ko: "속도", en: "Speed" },
    units: [
      { key: "ms", label: { ko: "m/s", en: "m/s" }, toBase: (v) => v, fromBase: (v) => v },
      { key: "kmh", label: { ko: "km/h", en: "km/h" }, toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { key: "mph", label: { ko: "mph", en: "mph" }, toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { key: "knots", label: { ko: "노트 (knots)", en: "Knots" }, toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    ],
  },
};

const categoryKeys: Category[] = ["length", "weight", "temperature", "area", "volume", "speed"];

function formatNumber(n: number): string {
  if (Number.isNaN(n) || !Number.isFinite(n)) return "";
  if (Math.abs(n) < 0.000001 && n !== 0) return n.toExponential(6);
  const str = n.toPrecision(10);
  return parseFloat(str).toString();
}

export default function UnitConverter() {
  const { locale } = useLocale();
  const [activeCategory, setActiveCategory] = useState<Category>("length");
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState(0);
  const [toUnit, setToUnit] = useState(1);

  const cat = categories[activeCategory];
  const units = cat.units;

  const convert = (): string => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return "";
    const baseValue = units[fromUnit].toBase(val);
    const result = units[toUnit].fromBase(baseValue);
    return formatNumber(result);
  };

  const handleCategoryChange = (c: Category) => {
    setActiveCategory(c);
    setInputValue("1");
    setFromUnit(0);
    setToUnit(1);
  };

  const handleSwap = () => {
    const result = convert();
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setInputValue(result || "1");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "단위 변환기" : "Unit Converter"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "길이, 무게, 온도, 넓이, 부피, 속도 등 다양한 단위를 실시간으로 변환하세요."
          : "Convert length, weight, temperature, area, volume, speed and more in real-time."}
      </p>

      {/* Category Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categoryKeys.map((key) => (
          <button
            key={key}
            onClick={() => handleCategoryChange(key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === key
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            {categories[key].label[locale === "ko" ? "ko" : "en"]}
          </button>
        ))}
      </div>

      {/* Converter Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        {/* From */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "변환할 값" : "From"}
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:flex-1"
              placeholder="0"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-auto sm:min-w-[160px]"
            >
              {units.map((u, i) => (
                <option key={u.key} value={i}>
                  {u.label[locale === "ko" ? "ko" : "en"]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="mb-4 flex justify-center">
          <button
            onClick={handleSwap}
            className="rounded-full border border-gray-200 bg-gray-50 p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            title={locale === "ko" ? "단위 교환" : "Swap units"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* To */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "변환 결과" : "To"}
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:flex-1">
              {convert() || "\u00A0"}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-auto sm:min-w-[160px]"
            >
              {units.map((u, i) => (
                <option key={u.key} value={i}>
                  {u.label[locale === "ko" ? "ko" : "en"]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Reference */}
        {inputValue && !isNaN(parseFloat(inputValue)) && (
          <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "전체 변환 결과" : "All Conversions"}
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {units.map((u, i) => {
                if (i === fromUnit) return null;
                const val = parseFloat(inputValue);
                const base = units[fromUnit].toBase(val);
                const result = u.fromBase(base);
                return (
                  <div key={u.key} className="rounded-md bg-white px-3 py-2 text-sm dark:bg-gray-900">
                    <span className="text-gray-500 dark:text-gray-400">{u.label[locale === "ko" ? "ko" : "en"]}</span>
                    <div className="font-mono text-gray-900 dark:text-white">{formatNumber(result)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "단위 변환기란?" : "What is a Unit Converter?"}
        </h2>
        <p>
          {locale === "ko"
            ? "단위 변환기는 길이, 무게, 온도, 넓이, 부피, 속도 등 다양한 단위를 실시간으로 변환하는 무료 온라인 도구입니다. 미터법과 야드파운드법 간의 변환, 온도 단위 변환, 한국 고유 단위인 '평' 변환 등을 지원합니다."
            : "A unit converter is a free online tool that converts various units including length, weight, temperature, area, volume, and speed in real-time. It supports conversions between metric and imperial systems, temperature unit conversions, and Korean traditional units like 'pyeong'."}
        </p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "주요 변환 공식" : "Key Conversion Formulas"}
        </h3>
        <ul className="list-inside list-disc space-y-1">
          <li>1 inch = 2.54 cm</li>
          <li>1 lb = 0.453592 kg</li>
          <li>{locale === "ko" ? "1 평 = 3.3058 m²" : "1 pyeong = 3.3058 m²"}</li>
          <li>{locale === "ko" ? "°F = °C × 9/5 + 32" : "°F = °C × 9/5 + 32"}</li>
          <li>K = °C + 273.15</li>
          <li>1 mile = 1.60934 km</li>
          <li>1 gallon = 3.78541 L</li>
        </ul>
      </div>
    </div>
  );
}
