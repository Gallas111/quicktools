"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

const DAYS_KO = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const DAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function calcAge(birth: Date, today: Date) {
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function daysUntilNextBirthday(birth: Date, today: Date) {
  let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday <= today) {
    nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }
  const diff = nextBirthday.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function totalDaysLived(birth: Date, today: Date) {
  const diff = today.getTime() - birth.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const { locale } = useLocale();

  const ko = locale === "ko";
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const birth = birthDate ? new Date(birthDate + "T00:00:00") : null;
  const valid = birth && !isNaN(birth.getTime()) && birth <= today;

  const age = valid ? calcAge(birth, today) : null;
  const koreanAge = valid ? today.getFullYear() - birth.getFullYear() + 1 : null;
  const nextBday = valid ? daysUntilNextBirthday(birth, today) : null;
  const totalDays = valid ? totalDaysLived(birth, today) : null;
  const birthDay = valid ? (ko ? DAYS_KO[birth.getDay()] : DAYS_EN[birth.getDay()]) : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {ko ? "만나이 계산기" : "Age Calculator"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {ko
          ? "생년월일을 입력하면 만나이, 한국나이, 다음 생일까지 남은 일수를 계산합니다."
          : "Enter your date of birth to calculate your exact age, Korean age, and days until your next birthday."}
      </p>

      {/* Input */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {ko ? "생년월일" : "Date of Birth"}
        </label>
        <input
          type="date"
          value={birthDate}
          max={today.toISOString().slice(0, 10)}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-64"
        />
      </div>

      {/* Results */}
      {valid && age && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* 만나이 */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {ko ? "만나이 (International Age)" : "International Age"}
            </div>
            <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">
              {age.years}
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                {ko ? "세" : " years"}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {age.months}{ko ? "개월 " : "m "}{age.days}{ko ? "일" : "d"}
            </div>
          </div>

          {/* 한국나이 */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {ko ? "한국나이 (Korean Age)" : "Korean Age"}
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {koreanAge}
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                {ko ? "세" : " years"}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {ko ? "= 현재연도 - 출생연도 + 1" : "= current year - birth year + 1"}
            </div>
          </div>

          {/* 다음 생일 */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {ko ? "다음 생일까지" : "Next Birthday"}
            </div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {nextBday}
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                {ko ? "일" : " days"}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {nextBday === 0
                ? (ko ? "오늘이 생일입니다!" : "Today is your birthday!")
                : (ko ? "남았습니다" : "remaining")}
            </div>
          </div>

          {/* 총 살아온 일수 */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {ko ? "총 살아온 일수" : "Total Days Lived"}
            </div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {totalDays?.toLocaleString()}
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                {ko ? "일" : " days"}
              </span>
            </div>
          </div>

          {/* 태어난 요일 */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {ko ? "태어난 요일" : "Day of Birth"}
            </div>
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">
              {birthDay}
            </div>
          </div>
        </div>
      )}

      {/* Info section */}
      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {ko ? "만나이 vs 한국나이" : "International Age vs Korean Age"}
        </h2>
        {ko ? (
          <>
            <p>
              <strong>만나이</strong>는 태어난 날을 0세로 시작하여, 생일이 지날 때마다 1세씩 증가하는 국제적으로 통용되는 나이 계산법입니다.
              2023년 6월부터 대한민국은 법적, 행정적으로 만나이를 공식 기준으로 사용합니다.
            </p>
            <p>
              <strong>한국나이</strong>(세는나이)는 태어나면 바로 1세이며, 매년 1월 1일에 1세씩 증가하는 한국 전통 나이 계산법입니다.
              현재는 공식적으로 사용되지 않지만, 일상 대화에서 여전히 자주 사용됩니다.
            </p>
            <p>
              예를 들어, 12월 31일에 태어난 아기는 만나이로는 0세이지만 한국나이로는 1세이며, 다음 날(1월 1일)이 되면 한국나이로 2세가 됩니다.
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>International age</strong> (만나이) starts at 0 at birth and increases by 1 on each birthday.
              Since June 2023, South Korea officially uses this system for all legal and administrative purposes.
            </p>
            <p>
              <strong>Korean age</strong> (한국나이) counts you as 1 year old at birth and adds 1 every January 1st.
              While no longer official, it is still commonly used in everyday Korean conversation.
            </p>
            <p>
              For example, a baby born on December 31 is 0 in international age but 1 in Korean age — and turns 2 in Korean age the very next day on January 1.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
