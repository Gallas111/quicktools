import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "기초대사량 계산기 - BMR Calculator",
  description: "기초대사량(BMR)과 활동 수준에 따른 일일 권장 칼로리를 계산하세요. Calculate your Basal Metabolic Rate and daily calorie needs.",
  keywords: ["기초대사량 계산기", "BMR 계산기", "칼로리 계산기", "BMR calculator", "calorie calculator"],
  alternates: {
    canonical: "https://toolkio.com/tools/bmr-calculator",
    languages: {
      ko: "https://toolkio.com/tools/bmr-calculator",
      en: "https://toolkio.com/tools/bmr-calculator",
      "x-default": "https://toolkio.com/tools/bmr-calculator",
    },
  },
  openGraph: {
    title: "기초대사량 계산기 - BMR Calculator",
    description: "기초대사량(BMR)과 활동 수준에 따른 일일 권장 칼로리를 계산하세요. Calculate your Basal Metabolic Rate and daily calorie needs.",
    url: "https://toolkio.com/tools/bmr-calculator",
    siteName: "Toolkio",
    type: "website",
    images: [{ url: "https://toolkio.com/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "기초대사량 계산기 - BMR Calculator",
  url: "https://toolkio.com/tools/bmr-calculator",
  description: "기초대사량과 일일 권장 칼로리를 계산하는 무료 온라인 도구",
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
