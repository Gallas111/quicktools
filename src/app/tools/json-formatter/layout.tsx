import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON 포맷터 - JSON Formatter & Validator",
  description:
    "JSON을 예쁘게 정렬하고 검증하세요. 무료 온라인 JSON 뷰어, 포맷터, 압축 도구. Format, beautify, minify, and validate JSON online for free.",
  keywords: ["JSON 포맷터", "JSON 정렬", "JSON formatter", "JSON beautifier", "JSON validator", "JSON minifier"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
