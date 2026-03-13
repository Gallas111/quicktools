import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "해시 생성기 - Hash Generator",
  description:
    "텍스트의 SHA-1, SHA-256, SHA-512 해시를 생성하세요. Generate SHA-1, SHA-256, SHA-512 hashes from text.",
  keywords: ["해시 생성기", "SHA-256", "SHA-512", "hash generator", "해시 변환", "SHA-1"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "해시 생성기 - Hash Generator",
  url: "https://toolkio.com/tools/hash-generator",
  description: "SHA-1, SHA-256, SHA-512 해시를 생성하는 무료 온라인 도구",
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
