import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "타임스탬프 변환기 - Timestamp Converter",
  description:
    "Unix 타임스탬프를 날짜로 변환하거나 날짜를 타임스탬프로 변환하세요. Convert between Unix timestamps and human-readable dates.",
  keywords: ["타임스탬프 변환", "Unix timestamp", "epoch 변환기", "timestamp converter", "유닉스 시간"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "타임스탬프 변환기 - Timestamp Converter",
  url: "https://toolkio.com/tools/timestamp-converter",
  description: "Unix 타임스탬프와 날짜를 변환하는 무료 온라인 도구",
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
