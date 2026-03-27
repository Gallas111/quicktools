import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "퍼센트 계산기 - Percent Calculator",
  description: "퍼센트 계산, 할인율 계산, 증감률 계산을 쉽게 하세요. Calculate percentages, discounts, and rate changes easily.",
  keywords: ["퍼센트 계산기", "할인율 계산기", "백분율 계산기", "percent calculator", "discount calculator"],
  alternates: {
    canonical: "https://toolkio.com/tools/percent-calculator",
    languages: {
      ko: "https://toolkio.com/tools/percent-calculator",
      en: "https://toolkio.com/tools/percent-calculator",
      "x-default": "https://toolkio.com/tools/percent-calculator",
    },
  },
  openGraph: {
    title: "퍼센트 계산기 - Percent Calculator",
    description: "퍼센트 계산, 할인율 계산, 증감률 계산을 쉽게 하세요. Calculate percentages, discounts, and rate changes easily.",
    url: "https://toolkio.com/tools/percent-calculator",
    siteName: "Toolkio",
    type: "website",
    images: [{ url: "https://toolkio.com/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "퍼센트 계산기 - Percent Calculator",
  url: "https://toolkio.com/tools/percent-calculator",
  description: "퍼센트와 할인율을 계산하는 무료 온라인 도구",
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
