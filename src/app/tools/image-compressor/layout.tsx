import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이미지 압축 - Image Compressor",
  description:
    "이미지를 무료로 압축하고 포맷을 변환하세요. PNG, JPG, WebP 지원. Compress images online for free. Supports PNG, JPG, WebP conversion.",
  keywords: ["이미지 압축", "이미지 리사이즈", "image compressor", "image resize", "webp converter"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "이미지 압축 - Image Compressor",
  url: "https://toolkio.com/tools/image-compressor",
  description: "이미지를 무료로 압축하고 포맷을 변환하는 온라인 도구",
  applicationCategory: "MultimediaApplication",
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
