"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

function formatNumber(n: number): string {
  return Math.round(n).toLocaleString("ko-KR");
}

function calculateIncomeTax(annualTaxableIncome: number, dependents: number, childrenUnder20: number): number {
  // Simplified Korean progressive income tax brackets
  const brackets = [
    { limit: 14_000_000, rate: 0.06 },
    { limit: 50_000_000, rate: 0.15 },
    { limit: 88_000_000, rate: 0.24 },
    { limit: 150_000_000, rate: 0.35 },
    { limit: 300_000_000, rate: 0.38 },
    { limit: 500_000_000, rate: 0.40 },
    { limit: 1_000_000_000, rate: 0.42 },
    { limit: Infinity, rate: 0.45 },
  ];

  const cumulativeDeductions = [0, 1_080_000, 6_540_000, 15_660_000, 37_360_000, 94_060_000, 174_060_000];

  let tax = 0;
  let prev = 0;
  for (let i = 0; i < brackets.length; i++) {
    if (annualTaxableIncome <= brackets[i].limit) {
      tax = (annualTaxableIncome - prev) * brackets[i].rate + (cumulativeDeductions[i] || 0);
      break;
    }
    prev = brackets[i].limit;
  }

  // Basic personal deduction per dependent (simplified)
  const personalDeduction = dependents * 1_500_000;
  // Child tax credit
  const childCredit = childrenUnder20 > 0 ? (childrenUnder20 === 1 ? 150_000 : childrenUnder20 === 2 ? 300_000 : 300_000 + (childrenUnder20 - 2) * 300_000) : 0;

  // Apply deductions to taxable income and recalculate
  const adjustedIncome = Math.max(0, annualTaxableIncome - personalDeduction);

  let adjustedTax = 0;
  prev = 0;
  for (let i = 0; i < brackets.length; i++) {
    if (adjustedIncome <= brackets[i].limit) {
      adjustedTax = (adjustedIncome - prev) * brackets[i].rate + (cumulativeDeductions[i] || 0);
      break;
    }
    prev = brackets[i].limit;
  }

  return Math.max(0, adjustedTax - childCredit);
}

interface DeductionItem {
  labelKo: string;
  labelEn: string;
  amount: number;
}

