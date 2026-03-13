import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "유튜브 썸네일 만들기 - YouTube Thumbnail Maker",
  description: "템플릿을 선택하고 텍스트만 입력하면 유튜브 썸네일(1280x720)을 무료로 만들 수 있습니다. Create YouTube thumbnails with templates instantly.",
  keywords: ["유튜브 썸네일 만들기", "유튜브 썸네일 생성기", "썸네일 템플릿", "youtube thumbnail maker", "thumbnail generator"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "유튜브 썸네일 만들기 - YouTube Thumbnail Maker",
  url: "https://toolkio.com/tools/youtube-thumbnail",
  description: "유튜브 썸네일을 무료로 만드는 온라인 도구",
  applicationCategory: "DesignApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  inLanguage: ["ko", "en"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
