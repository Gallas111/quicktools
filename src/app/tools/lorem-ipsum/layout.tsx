import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum 생성기 - Lorem Ipsum Generator",
  description:
    "더미 텍스트를 원하는 양만큼 생성하세요. Generate placeholder text for your designs and layouts.",
  keywords: ["Lorem Ipsum 생성기", "더미 텍스트", "lorem ipsum generator", "placeholder text", "임시 텍스트"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Lorem Ipsum 생성기 - Lorem Ipsum Generator",
  url: "https://toolkio.com/tools/lorem-ipsum",
  description: "디자인 및 레이아웃용 더미 텍스트를 생성하는 무료 온라인 도구",
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
