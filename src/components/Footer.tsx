"use client";

import { useLocale } from "./LocaleProvider";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>{t.footer}</p>
        <p className="mt-2">&copy; {new Date().getFullYear()} QuickTools</p>
      </div>
    </footer>
  );
}
