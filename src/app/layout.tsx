import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/LocaleProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://toolkio.com"),
  verification: {
    other: {
      "naver-site-verification": "5c4ae463a9b30dd1d2a73fc880af77c01ec1959c",
    },
  },
  title: {
    default: "Toolkio - 무료 온라인 도구 모음 | Free Online Tools",
    template: "%s | Toolkio",
  },
  description:
    "글자수 세기, 이미지 압축, QR코드 생성, JSON 포맷터, 비밀번호 생성기, 마크다운 미리보기, 정규식 테스터 등 19가지 무료 온라인 도구. Free online tools: character counter, image compressor, QR generator, JSON formatter, and more.",
  keywords: [
    "글자수 세기",
    "이미지 압축",
    "QR코드 생성기",
    "JSON 포맷터",
    "비밀번호 생성기",
    "Base64 인코딩",
    "URL 인코딩",
    "Lorem Ipsum 생성기",
    "타임스탬프 변환",
    "해시 생성기",
    "character counter",
    "image compressor",
    "QR code generator",
    "JSON formatter",
    "password generator",
    "base64 encoder",
    "url encoder",
    "lorem ipsum generator",
    "timestamp converter",
    "hash generator",
    "마크다운 미리보기",
    "정규식 테스터",
    "텍스트 비교",
    "대소문자 변환",
    "UUID 생성기",
    "CSS 압축",
    "진법 변환기",
    "텍스트 분석",
    "markdown preview",
    "regex tester",
    "diff checker",
    "case converter",
    "uuid generator",
    "css minifier",
    "number base converter",
    "text analyzer",
    "free online tools",
    "무료 온라인 도구",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Toolkio - 무료 온라인 도구 모음 | Free Online Tools",
    description: "필요한 도구를 빠르게. 모든 도구는 무료이며 브라우저에서 바로 실행됩니다.",
    url: "https://toolkio.com",
    siteName: "Toolkio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Toolkio - 무료 온라인 도구 모음",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolkio - 무료 온라인 도구 모음 | Free Online Tools",
    description: "필요한 도구를 빠르게. 모든 도구는 무료이며 브라우저에서 바로 실행됩니다.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Toolkio",
  url: "https://toolkio.com",
  description:
    "글자수 세기, 이미지 압축, QR코드 생성, JSON 포맷터 등 무료 온라인 도구 모음. Free online tools.",
  inLanguage: ["ko", "en"],
  publisher: {
    "@type": "Organization",
    name: "Toolkio",
    url: "https://toolkio.com",
    logo: {
      "@type": "ImageObject",
      url: "https://toolkio.com/android-chrome-512x512.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-F13BRWNM09"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-F13BRWNM09');
        `}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LocaleProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
