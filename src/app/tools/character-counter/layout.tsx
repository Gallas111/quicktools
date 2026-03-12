import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "글자수 세기 - Character Counter",
  description:
    "글자수, 공백 제외 글자수, 단어수, 문장수, 바이트 수를 실시간으로 세어보세요. Count characters, words, sentences, and bytes in real-time.",
  keywords: ["글자수 세기", "글자수 계산", "character counter", "word counter", "byte counter"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
