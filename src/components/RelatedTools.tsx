"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tools } from "@/lib/tools";
import { useLocale } from "./LocaleProvider";

export default function RelatedTools() {
  const pathname = usePathname();
  const { locale } = useLocale();

  const currentTool = tools.find((t) => t.href === pathname);
  if (!currentTool) return null;

  // Get tools from same category, excluding current
  let related = tools.filter(
    (t) => t.category === currentTool.category && t.id !== currentTool.id
  );

  // If less than 3, add from other categories
  if (related.length < 3) {
    const others = tools.filter(
      (t) => t.category !== currentTool.category && t.id !== currentTool.id
    );
    related = [...related, ...others];
  }

  related = related.slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mx-auto max-w-4xl px-4 pb-12">
      <div className="border-t border-gray-200 pt-8 dark:border-gray-800">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "관련 도구" : "Related Tools"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {related.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tool.color} text-base text-white`}
              >
                {tool.icon}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {tool.name[locale]}
                </div>
                <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {tool.description[locale]}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
