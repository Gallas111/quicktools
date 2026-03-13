import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 - Blog",
  description:
    "온라인 도구 활용 가이드, 팁, 튜토리얼. 글자수 세기, 이미지 압축, QR코드 생성 등 실용적인 가이드를 확인하세요.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
