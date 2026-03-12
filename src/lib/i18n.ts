export type Locale = "ko" | "en";

export const translations = {
  ko: {
    siteName: "Toolkio",
    siteDescription: "무료 온라인 도구 모음 - 글자수 세기, 이미지 압축, QR코드 생성 등",
    hero: "필요한 도구를 빠르게",
    heroSub: "모든 도구는 무료이며, 브라우저에서 바로 실행됩니다.",
    allTools: "모든 도구",
    copy: "복사",
    copied: "복사됨!",
    clear: "초기화",
    download: "다운로드",
    footer: "모든 도구는 브라우저에서 실행되며 데이터가 서버로 전송되지 않습니다.",
  },
  en: {
    siteName: "Toolkio",
    siteDescription: "Free Online Tools - Character Counter, Image Compressor, QR Generator & More",
    hero: "The right tool, right away",
    heroSub: "All tools are free and run directly in your browser.",
    allTools: "All Tools",
    copy: "Copy",
    copied: "Copied!",
    clear: "Clear",
    download: "Download",
    footer: "All tools run in your browser. No data is sent to any server.",
  },
} as const;
