import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 - Terms of Service",
  description:
    "Toolkio 이용약관. 서비스 이용 조건 및 면책 사항을 확인하세요.",
  alternates: { canonical: "https://toolkio.com/terms" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
