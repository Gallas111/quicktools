import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 프롬프트 생성기 - AI Prompt Generator",
  description: "ChatGPT, Midjourney, DALL-E, Stable Diffusion 등에서 사용할 수 있는 고품질 프롬프트를 쉽게 만들어보세요. Generate high-quality AI prompts easily.",
  keywords: ["AI 프롬프트 생성기", "ChatGPT 프롬프트", "Midjourney 프롬프트", "AI prompt generator", "프롬프트 만들기"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI 프롬프트 생성기 - AI Prompt Generator",
  url: "https://toolkio.com/tools/ai-prompt-generator",
  description: "AI 프롬프트를 쉽게 생성하는 무료 온라인 도구",
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
