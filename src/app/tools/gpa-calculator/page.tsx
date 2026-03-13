"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

interface Course {
  id: number;
  name: string;
  credits: number;
  grade: string;
}

const GRADES = ["A+", "A0", "B+", "B0", "C+", "C0", "D+", "D0", "F"] as const;

const GRADE_VALUES_45: Record<string, number> = {
  "A+": 4.5, "A0": 4.0, "B+": 3.5, "B0": 3.0,
  "C+": 2.5, "C0": 2.0, "D+": 1.5, "D0": 1.0, "F": 0,
};

const GRADE_VALUES_43: Record<string, number> = {
  "A+": 4.3, "A0": 4.0, "B+": 3.3, "B0": 3.0,
  "C+": 2.3, "C0": 2.0, "D+": 1.3, "D0": 1.0, "F": 0,
};

let nextId = 6;

function createEmptyCourse(id: number): Course {
  return { id, name: "", credits: 3, grade: "" };
}

function getGpaColor(gpa: number, maxGpa: number): string {
  const ratio = gpa / maxGpa;
  if (ratio >= 0.9) return "text-lime-600 dark:text-lime-400";
  if (ratio >= 0.8) return "text-blue-600 dark:text-blue-400";
  if (ratio >= 0.7) return "text-yellow-600 dark:text-yellow-400";
  if (ratio >= 0.6) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
}

function getGpaLabel(gpa: number, maxGpa: number, ko: boolean): string {
  const ratio = gpa / maxGpa;
  if (ratio >= 0.9) return ko ? "매우 우수" : "Excellent";
  if (ratio >= 0.8) return ko ? "우수" : "Very Good";
  if (ratio >= 0.7) return ko ? "양호" : "Good";
  if (ratio >= 0.6) return ko ? "보통" : "Average";
  return ko ? "노력 필요" : "Needs Improvement";
}

