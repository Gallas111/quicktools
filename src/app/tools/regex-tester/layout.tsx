import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "정규식 테스터 - Regex Tester",
  description:
    "정규식을 테스트하고 매칭 결과를 확인하세요. 무료 온라인 정규표현식 테스터. Test regular expressions and see matches instantly. Free online regex tester.",
  keywords: ["정규식 테스터", "정규표현식", "regex tester", "regular expression", "regex matcher", "정규식 검사"],
  alternates: {
    canonical: "https://toolkio.com/tools/regex-tester",
    languages: {
      ko: "https://toolkio.com/tools/regex-tester",
      en: "https://toolkio.com/tools/regex-tester",
      "x-default": "https://toolkio.com/tools/regex-tester",
    },
  },
  openGraph: {
    title: "정규식 테스터 - Regex Tester",
    description: "정규식을 테스트하고 매칭 결과를 확인하세요. 무료 온라인 정규표현식 테스터. Test regular expressions and see matches instantly. Free ",
    url: "https://toolkio.com/tools/regex-tester",
    siteName: "Toolkio",
    type: "website",
    images: [{ url: "https://toolkio.com/og-image.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "정규식 테스터 - Regex Tester",
  url: "https://toolkio.com/tools/regex-tester",
  description: "정규식을 테스트하고 매칭 결과를 확인하는 무료 온라인 도구",
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
