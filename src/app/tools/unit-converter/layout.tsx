import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "단위 변환기 - Unit Converter",
  description: "길이, 무게, 온도, 넓이, 부피, 속도 등 다양한 단위를 쉽게 변환하세요. Convert length, weight, temperature and more.",
  keywords: ["단위 변환기", "단위 변환", "cm inch 변환", "kg lb 변환", "unit converter"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "단위 변환기 - Unit Converter",
  url: "https://toolkio.com/tools/unit-converter",
  description: "다양한 단위를 변환하는 무료 온라인 도구",
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
