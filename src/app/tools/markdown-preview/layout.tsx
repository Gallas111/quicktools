import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "마크다운 미리보기 - Markdown Preview",
  description:
    "마크다운을 실시간으로 미리보기하세요. 무료 온라인 마크다운 에디터 및 뷰어. Preview markdown in real-time. Free online markdown editor and viewer.",
  keywords: ["마크다운 미리보기", "마크다운 편집기", "markdown preview", "markdown editor", "markdown viewer", "마크다운 뷰어"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "마크다운 미리보기 - Markdown Preview",
  url: "https://toolkio.com/tools/markdown-preview",
  description: "마크다운을 실시간으로 미리보기하는 무료 온라인 도구",
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
