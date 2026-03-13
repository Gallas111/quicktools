"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/components/LocaleProvider";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [now, setNow] = useState(0);
  const [copied, setCopied] = useState("");
  const { locale, t } = useLocale();

  useEffect(() => {
    const ts = Math.floor(Date.now() / 1000);
    setNow(ts);
    setTimestamp(String(ts));
    setDateStr(new Date(ts * 1000).toISOString().slice(0, 19));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTimestampChange = (val: string) => {
    setTimestamp(val);
    const num = Number(val);
    if (!isNaN(num) && val.trim()) {
      const ms = val.length > 10 ? num : num * 1000;
      const d = new Date(ms);
      if (!isNaN(d.getTime())) {
        setDateStr(d.toISOString().slice(0, 19));
      }
    }
  };

  const handleDateChange = (val: string) => {
    setDateStr(val);
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      setTimestamp(String(Math.floor(d.getTime() / 1000)));
    }
  };

  const copyValue = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  const tsNum = Number(timestamp);
  const parsed = !isNaN(tsNum) && timestamp.trim()
    ? new Date((timestamp.length > 10 ? tsNum : tsNum * 1000))
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "타임스탬프 변환기" : "Timestamp Converter"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "Unix 타임스탬프와 날짜를 실시간으로 변환하세요."
          : "Convert between Unix timestamps and human-readable dates."}
      </p>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {locale === "ko" ? "현재 Unix 타임스탬프" : "Current Unix Timestamp"}
          </div>
          <div className="mt-1 font-mono text-3xl font-bold text-lime-600 dark:text-lime-400">
            {now}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "Unix 타임스탬프" : "Unix Timestamp"}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={timestamp}
                onChange={(e) => handleTimestampChange(e.target.value)}
                placeholder="1700000000"
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <button
                onClick={() => copyValue(timestamp, "ts")}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {copied === "ts" ? t.copied : t.copy}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "날짜/시간 (UTC)" : "Date/Time (UTC)"}
            </label>
            <div className="flex gap-2">
              <input
                type="datetime-local"
                value={dateStr}
                onChange={(e) => handleDateChange(e.target.value)}
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <button
                onClick={() => copyValue(dateStr, "date")}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                {copied === "date" ? t.copied : t.copy}
              </button>
            </div>
          </div>
        </div>

        {parsed && !isNaN(parsed.getTime()) && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
              <div className="text-xs text-gray-500 dark:text-gray-400">UTC</div>
              <div className="font-mono text-sm text-gray-900 dark:text-white">{parsed.toUTCString()}</div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {locale === "ko" ? "현지 시간" : "Local Time"}
              </div>
              <div className="font-mono text-sm text-gray-900 dark:text-white">{parsed.toLocaleString()}</div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
              <div className="text-xs text-gray-500 dark:text-gray-400">ISO 8601</div>
              <div className="font-mono text-sm text-gray-900 dark:text-white">{parsed.toISOString()}</div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {locale === "ko" ? "밀리초 타임스탬프" : "Millisecond Timestamp"}
              </div>
              <div className="font-mono text-sm text-gray-900 dark:text-white">{parsed.getTime()}</div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "Unix 타임스탬프란?" : "What is a Unix Timestamp?"}
        </h2>
        <p>
          {locale === "ko"
            ? "Unix 타임스탬프(Epoch time)는 1970년 1월 1일 00:00:00 UTC부터 경과한 초(seconds)의 수입니다. 프로그래밍, 데이터베이스, API에서 날짜/시간을 표현하는 표준적인 방법으로, 시간대에 관계없이 동일한 시점을 나타냅니다."
            : "A Unix timestamp (Epoch time) is the number of seconds since January 1, 1970, 00:00:00 UTC. It's the standard way to represent dates in programming, databases, and APIs — timezone-independent and universally consistent."}
        </p>
      </div>
    </div>
  );
}
