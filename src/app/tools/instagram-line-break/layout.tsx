import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "인스타 줄바꿈 - Instagram Line Break",
  description:
    "인스타그램에서 줄바꿈이 사라지는 문제를 해결하세요. 보이지 않는 특수문자를 사용하여 완벽한 줄바꿈을 만들어줍니다. Fix Instagram line break issues with invisible characters.",
  keywords: ["인스타 줄바꿈", "인스타그램 줄바꿈", "instagram line break", "인스타 공백", "인스타그램 엔터"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "인스타 줄바꿈 - Instagram Line Break",
  url: "https://toolkio.com/tools/instagram-line-break",
  description: "인스타그램 줄바꿈 문제를 해결하는 무료 온라인 도구",
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
