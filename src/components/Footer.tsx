"use client";

import Link from "next/link";
import { useLocale } from "./LocaleProvider";

export default function Footer() {
  const { locale, t } = useLocale();

  const links = {
    tools: [
      { href: "/tools/character-counter", label: locale === "ko" ? "글자수 세기" : "Character Counter" },
      { href: "/tools/image-compressor", label: locale === "ko" ? "이미지 압축" : "Image Compressor" },
      { href: "/tools/qr-generator", label: locale === "ko" ? "QR코드 생성기" : "QR Generator" },
      { href: "/tools/json-formatter", label: locale === "ko" ? "JSON 포맷터" : "JSON Formatter" },
      { href: "/tools/password-generator", label: locale === "ko" ? "비밀번호 생성기" : "Password Generator" },
    ],
    info: [
      { href: "/about", label: locale === "ko" ? "소개" : "About" },
      { href: "/blog", label: locale === "ko" ? "블로그" : "Blog" },
      { href: "/privacy", label: locale === "ko" ? "개인정보처리방침" : "Privacy Policy" },
      { href: "/terms", label: locale === "ko" ? "이용약관" : "Terms of Service" },
      { href: "/contact", label: locale === "ko" ? "문의" : "Contact" },
    ],
  };

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-bold text-white">
                T
              </span>
              Toolkio
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.footer}
            </p>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              {locale === "ko" ? "인기 도구" : "Popular Tools"}
            </h3>
            <ul className="space-y-2">
              {links.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              {locale === "ko" ? "정보" : "Info"}
            </h3>
            <ul className="space-y-2">
              {links.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Toolkio. All rights reserved.</p>
          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            {locale === "ko"
              ? "이 사이트는 Google AdSense를 통해 광고를 게재하며, 광고 수익으로 운영됩니다."
              : "This site displays ads via Google AdSense and is supported by advertising revenue."}
          </p>
        </div>
      </div>
    </footer>
  );
}
