import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON 포맷터 - JSON Formatter & Validator",
  description:
    "JSON을 예쁘게 정렬하고 검증하세요. 무료 온라인 JSON 뷰어, 포맷터, 압축 도구. Format, beautify, minify, and validate JSON online for free.",
  keywords: ["JSON 포맷터", "JSON 정렬", "JSON formatter", "JSON beautifier", "JSON validator", "JSON minifier"],
  alternates: {
    canonical: "https://toolkio.com/tools/json-formatter",
    languages: {
      ko: "https://toolkio.com/tools/json-formatter",
      en: "https://toolkio.com/tools/json-formatter",
      "x-default": "https://toolkio.com/tools/json-formatter",
    },
  },
  openGraph: {
    title: "JSON 포맷터 - JSON Formatter & Validator",
    description: "JSON을 예쁘게 정렬하고 검증하세요. 무료 온라인 JSON 뷰어, 포맷터, 압축 도구. Format, beautify, minify, and validate JSON online",
    url: "https://toolkio.com/tools/json-formatter",
    siteName: "Toolkio",
    type: "website",
    images: [{ url: "https://toolkio.com/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON 포맷터 - JSON Formatter & Validator",
  url: "https://toolkio.com/tools/json-formatter",
  description: "JSON을 정렬, 검증, 압축하는 무료 온라인 도구",
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