export default function SalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState<string>("50000000");
  const [dependents, setDependents] = useState<number>(1);
  const [childrenUnder20, setChildrenUnder20] = useState<number>(0);
  const [nonTaxable, setNonTaxable] = useState<string>("200000");
  const { locale } = useLocale();

  const salary = Number(annualSalary.replace(/,/g, "")) || 0;
  const nonTax = Number(nonTaxable.replace(/,/g, "")) || 0;
  const monthlySalary = salary / 12;
  const monthlyTaxable = Math.max(0, monthlySalary - nonTax);

  // 국민연금: 4.5%, capped at monthly salary of 5,900,000
  const pensionBase = Math.min(monthlyTaxable, 5_900_000);
  const nationalPension = pensionBase * 0.045;

  // 건강보험: 3.545%
  const healthInsurance = monthlyTaxable * 0.03545;

  // 장기요양보험: 건강보험 × 12.81%
  const longTermCare = healthInsurance * 0.1281;

  // 고용보험: 0.9%
  const employmentInsurance = monthlyTaxable * 0.009;

  // 소득세 (annual then divide by 12)
  const annualTaxableIncome = Math.max(0, salary - nonTax * 12);
  const annualIncomeTax = calculateIncomeTax(annualTaxableIncome, dependents, childrenUnder20);
  const monthlyIncomeTax = annualIncomeTax / 12;

  // 지방소득세: 소득세 × 10%
  const localIncomeTax = monthlyIncomeTax * 0.1;

  const deductions: DeductionItem[] = [
    { labelKo: "국민연금", labelEn: "National Pension", amount: nationalPension },
    { labelKo: "건강보험", labelEn: "Health Insurance", amount: healthInsurance },
    { labelKo: "장기요양보험", labelEn: "Long-term Care", amount: longTermCare },
    { labelKo: "고용보험", labelEn: "Employment Insurance", amount: employmentInsurance },
    { labelKo: "소득세", labelEn: "Income Tax", amount: monthlyIncomeTax },
    { labelKo: "지방소득세", labelEn: "Local Income Tax", amount: localIncomeTax },
  ];

  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
  const monthlyTakeHome = monthlySalary - totalDeductions;
  const annualTakeHome = monthlyTakeHome * 12;

  const handleSalaryChange = (value: string) => {
    const raw = value.replace(/,/g, "").replace(/[^0-9]/g, "");
    setAnnualSalary(raw);
  };

  const handleNonTaxableChange = (value: string) => {
    const raw = value.replace(/,/g, "").replace(/[^0-9]/g, "");
    setNonTaxable(raw);
  };

  const isKo = locale === "ko";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {isKo ? "연봉 실수령액 계산기" : "Salary Take-Home Pay Calculator"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {isKo
          ? "연봉에서 4대보험과 세금을 공제한 월 실수령액을 계산하세요."
          : "Calculate your monthly take-home pay after social insurance and taxes."}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Input Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {isKo ? "급여 정보 입력" : "Salary Information"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {isKo ? "연봉 (원)" : "Annual Salary (KRW)"}
              </label>
              <input
                type="text"
                value={Number(annualSalary).toLocaleString("ko-KR")}
                onChange={(e) => handleSalaryChange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="50,000,000"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {isKo ? "부양가족 수 (본인 포함)" : "Dependents (including self)"}
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={dependents}
                onChange={(e) => setDependents(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {isKo ? "20세 이하 자녀 수" : "Children under 20"}
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={childrenUnder20}
                onChange={(e) => setChildrenUnder20(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {isKo ? "비과세액 (월, 원)" : "Non-taxable Amount (monthly, KRW)"}
              </label>
              <input
                type="text"
                value={Number(nonTaxable).toLocaleString("ko-KR")}
                onChange={(e) => handleNonTaxableChange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="200,000"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {isKo ? "식대 비과세 월 20만원 기본 적용" : "Default: 200,000 KRW/month meal allowance"}
              </p>
            </div>
          </div>
        </div>

        {/* Result Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {isKo ? "공제 내역" : "Deduction Breakdown"}
          </h2>

          <div className="mb-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isKo ? "월 급여 (세전)" : "Monthly Gross"}
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatNumber(monthlySalary)}{isKo ? "원" : " KRW"}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {deductions.map((d) => (
              <div key={d.labelEn} className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {isKo ? d.labelKo : d.labelEn}
                </span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  -{formatNumber(d.amount)}{isKo ? "원" : " KRW"}
                </span>
              </div>
            ))}
          </div>

          <div className="my-4 border-t border-gray-200 dark:border-gray-700" />

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {isKo ? "공제 합계" : "Total Deductions"}
            </span>
            <span className="font-semibold text-red-600 dark:text-red-400">
              -{formatNumber(totalDeductions)}{isKo ? "원" : " KRW"}
            </span>
          </div>

          <div className="mt-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {isKo ? "월 실수령액" : "Monthly Take-Home"}
              </span>
              <span className="text-xl font-bold text-red-600 dark:text-red-400">
                {formatNumber(monthlyTakeHome)}{isKo ? "원" : " KRW"}
              </span>
            </div>
          </div>

          <div className="mt-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isKo ? "연 실수령액" : "Annual Take-Home"}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatNumber(annualTakeHome)}{isKo ? "원" : " KRW"}
              </span>
            </div>
          </div>

          {salary > 0 && (
            <div className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
              {isKo
                ? `실수령 비율: ${((monthlyTakeHome / monthlySalary) * 100).toFixed(1)}%`
                : `Take-home ratio: ${((monthlyTakeHome / monthlySalary) * 100).toFixed(1)}%`}
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
        <p className="text-sm text-yellow-800 dark:text-yellow-300">
          {isKo
            ? "* 본 계산기는 간이세액표 기준 예상 금액이며, 실제 수령액과 차이가 있을 수 있습니다. 정확한 금액은 급여명세서 또는 국세청 간이세액표를 참고하세요."
            : "* This calculator provides estimated amounts based on simplified tax brackets. Actual take-home pay may differ. Please refer to your pay stub or the National Tax Service for exact figures."}
        </p>
      </div>

      {/* Info Section */}
      <div className="mt-12 space-y-6 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {isKo ? "4대보험과 한국 세금 안내" : "Korean Social Insurance & Tax Guide"}
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              {isKo ? "국민연금 (National Pension)" : "National Pension"}
            </h3>
            <p>
              {isKo
                ? "근로자와 사업주가 각각 4.5%씩 부담합니다. 월 소득 상한액은 590만원이며, 이를 초과하는 소득에 대해서는 추가 부담이 없습니다. 만 60세 이후 연금으로 수령합니다."
                : "Both employee and employer contribute 4.5% each. The monthly income cap is 5.9 million KRW. You receive pension benefits after age 60."}
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              {isKo ? "건강보험 (Health Insurance)" : "Health Insurance"}
            </h3>
            <p>
              {isKo
                ? "근로자 부담률은 3.545%이며, 사업주도 동일하게 부담합니다. 병원 진료, 약제비 등 의료비를 지원받을 수 있습니다."
                : "Employee contribution rate is 3.545%, matched by the employer. Covers hospital visits, prescriptions, and medical expenses."}
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              {isKo ? "장기요양보험 (Long-term Care Insurance)" : "Long-term Care Insurance"}
            </h3>
            <p>
              {isKo
                ? "건강보험료의 12.81%를 추가로 부담합니다. 고령이나 노인성 질병으로 일상생활이 어려운 분들을 위한 서비스를 지원합니다."
                : "An additional 12.81% of health insurance premium. Supports elderly or those with age-related conditions requiring daily living assistance."}
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              {isKo ? "고용보험 (Employment Insurance)" : "Employment Insurance"}
            </h3>
            <p>
              {isKo
                ? "근로자 부담률은 0.9%입니다. 실업 시 구직급여(실업급여)를 받을 수 있으며, 육아휴직급여 등 다양한 지원을 제공합니다."
                : "Employee contribution rate is 0.9%. Provides unemployment benefits, parental leave pay, and various employment support services."}
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              {isKo ? "소득세 및 지방소득세" : "Income Tax & Local Income Tax"}
            </h3>
            <p>
              {isKo
                ? "소득세는 과세표준 구간에 따라 6%~45%의 누진세율이 적용됩니다. 지방소득세는 소득세의 10%입니다. 부양가족 수와 자녀 수에 따라 공제 혜택이 달라집니다."
                : "Income tax applies progressive rates from 6% to 45% based on taxable income brackets. Local income tax is 10% of income tax. Deductions vary by number of dependents and children."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
