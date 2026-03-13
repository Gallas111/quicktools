import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "온라인 도구 활용 가이드 | Toolkio 블로그",
  description:
    "글자수 세기, 이미지 압축, QR코드 생성, 비밀번호 만들기 등 무료 온라인 도구 활용법과 팁을 확인하세요.",
  keywords: ["온라인 도구 가이드", "글자수 세기", "이미지 압축", "QR코드 만들기", "비밀번호 생성기", "텍스트 비교"],
  alternates: {
    canonical: "https://toolkio.com/blog",
  },
  openGraph: {
    title: "온라인 도구 활용 가이드 | Toolkio 블로그",
    description: "글자수 세기, 이미지 압축, QR코드 생성 등 무료 온라인 도구 활용법과 팁.",
    url: "https://toolkio.com/blog",
    siteName: "Toolkio",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Toolkio 블로그",
  url: "https://toolkio.com/blog",
  description: "무료 온라인 도구 활용 가이드와 팁",
  publisher: { "@type": "Organization", name: "Toolkio", url: "https://toolkio.com" },
  inLanguage: "ko",
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
