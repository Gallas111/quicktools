import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이미지 압축 - Image Compressor",
  description:
    "이미지를 무료로 압축하고 포맷을 변환하세요. PNG, JPG, WebP 지원. Compress images online for free. Supports PNG, JPG, WebP conversion.",
  keywords: ["이미지 압축", "이미지 리사이즈", "image compressor", "image resize", "webp converter"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
