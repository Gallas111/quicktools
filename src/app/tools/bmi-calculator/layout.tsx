import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI 계산기 - BMI Calculator",
  description: "키와 몸무게를 입력하면 체질량지수(BMI)를 계산하고 비만도를 확인할 수 있습니다. Calculate your Body Mass Index instantly.",
  keywords: ["BMI 계산기", "체질량지수", "비만도 계산", "BMI calculator", "body mass index"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "BMI 계산기 - BMI Calculator",
  url: "https://toolkio.com/tools/bmi-calculator",
  description: "BMI 체질량지수를 계산하는 무료 온라인 도구",
  applicationCategory: "UtilityApplication",
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
