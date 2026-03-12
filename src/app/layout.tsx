import type { Metadata } from "next";
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
  title: {
    default: "QuickTools - 무료 온라인 도구 모음 | Free Online Tools",
    template: "%s | QuickTools",
  },
  description:
    "글자수 세기, 이미지 압축, QR코드 생성, JSON 포맷터, 비밀번호 생성기 등 무료 온라인 도구. Free online tools: character counter, image compressor, QR generator, JSON formatter, password generator.",
  keywords: [
    "글자수 세기",
    "이미지 압축",
    "QR코드 생성기",
    "JSON 포맷터",
    "비밀번호 생성기",
    "character counter",
    "image compressor",
    "QR code generator",
    "JSON formatter",
    "password generator",
    "free online tools",
    "무료 온라인 도구",
  ],
  openGraph: {
    title: "QuickTools - 무료 온라인 도구 모음",
    description: "필요한 도구를 빠르게. 모든 도구는 무료이며 브라우저에서 바로 실행됩니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
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
