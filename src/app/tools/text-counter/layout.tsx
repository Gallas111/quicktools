import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "텍스트 분석기 - Text Analyzer",
  description:
    "텍스트의 글자수, 단어수, 문장수, 읽기 시간, 단어 빈도를 분석하세요. Analyze text for character count, word count, sentences, reading time, and word frequency.",
  keywords: ["텍스트 분석", "읽기 시간", "단어 빈도", "text analyzer", "reading time", "word frequency"],
  alternates: {
    canonical: "https://toolkio.com/tools/text-counter",
    languages: {
      ko: "https://toolkio.com/tools/text-counter",
      en: "https://toolkio.com/tools/text-counter",
      "x-default": "https://toolkio.com/tools/text-counter",
    },
  },
  openGraph: {
    title: "텍스트 분석기 - Text Analyzer",
    description: "텍스트의 글자수, 단어수, 문장수, 읽기 시간, 단어 빈도를 분석하세요. Analyze text for character count, word count, sentences, re",
    url: "https://toolkio.com/tools/text-counter",
    siteName: "Toolkio",
    type: "website",
    images: [{ url: "https://toolkio.com/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "텍스트 분석기 - Text Analyzer",
  url: "https://toolkio.com/tools/text-counter",
  description: "텍스트의 글자수, 단어수, 읽기 시간, 단어 빈도를 분석하는 무료 온라인 도구",
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
