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
      <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "Toolkio 도구를 200% 활용하는 가이드와 실전 팁을 모았어요. 글자수 세기·이미지 최적화·진법 변환·QR코드 운영처럼 매일 한 번씩 만나는 작업을 어떻게 더 빠르고 정확하게 처리할 수 있는지 정리했습니다."
          : "Guides and practical tips for getting the most out of Toolkio's online tools — character counters, image optimization, base conversion, QR code workflows, and more. Each post takes 5–8 minutes to read."}
      </p>
      <p className="mb-12 text-sm text-gray-500 dark:text-gray-500">
        {locale === "ko"
          ? `현재 ${blogPosts.length}개의 가이드가 있어요. 매주 새 글이 추가되며 도구 페이지에서 관련 글을 자동으로 연결해 드립니다.`
          : `Currently ${blogPosts.length} guides available. New posts added weekly, and each tool page links to related articles automatically.`}
      </p>

      <div className="space-y-6">
        {[...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).map((post) => (
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
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{post.date}</span>
                <span>·</span>
                <span>
                  {(() => {
                    const text = post.content[locale].map((s) => s.body).join(" ");
                    const mins = Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
                    return locale === "ko" ? `${mins}분` : `${mins} min`;
                  })()}
                </span>
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
