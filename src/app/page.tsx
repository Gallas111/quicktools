"use client";

import Link from "next/link";
import { tools } from "@/lib/tools";
import { useLocale } from "@/components/LocaleProvider";

export default function Home() {
  const { locale, t } = useLocale();

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
        <h2 className="mb-8 text-2xl font-semibold text-gray-900 dark:text-white">
          {t.allTools}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
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
