import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "비밀번호 생성기 - Password Generator",
  description:
    "강력하고 안전한 비밀번호를 무료로 생성하세요. 길이, 문자 종류를 자유롭게 설정 가능. Generate strong, secure passwords for free with custom length and character options.",
  keywords: ["비밀번호 생성기", "비밀번호 만들기", "password generator", "strong password", "random password"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "비밀번호 생성기 - Password Generator",
  url: "https://toolkio.com/tools/password-generator",
  description: "강력하고 안전한 비밀번호를 생성하는 무료 온라인 도구",
  applicationCategory: "SecurityApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  inLanguage: ["ko", "en"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
