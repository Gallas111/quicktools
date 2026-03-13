import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL 인코더/디코더 - URL Encoder/Decoder",
  description:
    "URL을 인코딩하거나 디코딩하세요. Encode or decode URLs instantly in your browser.",
  keywords: ["URL 인코딩", "URL 디코딩", "url encoder", "url decoder", "URL 변환", "percent encoding"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "URL 인코더/디코더 - URL Encoder/Decoder",
  url: "https://toolkio.com/tools/url-encoder",
  description: "URL을 인코딩/디코딩하는 무료 온라인 도구",
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
