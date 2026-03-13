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
    <div className="mx-auto max-w-5xl px-4 py-16">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          {t.hero}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t.heroSub}
        </p>
      </section>

      <section>
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${tool.color} text-xl text-white`}
              >
                {tool.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {tool.name[locale]}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tool.description[locale]}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
