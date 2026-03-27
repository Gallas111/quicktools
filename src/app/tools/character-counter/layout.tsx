import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "글자수 세기 - Character Counter",
  description:
    "글자수, 공백 제외 글자수, 단어수, 문장수, 바이트 수를 실시간으로 세어보세요. Count characters, words, sentences, and bytes in real-time.",
  keywords: ["글자수 세기", "글자수 계산", "character counter", "word counter", "byte counter"],
  alternates: {
    canonical: "https://toolkio.com/tools/character-counter",
    languages: {
      ko: "https://toolkio.com/tools/character-counter",
      en: "https://toolkio.com/tools/character-counter",
      "x-default": "https://toolkio.com/tools/character-counter",
    },
  },
  openGraph: {
    title: "글자수 세기 - Character Counter",
    description: "글자수, 공백 제외 글자수, 단어수, 문장수, 바이트 수를 실시간으로 세어보세요. Count characters, words, sentences, and bytes in real-",
    url: "https://toolkio.com/tools/character-counter",
    siteName: "Toolkio",
    type: "website",
    images: [{ url: "https://toolkio.com/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "글자수 세기 - Character Counter",
  url: "https://toolkio.com/tools/character-counter",
  description: "글자수, 단어수, 바이트 수를 실시간으로 세는 무료 온라인 도구",
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
