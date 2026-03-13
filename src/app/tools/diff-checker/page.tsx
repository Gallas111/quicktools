"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

interface DiffLine {
  type: "unchanged" | "removed" | "added";
  lineOriginal: number | null;
  lineModified: number | null;
  text: string;
}

function computeDiff(original: string, modified: string): DiffLine[] {
  const origLines = original.split("\n");
  const modLines = modified.split("\n");
  const m = origLines.length;
  const n = modLines.length;

  // LCS DP table
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (origLines[i - 1] === modLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to build diff
  const result: DiffLine[] = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origLines[i - 1] === modLines[j - 1]) {
      result.push({ type: "unchanged", lineOriginal: i, lineModified: j, text: origLines[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.push({ type: "added", lineOriginal: null, lineModified: j, text: modLines[j - 1] });
      j--;
    } else {
      result.push({ type: "removed", lineOriginal: i, lineModified: null, text: origLines[i - 1] });
      i--;
    }
  }

  return result.reverse();
}

export default function DiffChecker() {
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [diff, setDiff] = useState<DiffLine[] | null>(null);
  const { locale, t } = useLocale();

  const handleCompare = () => {
    if (!original && !modified) return;
    setDiff(computeDiff(original, modified));
  };

  const handleClear = () => {
    setOriginal("");
    setModified("");
    setDiff(null);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "텍스트 비교" : "Diff Checker"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "두 텍스트의 차이점을 줄 단위로 비교하세요."
          : "Compare two texts and find differences line by line."}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "원본" : "Original"}
          </label>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder={locale === "ko" ? "원본 텍스트를 입력하세요..." : "Enter original text..."}
            spellCheck={false}
            className="h-72 w-full resize-y rounded-xl border border-gray-200 bg-white p-4 font-mono text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {locale === "ko" ? "수정본" : "Modified"}
          </label>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder={locale === "ko" ? "수정된 텍스트를 입력하세요..." : "Enter modified text..."}
            spellCheck={false}
            className="h-72 w-full resize-y rounded-xl border border-gray-200 bg-white p-4 font-mono text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={handleCompare}
          disabled={!original.trim() && !modified.trim()}
          className="rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-2 text-sm font-medium text-white hover:from-emerald-600 hover:to-green-600 disabled:opacity-50"
        >
          {locale === "ko" ? "비교하기" : "Compare"}
        </button>
        <button
          onClick={handleClear}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {t.clear}
        </button>
      </div>

      {diff && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {locale === "ko" ? "비교 결과" : "Diff Results"}
          </h2>
          <div className="overflow-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="w-full border-collapse font-mono text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                  <th className="w-12 px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                    {locale === "ko" ? "원본" : "Orig"}
                  </th>
                  <th className="w-12 px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                    {locale === "ko" ? "수정" : "Mod"}
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                    {locale === "ko" ? "내용" : "Content"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {diff.map((line, idx) => (
                  <tr
                    key={idx}
                    className={
                      line.type === "removed"
                        ? "bg-red-50 dark:bg-red-950/30"
                        : line.type === "added"
                        ? "bg-green-50 dark:bg-green-950/30"
                        : ""
                    }
                  >
                    <td className="w-12 select-none border-r border-gray-200 px-3 py-0.5 text-right text-xs text-gray-400 dark:border-gray-800">
                      {line.lineOriginal ?? ""}
                    </td>
                    <td className="w-12 select-none border-r border-gray-200 px-3 py-0.5 text-right text-xs text-gray-400 dark:border-gray-800">
                      {line.lineModified ?? ""}
                    </td>
                    <td
                      className={`whitespace-pre-wrap px-4 py-0.5 ${
                        line.type === "removed"
                          ? "text-red-700 dark:text-red-400"
                          : line.type === "added"
                          ? "text-green-700 dark:text-green-400"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {line.type === "removed" && (
                        <span className="mr-2 select-none font-bold">-</span>
                      )}
                      {line.type === "added" && (
                        <span className="mr-2 select-none font-bold">+</span>
                      )}
                      {line.text || "\u00A0"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded bg-red-100 dark:bg-red-950/50" />
              {locale === "ko" ? "삭제된 줄" : "Removed"}
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded bg-green-100 dark:bg-green-950/50" />
              {locale === "ko" ? "추가된 줄" : "Added"}
            </span>
          </div>
        </div>
      )}

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "텍스트 비교 도구란?" : "What is a Diff Checker?"}
        </h2>
        <p>
          {locale === "ko"
            ? "텍스트 비교 도구(Diff Checker)는 두 텍스트 간의 차이점을 줄 단위로 비교하여 보여주는 무료 온라인 도구입니다. 코드 변경 사항 확인, 문서 수정 내역 비교, 텍스트 파일의 차이점 분석 등에 유용합니다. 추가된 줄은 초록색, 삭제된 줄은 빨간색으로 표시되어 한눈에 변경 사항을 파악할 수 있습니다."
            : "A Diff Checker compares two texts line by line and highlights the differences. It is useful for reviewing code changes, comparing document revisions, and analyzing text file differences. Added lines are shown in green, removed lines in red, making changes easy to spot at a glance."}
        </p>
      </div>
    </div>
  );
}