export default function GpaCalculator() {
  const [scale, setScale] = useState<"4.5" | "4.3">("4.5");
  const [courses, setCourses] = useState<Course[]>(
    Array.from({ length: 5 }, (_, i) => createEmptyCourse(i + 1))
  );
  const { locale } = useLocale();
  const ko = locale === "ko";

  const gradeValues = scale === "4.5" ? GRADE_VALUES_45 : GRADE_VALUES_43;
  const maxGpa = scale === "4.5" ? 4.5 : 4.3;

  const filledCourses = courses.filter((c) => c.grade !== "");
  const totalCredits = filledCourses.reduce((sum, c) => sum + c.credits, 0);
  const weightedSum = filledCourses.reduce(
    (sum, c) => sum + c.credits * (gradeValues[c.grade] ?? 0),
    0
  );
  const gpa = totalCredits > 0 ? weightedSum / totalCredits : 0;

  const updateCourse = (id: number, field: keyof Course, value: string | number) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const removeCourse = (id: number) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const addCourse = () => {
    setCourses((prev) => [...prev, createEmptyCourse(nextId++)]);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {ko ? "학점 계산기" : "GPA Calculator"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {ko
          ? "수강 과목의 학점과 성적을 입력하면 평균 평점(GPA)을 계산합니다."
          : "Enter your courses, credits, and grades to calculate your GPA."}
      </p>

      {/* Scale selector */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {ko ? "만점 기준" : "GPA Scale"}
        </label>
        <div className="flex gap-3">
          {(["4.5", "4.3"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setScale(s)}
              className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
                scale === s
                  ? "bg-lime-600 text-white dark:bg-lime-500"
                  : "border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {s}{ko ? "만점" : " Scale"}
            </button>
          ))}
        </div>
      </div>

      {/* Course table */}
      <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <th className="px-4 py-3">{ko ? "과목명" : "Course"}</th>
              <th className="px-4 py-3 text-center">{ko ? "학점" : "Credits"}</th>
              <th className="px-4 py-3 text-center">{ko ? "성적" : "Grade"}</th>
              <th className="w-12 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course.id}
                className="border-b border-gray-100 last:border-0 dark:border-gray-800"
              >
                <td className="px-4 py-2">
                  <input
                    type="text"
                    placeholder={ko ? "과목명 (선택)" : "Course name (optional)"}
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <select
                    value={course.credits}
                    onChange={(e) =>
                      updateCourse(course.id, "credits", Number(e.target.value))
                    }
                    className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    {[1, 2, 3].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 text-center">
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                    className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">{ko ? "선택" : "Select"}</option>
                    {GRADES.map((g) => (
                      <option key={g} value={g}>
                        {g} ({gradeValues[g].toFixed(1)})
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 text-center">
                  {courses.length > 1 && (
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                      title={ko ? "삭제" : "Remove"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add button */}
      <button
        onClick={addCourse}
        className="mb-8 flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-lime-500 hover:text-lime-600 dark:border-gray-600 dark:text-gray-400 dark:hover:border-lime-500 dark:hover:text-lime-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        {ko ? "과목 추가" : "Add Course"}
      </button>

      {/* Results */}
      {filledCourses.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* GPA */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {ko ? "평균 평점 (GPA)" : "GPA"}
            </div>
            <div className={`text-3xl font-bold ${getGpaColor(gpa, maxGpa)}`}>
              {gpa.toFixed(2)}
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                {" "}/ {maxGpa}
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div
                className="h-full rounded-full bg-lime-500 transition-all duration-500"
                style={{ width: `${(gpa / maxGpa) * 100}%` }}
              />
            </div>
            <div className={`mt-1.5 text-sm font-medium ${getGpaColor(gpa, maxGpa)}`}>
              {getGpaLabel(gpa, maxGpa, ko)}
            </div>
          </div>

          {/* Total credits */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {ko ? "총 이수 학점" : "Total Credits"}
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {totalCredits}
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                {ko ? "학점" : " credits"}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {filledCourses.length}{ko ? "개 과목" : " courses"}
            </div>
          </div>

          {/* Percentage */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {ko ? "백분율" : "Percentage"}
            </div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {((gpa / maxGpa) * 100).toFixed(1)}
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">%</span>
            </div>
          </div>
        </div>
      )}

      {/* Info section */}
      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {ko ? "학점 계산 방법" : "How GPA is Calculated"}
        </h2>
        {ko ? (
          <>
            <p>
              <strong>평균 평점(GPA)</strong>은 각 과목의 (학점 x 성적 점수)를 합산한 뒤, 총 이수 학점으로 나누어 계산합니다.
              예를 들어, 3학점 A+(4.5)와 2학점 B+(3.5)를 수강했다면 GPA = (3x4.5 + 2x3.5) / (3+2) = 4.10 입니다.
            </p>
            <p>
              <strong>4.5만점</strong>은 대부분의 한국 대학교에서 사용하는 기준이며, <strong>4.3만점</strong>은 서울대학교 등 일부 대학에서 사용합니다.
              A+의 점수만 다르고(4.5 vs 4.3), 나머지 등급의 점수 체계는 동일합니다.
            </p>
            <p>
              정확한 학점 관리는 장학금, 대학원 진학, 취업 등에 매우 중요합니다.
              매 학기 학점을 기록하고 목표 GPA를 설정하여 체계적으로 관리하세요.
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>GPA (Grade Point Average)</strong> is calculated by summing (credits x grade value) for each course, then dividing by total credits.
              For example, if you took a 3-credit A+ (4.5) and a 2-credit B+ (3.5), your GPA = (3x4.5 + 2x3.5) / (3+2) = 4.10.
            </p>
            <p>
              The <strong>4.5 scale</strong> is used by most Korean universities, while the <strong>4.3 scale</strong> is used by some universities like Seoul National University.
              Only the A+ value differs (4.5 vs 4.3); the rest of the grade values are the same.
            </p>
            <p>
              Accurate GPA tracking is essential for scholarships, graduate school applications, and employment.
              Record your grades each semester and set target GPAs to manage your academic performance systematically.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
