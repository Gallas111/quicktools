"use client";

import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import { useLocale } from "@/components/LocaleProvider";

export default function BlogList() {
  const { locale } = useLocale();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "블로그" : "Blog"}
      </h1>
      <p className="mb-12 text-lg text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "온라인 도구 활용 가이드와 팁을 확인하세요."
          : "Guides and tips for using online tools effectively."}
      </p>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
          >
            {post.image && (
              <div className="aspect-[2/1] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={post.image}
                  alt={post.title[locale]}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-6">
              <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                {post.date}
              </div>
              <h2 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {post.title[locale]}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {post.description[locale]}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.keywords.slice(0, 3).map((kw) => (
                  <span
                    key={kw}
                    className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
