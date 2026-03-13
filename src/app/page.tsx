"use client";

import { useState } from "react";
import Link from "next/link";
import { tools, categories, type Category } from "@/lib/tools";
import { useLocale } from "@/components/LocaleProvider";

export default function Home() {
  const { locale, t } = useLocale();
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filteredTools =
    activeCategory === "all"
      ? tools
      : tools.filter((tool) => tool.category === activeCategory);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-16">
      <section className="mb-10 text-center sm:mb-16">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:mb-4 sm:text-5xl">
          {t.hero}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 sm:text-lg">
          {t.heroSub}
        </p>
      </section>

      <section>
        {/* Category filter - horizontal scroll on mobile */}
        <div className="scrollbar-hide -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mb-8 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
          <button
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            {locale === "ko" ? "전체" : "All"} ({tools.length})
          </button>
          {categories.map((cat) => {
            const count = tools.filter((t) => t.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {cat.icon} {cat.name[locale]} ({count})
              </button>
            );
          })}
        </div>

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 sm:block sm:p-6"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tool.color} text-lg text-white sm:mb-4 sm:h-12 sm:w-12 sm:text-xl`}
              >
                {tool.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:mb-2 sm:text-lg">
                  {tool.name[locale]}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {tool.description[locale]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
