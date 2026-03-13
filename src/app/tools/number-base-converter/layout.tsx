import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "진법 변환기 - Number Base Converter",
  description:
    "2진수, 8진수, 10진수, 16진수를 실시간으로 변환하세요. Convert between binary, octal, decimal, and hexadecimal numbers in real-time.",
  keywords: ["진법 변환기", "2진수 변환", "16진수 변환", "number base converter", "binary converter", "hex converter"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "진법 변환기 - Number Base Converter",
  url: "https://toolkio.com/tools/number-base-converter",
  description: "2진수, 8진수, 10진수, 16진수를 실시간 변환하는 무료 온라인 도구",
  applicationCategory: "DeveloperApplication",
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
