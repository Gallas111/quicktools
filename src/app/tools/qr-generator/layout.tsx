import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR코드 생성기 - QR Code Generator",
  description:
    "URL, 텍스트로 QR코드를 무료로 만들어보세요. 색상, 크기 커스텀 가능. PNG, SVG 다운로드. Generate QR codes for free with custom colors and sizes.",
  keywords: ["QR코드 생성기", "QR코드 만들기", "QR code generator", "QR code maker", "free QR code"],
  alternates: {
    canonical: "https://toolkio.com/tools/qr-generator",
    languages: {
      ko: "https://toolkio.com/tools/qr-generator",
      en: "https://toolkio.com/tools/qr-generator",
      "x-default": "https://toolkio.com/tools/qr-generator",
    },
  },
  openGraph: {
    title: "QR코드 생성기 - QR Code Generator",
    description: "URL, 텍스트로 QR코드를 무료로 만들어보세요. 색상, 크기 커스텀 가능. PNG, SVG 다운로드. Generate QR codes for free with custom col",
    url: "https://toolkio.com/tools/qr-generator",
    siteName: "Toolkio",
    type: "website",
    images: [{ url: "https://toolkio.com/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "QR코드 생성기 - QR Code Generator",
  url: "https://toolkio.com/tools/qr-generator",
  description: "URL, 텍스트로 QR코드를 무료로 생성하는 온라인 도구",
  applicationCategory: "UtilityApplication",
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
