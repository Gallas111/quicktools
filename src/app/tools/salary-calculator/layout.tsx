import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "연봉 실수령액 계산기 - Salary Calculator",
  description: "연봉에서 소득세, 4대보험을 공제한 월 실수령액을 계산하세요. 2024년 기준 국민연금, 건강보험, 고용보험, 소득세를 반영합니다.",
  keywords: ["연봉 실수령액", "연봉 계산기", "월급 계산기", "실수령액 계산기", "salary calculator", "4대보험"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "연봉 실수령액 계산기 - Salary Calculator",
  url: "https://toolkio.com/tools/salary-calculator",
  description: "연봉 실수령액을 계산하는 무료 온라인 도구",
  applicationCategory: "UtilityApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  inLanguage: ["ko", "en"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
