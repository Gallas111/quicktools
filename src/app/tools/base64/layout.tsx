import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 인코더/디코더 - Base64 Encoder/Decoder",
  description:
    "텍스트를 Base64로 인코딩하거나 디코딩하세요. Encode or decode text with Base64 instantly in your browser.",
  keywords: ["Base64 인코딩", "Base64 디코딩", "base64 encoder", "base64 decoder", "base64 변환"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Base64 인코더/디코더 - Base64 Encoder/Decoder",
  url: "https://toolkio.com/tools/base64",
  description: "텍스트를 Base64로 인코딩/디코딩하는 무료 온라인 도구",
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
