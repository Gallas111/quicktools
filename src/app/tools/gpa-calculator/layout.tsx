import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "학점 계산기 - GPA Calculator",
  description: "대학교 학점(GPA)을 쉽게 계산하세요. 4.5만점, 4.3만점 모두 지원합니다. Calculate your university GPA easily.",
  keywords: ["학점 계산기", "GPA 계산기", "대학 학점", "평균 학점", "gpa calculator"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "학점 계산기 - GPA Calculator",
  url: "https://toolkio.com/tools/gpa-calculator",
  description: "대학교 학점을 계산하는 무료 온라인 도구",
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
