"use client";

import { useState, useMemo } from "react";
import { useLocale } from "@/components/LocaleProvider";

function toLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function diffDays(a: Date, b: Date): number {
  const msPerDay = 86400000;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((utcB - utcA) / msPerDay);
}

function formatDday(days: number, locale: string): string {
  if (days === 0) return "D-Day!";
  if (days > 0) return `D-${days}`;
  return `D+${Math.abs(days)}`;
}

export default function DdayCalculator() {
  const { locale } = useLocale();
  const ko = locale === "ko";

  const [targetDate, setTargetDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tab, setTab] = useState<"dday" | "between">("dday");

  const todayStr = toLocalDateString(new Date());

  // D-day calculation
  const ddayResult = useMemo(() => {
    if (!targetDate) return null;
    const target = new Date(targetDate + "T00:00:00");
    const today = new Date(todayStr + "T00:00:00");
    if (isNaN(target.getTime())) return null;

    const days = diffDays(today, target);
    const absDays = Math.abs(days);
    const weeks = Math.floor(absDays / 7);
    const remainDays = absDays % 7;
    const months = Math.floor(absDays / 30);
    const remainAfterMonths = absDays % 30;
    const totalHours = absDays * 24;

    return { days, absDays, weeks, remainDays, months, remainAfterMonths, totalHours };
  }, [targetDate, todayStr]);

  // Between two dates calculation
  const betweenResult = useMemo(() => {
    if (!fromDate || !toDate) return null;
    const from = new Date(fromDate + "T00:00:00");
    const to = new Date(toDate + "T00:00:00");
    if (isNaN(from.getTime()) || isNaN(to.getTime())) return null;

    const days = diffDays(from, to);
    const absDays = Math.abs(days);
    const weeks = Math.floor(absDays / 7);
    const remainDays = absDays % 7;
    const months = Math.floor(absDays / 30);
    const remainAfterMonths = absDays % 30;
    const totalHours = absDays * 24;

    return { days, absDays, weeks, remainDays, months, remainAfterMonths, totalHours };
  }, [fromDate, toDate]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {ko ? "D-day 계산기" : "D-Day Calculator"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {ko
          ? "특정 날짜까지 남은 일수 또는 두 날짜 사이의 기간을 계산하세요."
          : "Calculate days remaining to a date or the period between two dates."}
      </p>

      {/* Tab Selector */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setTab("dday")}
          className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-colors ${
            tab === "dday"
              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          }`}
        >
          {ko ? "D-day 계산" : "D-Day Count"}
        </button>
        <button
          onClick={() => setTab("between")}
          className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-colors ${
            tab === "between"
              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          }`}
        >
          {ko ? "두 날짜 사이 계산" : "Between Two Dates"}
        </button>
      </div>

      {/* D-day Tab */}
      {tab === "dday" && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {ko ? "목표 날짜" : "Target Date"}
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            {ko ? `오늘: ${todayStr}` : `Today: ${todayStr}`}
          </p>

          {ddayResult && (
            <div className="mt-6">
              {/* Big D-day display */}
              <div className="mb-6 text-center">
                <div
                  className={`inline-block rounded-2xl px-8 py-4 text-5xl font-extrabold ${
                    ddayResult.days === 0
                      ? "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400"
                      : ddayResult.days > 0
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {formatDday(ddayResult.days, locale)}
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {ddayResult.days === 0
                    ? ko ? "오늘이 바로 그 날입니다!" : "Today is the day!"
                    : ddayResult.days > 0
                      ? ko ? `${ddayResult.absDays}일 남았습니다` : `${ddayResult.absDays} days remaining`
                      : ko ? `${ddayResult.absDays}일 지났습니다` : `${ddayResult.absDays} days have passed`}
                </p>
              </div>

              {/* Breakdown */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{ko ? "총 일수" : "Total Days"}</div>
                  <div className="mt-1 font-mono text-xl font-bold text-gray-900 dark:text-white">{ddayResult.absDays}</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{ko ? "주/일" : "Weeks / Days"}</div>
                  <div className="mt-1 font-mono text-xl font-bold text-gray-900 dark:text-white">
                    {ddayResult.weeks}{ko ? "주" : "w"} {ddayResult.remainDays}{ko ? "일" : "d"}
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{ko ? "약 개월/일" : "~Months / Days"}</div>
                  <div className="mt-1 font-mono text-xl font-bold text-gray-900 dark:text-white">
                    {ddayResult.months}{ko ? "개월" : "m"} {ddayResult.remainAfterMonths}{ko ? "일" : "d"}
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{ko ? "총 시간" : "Total Hours"}</div>
                  <div className="mt-1 font-mono text-xl font-bold text-gray-900 dark:text-white">
                    {ddayResult.totalHours.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Between Two Dates Tab */}
      {tab === "between" && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {ko ? "시작 날짜" : "Start Date"}
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {ko ? "종료 날짜" : "End Date"}
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {betweenResult && (
            <div className="mt-6">
              <div className="mb-6 text-center">
                <div className="inline-block rounded-2xl bg-purple-100 px-8 py-4 text-5xl font-extrabold text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                  {betweenResult.absDays}{ko ? "일" : " days"}
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {betweenResult.days < 0
                    ? ko ? "종료 날짜가 시작 날짜보다 이전입니다" : "End date is before start date"
                    : ko ? "두 날짜 사이의 기간" : "Period between the two dates"}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{ko ? "총 일수" : "Total Days"}</div>
                  <div className="mt-1 font-mono text-xl font-bold text-gray-900 dark:text-white">{betweenResult.absDays}</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{ko ? "주/일" : "Weeks / Days"}</div>
                  <div className="mt-1 font-mono text-xl font-bold text-gray-900 dark:text-white">
                    {betweenResult.weeks}{ko ? "주" : "w"} {betweenResult.remainDays}{ko ? "일" : "d"}
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{ko ? "약 개월/일" : "~Months / Days"}</div>
                  <div className="mt-1 font-mono text-xl font-bold text-gray-900 dark:text-white">
                    {betweenResult.months}{ko ? "개월" : "m"} {betweenResult.remainAfterMonths}{ko ? "일" : "d"}
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-700 dark:bg-gray-800">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{ko ? "총 시간" : "Total Hours"}</div>
                  <div className="mt-1 font-mono text-xl font-bold text-gray-900 dark:text-white">
                    {betweenResult.totalHours.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Info Section */}
      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {ko ? "D-day 계산기란?" : "What is a D-Day Calculator?"}
        </h2>
        <p>
          {ko
            ? "D-day 계산기는 특정 목표 날짜까지 남은 일수(D-30) 또는 지나간 일수(D+5)를 계산해주는 도구입니다. 시험일, 기념일, 여행, 프로젝트 마감일 등 중요한 날짜를 쉽게 관리할 수 있습니다. 두 날짜 사이의 기간도 주, 월, 시간 단위로 확인할 수 있습니다."
            : "A D-Day calculator computes the number of days remaining (D-30) or days passed (D+5) relative to a target date. It helps you manage important dates like exams, anniversaries, trips, and project deadlines. You can also calculate the period between any two dates in weeks, months, and hours."}
        </p>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {ko ? "사용 방법" : "How to Use"}
        </h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            {ko
              ? "D-day 계산: 목표 날짜를 선택하면 오늘 기준으로 남은 일수와 상세 정보가 표시됩니다."
              : "D-Day Count: Pick a target date to see the remaining or elapsed days from today."}
          </li>
          <li>
            {ko
              ? "두 날짜 사이: 시작일과 종료일을 선택하면 두 날짜 사이의 기간이 계산됩니다."
              : "Between Two Dates: Select a start and end date to calculate the period between them."}
          </li>
          <li>
            {ko
              ? "결과에는 총 일수, 주/일 환산, 약 개월 환산, 총 시간이 포함됩니다."
              : "Results include total days, weeks/days breakdown, approximate months, and total hours."}
          </li>
        </ul>
      </div>
    </div>
  );
}
