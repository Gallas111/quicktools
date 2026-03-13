import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "색상 코드 변환기 - Color Converter",
  description:
    "HEX, RGB, HSL 색상 코드를 실시간으로 변환하세요. 컬러 피커 제공. Convert between HEX, RGB, and HSL color codes in real-time with a color picker.",
  keywords: ["색상 변환기", "HEX RGB 변환", "color converter", "HEX to RGB", "RGB to HSL", "color picker"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "색상 코드 변환기 - Color Converter",
  url: "https://toolkio.com/tools/color-converter",
  description: "HEX, RGB, HSL 색상 코드를 실시간 변환하는 무료 온라인 도구",
  applicationCategory: "DesignApplication",
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
