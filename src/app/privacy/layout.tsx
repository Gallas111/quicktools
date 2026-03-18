import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 - Privacy Policy",
  description:
    "Toolkio 개인정보처리방침. 모든 도구는 브라우저에서 실행되며 데이터가 서버로 전송되지 않습니다.",
  alternates: { canonical: "https://toolkio.com/privacy" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
