"use client";

import { useState, useMemo } from "react";
import { useLocale } from "@/components/LocaleProvider";

interface MatchDetail {
  fullMatch: string;
  groups: string[];
  index: number;
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const { locale, t } = useLocale();

  const { matches, error, highlightedHtml } = useMemo(() => {
    if (!pattern || !testString) {
      return { matches: [] as MatchDetail[], error: "", highlightedHtml: "" };
    }

    try {
      const regex = new RegExp(pattern, flags);
      const matchDetails: MatchDetail[] = [];
      let match: RegExpExecArray | null;

      if (flags.includes("g")) {
        while ((match = regex.exec(testString)) !== null) {
          matchDetails.push({
            fullMatch: match[0],
            groups: match.slice(1),
            index: match.index,
          });
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          matchDetails.push({
            fullMatch: match[0],
            groups: match.slice(1),
            index: match.index,
          });
        }
      }

      // Build highlighted HTML
      let highlighted = "";
      let lastIndex = 0;
      const escapeHtml = (s: string) =>
        s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      for (const m of matchDetails) {
        highlighted += escapeHtml(testString.slice(lastIndex, m.index));
        highlighted += `<mark class="bg-rose-200 dark:bg-rose-800 rounded px-0.5">${escapeHtml(m.fullMatch)}</mark>`;
        lastIndex = m.index + m.fullMatch.length;
      }
      highlighted += escapeHtml(testString.slice(lastIndex));
      highlighted = highlighted.replace(/\n/g, "<br />");

      return { matches: matchDetails, error: "", highlightedHtml: highlighted };
    } catch (e) {
      return {
        matches: [] as MatchDetail[],
        error: (e as Error).message,
        highlightedHtml: "",
      };
    }
  }, [pattern, flags, testString]);

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ""));
    } else {
      setFlags(flags + flag);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "정규식 테스터" : "Regex Tester"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "정규표현식을 테스트하고 매칭 결과를 실시간으로 확인하세요."
          : "Test regular expressions and see matches highlighted in real-time."}
      </p>

      <div className="space-y-4">
        {/* Pattern input */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "정규식 패턴" : "Regex Pattern"}
          </label>
          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-400">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder={locale === "ko" ? "정규식을 입력하세요..." : "Enter regex pattern..."}
              spellCheck={false}
              className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <span className="text-lg text-gray-400">/</span>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-16 rounded-lg border border-gray-200 bg-gray-50 px-2 py-2 font-mono text-sm text-center outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="mt-3 flex gap-2">
            {[
              { flag: "g", label: locale === "ko" ? "전역 (g)" : "Global (g)" },
              { flag: "i", label: locale === "ko" ? "대소문자 무시 (i)" : "Case insensitive (i)" },
              { flag: "m", label: locale === "ko" ? "멀티라인 (m)" : "Multiline (m)" },
              { flag: "s", label: locale === "ko" ? "점-전체 (s)" : "Dotall (s)" },
            ].map(({ flag, label }) => (
              <button
                key={flag}
                onClick={() => toggleFlag(flag)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                  flags.includes(flag)
                    ? "bg-rose-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
            {locale === "ko" ? "정규식 오류: " : "Regex Error: "}
            {error}
          </div>
        )}

        {/* Test string */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "테스트 문자열" : "Test String"}
          </label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder={
              locale === "ko"
                ? "테스트할 문자열을 입력하세요..."
                : "Enter test string..."
            }
            spellCheck={false}
            className="h-36 w-full resize-y rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Highlighted result */}
        {testString && pattern && !error && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {locale === "ko" ? "매칭 결과" : "Match Result"}
              </label>
              <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                {locale === "ko"
                  ? `${matches.length}개 매칭`
                  : `${matches.length} match${matches.length !== 1 ? "es" : ""}`}
              </span>
            </div>
            <div
              className="rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm leading-relaxed dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          </div>
        )}

        {/* Match details */}
        {matches.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "매칭 상세" : "Match Details"}
            </label>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {matches.map((m, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded bg-rose-100 px-2 py-0.5 font-mono text-xs font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                      #{i + 1}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {locale === "ko" ? "전체 매칭:" : "Full match:"}
                    </span>
                    <span className="font-mono font-medium text-gray-900 dark:text-white">
                      &quot;{m.fullMatch}&quot;
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {locale === "ko" ? "인덱스:" : "Index:"} {m.index}
                    </span>
                  </div>
                  {m.groups.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.groups.map((g, gi) => (
                        <span
                          key={gi}
                          className="rounded bg-gray-200 px-2 py-0.5 font-mono text-xs dark:bg-gray-700 dark:text-gray-300"
                        >
                          {locale === "ko" ? "그룹" : "Group"} {gi + 1}: &quot;{g ?? ""}&quot;
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => {
              setPattern("");
              setFlags("g");
              setTestString("");
            }}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {t.clear}
          </button>
        </div>
      </div>

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "정규식 테스터란?" : "What is a Regex Tester?"}
        </h2>
        <p>
          {locale === "ko"
            ? "정규식 테스터는 정규표현식(Regular Expression)을 테스트하고 매칭 결과를 실시간으로 확인할 수 있는 무료 온라인 도구입니다. 패턴에 맞는 문자열을 하이라이트로 표시하고, 매칭된 그룹과 인덱스 정보를 보여줍니다. 플래그(g, i, m, s)를 조합하여 다양한 매칭 옵션을 설정할 수 있습니다. 브라우저에서 바로 실행되며 데이터가 서버로 전송되지 않습니다."
            : "Regex Tester is a free online tool for testing regular expressions and seeing matches in real-time. It highlights matching text, shows captured groups and index positions. You can combine flags (g, i, m, s) for various matching options. It runs entirely in your browser — no data is sent to any server."}
        </p>
      </div>
    </div>
  );
}
