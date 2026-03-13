"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";

export default function Header() {
  const { locale, setLocale, t } = useLocale();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-bold text-white">T</span>
          {t.siteName}
        </Link>
        <div className="flex items-center gap-4">
          {pathname !== "/" && (
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {t.allTools}
            </Link>
          )}
          <Link
            href="/blog"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            {locale === "ko" ? "블로그" : "Blog"}
          </Link>
          <button
            onClick={() => setLocale(locale === "ko" ? "en" : "ko")}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {locale === "ko" ? "EN" : "한국어"}
          </button>
        </div>
      </div>
    </header>
  );
}
