import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS/JS 압축기 - CSS/JS Minifier",
  description:
    "CSS와 JavaScript 코드를 무료로 압축하세요. 주석, 공백 제거로 파일 크기를 줄여보세요. Minify CSS and JavaScript code for free. Remove comments and whitespace to reduce file size.",
  keywords: ["CSS 압축", "JS 압축", "CSS minifier", "JavaScript minifier", "코드 최적화", "code minification"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CSS/JS 압축기 - CSS/JS Minifier",
  url: "https://toolkio.com/tools/css-minifier",
  description: "CSS/JS 코드를 압축하는 무료 온라인 도구",
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
