import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "비밀번호 생성기 - Password Generator",
  description:
    "강력하고 안전한 비밀번호를 무료로 생성하세요. 길이, 문자 종류를 자유롭게 설정 가능. Generate strong, secure passwords for free with custom length and character options.",
  keywords: ["비밀번호 생성기", "비밀번호 만들기", "password generator", "strong password", "random password"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
