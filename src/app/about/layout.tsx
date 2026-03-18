import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개 - About",
  description:
    "Toolkio는 일상과 개발에 필요한 무료 온라인 도구를 제공합니다. 모든 도구는 브라우저에서 실행되며 데이터가 서버로 전송되지 않습니다.",
  alternates: { canonical: "https://toolkio.com/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
