import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "텍스트 비교 - Diff Checker",
  description:
    "두 텍스트의 차이점을 비교하세요. 줄 단위로 추가, 삭제, 변경 사항을 확인하는 무료 온라인 도구. Compare two texts and find differences line by line. Free online diff checker tool.",
  keywords: ["텍스트 비교", "diff checker", "텍스트 차이", "코드 비교", "text compare", "diff tool", "문서 비교"],
  alternates: {
    canonical: "https://toolkio.com/tools/diff-checker",
    languages: {
      ko: "https://toolkio.com/tools/diff-checker",
      en: "https://toolkio.com/tools/diff-checker",
      "x-default": "https://toolkio.com/tools/diff-checker",
    },
  },
  openGraph: {
    title: "텍스트 비교 - Diff Checker",
    description: "두 텍스트의 차이점을 비교하세요. 줄 단위로 추가, 삭제, 변경 사항을 확인하는 무료 온라인 도구. Compare two texts and find differences line ",
    url: "https://toolkio.com/tools/diff-checker",
    siteName: "Toolkio",
    type: "website",
    images: [{ url: "https://toolkio.com/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "텍스트 비교 - Diff Checker",
  url: "https://toolkio.com/tools/diff-checker",
  description: "두 텍스트의 차이점을 줄 단위로 비교하는 무료 온라인 도구",
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
