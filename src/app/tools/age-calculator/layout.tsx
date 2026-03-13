import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "만나이 계산기 - Age Calculator",
  description: "생년월일을 입력하면 만나이, 한국나이, 다음 생일까지 남은 일수를 계산합니다. Calculate your exact age, Korean age, and days until next birthday.",
  keywords: ["만나이 계산기", "나이 계산기", "한국나이 계산기", "age calculator", "Korean age"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "만나이 계산기 - Age Calculator",
  url: "https://toolkio.com/tools/age-calculator",
  description: "만나이와 한국나이를 계산하는 무료 온라인 도구",
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
