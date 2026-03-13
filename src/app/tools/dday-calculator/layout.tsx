import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "D-day 계산기 - D-Day Calculator",
  description: "특정 날짜까지 남은 일수 또는 지난 일수를 계산하세요. 기념일, 시험일, 여행 등 중요한 날짜를 관리하세요. Calculate days between dates.",
  keywords: ["D-day 계산기", "디데이 계산기", "날짜 계산기", "dday calculator", "date calculator"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "D-day 계산기 - D-Day Calculator",
  url: "https://toolkio.com/tools/dday-calculator",
  description: "D-day를 계산하는 무료 온라인 도구",
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
