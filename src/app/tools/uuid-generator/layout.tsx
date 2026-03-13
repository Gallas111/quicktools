import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID 생성기 - UUID Generator",
  description:
    "UUID v4를 무료로 생성하세요. 대량 생성, 대소문자 변환, 하이픈 옵션 지원. Generate UUID v4 for free with batch generation, case, and hyphen options.",
  keywords: ["UUID 생성기", "UUID v4", "uuid generator", "GUID 생성기", "고유 식별자", "unique identifier"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "UUID 생성기 - UUID Generator",
  url: "https://toolkio.com/tools/uuid-generator",
  description: "UUID v4를 생성하는 무료 온라인 도구",
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
