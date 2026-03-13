import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "대소문자 변환기 - Case Converter",
  description:
    "텍스트의 대소문자를 변환하세요. UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case 등 다양한 변환을 지원합니다. Convert text case easily with multiple formats.",
  keywords: ["대소문자 변환", "case converter", "uppercase", "lowercase", "camelCase", "snake_case", "kebab-case", "텍스트 변환"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "대소문자 변환기 - Case Converter",
  url: "https://toolkio.com/tools/case-converter",
  description: "텍스트의 대소문자를 다양한 형식으로 변환하는 무료 온라인 도구",
  applicationCategory: "UtilityApplication",
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
