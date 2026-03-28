"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import { tools } from "@/lib/tools";
import { useLocale } from "@/components/LocaleProvider";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale } = useLocale();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {locale === "ko" ? "글을 찾을 수 없습니다" : "Post not found"}
        </h1>
        <Link href="/blog" className="mt-4 inline-block text-blue-600 hover:underline">
          {locale === "ko" ? "블로그로 돌아가기" : "Back to Blog"}
        </Link>
      </div>
    );
  }

  const tool = tools.find((t) => t.id === post.toolId);
  const sections = post.content[locale];

  // Find related posts by keyword overlap + same toolId category
  const getRelatedPosts = () => {
    const postKeywords = new Set(post.keywords.map((k) => k.toLowerCase()));
    const scored = blogPosts
      .filter((p) => p.slug !== slug)
      .map((p) => {
        let score = 0;
        // Keyword overlap
        p.keywords.forEach((k) => {
          if (postKeywords.has(k.toLowerCase())) score += 3;
          // Partial match
          postKeywords.forEach((pk) => {
            if (k.toLowerCase().includes(pk) || pk.includes(k.toLowerCase())) score += 1;
          });
        });
        // Same tool category bonus
        if (p.toolId === post.toolId) score += 2;
        return { post: p, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.post);

    // Fallback to recent posts if no keyword matches
    if (scored.length < 3) {
      const slugs = new Set(scored.map((p) => p.slug));
      const fallback = blogPosts
        .filter((p) => p.slug !== slug && !slugs.has(p.slug))
        .slice(0, 3 - scored.length);
      return [...scored, ...fallback];
    }
    return scored;
  };

  const relatedPosts = getRelatedPosts();

  // Calculate reading time
  const totalText = sections.map((s) => s.body).join(" ");
  const wordCount = totalText.trim().split(/\s+/).length;
  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          &larr; {locale === "ko" ? "블로그" : "Blog"}
        </Link>
      </div>

      <article>
        <header className="mb-10">
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <time>{post.date}</time>
            <span>·</span>
            <span>
              {locale === "ko" ? `${readingTimeMin}분 읽기` : `${readingTimeMin} min read`}
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl">
            {post.title[locale]}
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {post.description[locale]}
          </p>
          {post.image && (
            <div className="mt-6 overflow-hidden rounded-xl">
              <img
                src={post.image}
                alt={post.title[locale]}
                className="h-auto w-full object-cover"
                loading="eager"
              />
            </div>
          )}
        </header>

        {/* 도구 CTA 배너 */}
        {tool && (
          <Link
            href={tool.href}
            className="mb-10 flex items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 p-4 transition-colors hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:hover:bg-blue-900"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tool.color} text-xl text-white`}
            >
              {tool.icon}
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {tool.name[locale]} {locale === "ko" ? "바로 사용하기" : "Try it now"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {tool.description[locale]}
              </div>
            </div>
            <div className="ml-auto text-blue-600 dark:text-blue-400">&rarr;</div>
          </Link>
        )}

        {/* 본문 */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                {section.heading}
              </h2>
              <div className="whitespace-pre-line text-gray-700 leading-relaxed dark:text-gray-300">
                {section.body}
              </div>
            </section>
          ))}
        </div>

        {/* 하단 CTA */}
        {tool && (
          <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              {locale === "ko"
                ? `지금 바로 ${tool.name.ko}를 사용해보세요`
                : `Try ${tool.name.en} now`}
            </h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {locale === "ko"
                ? "무료이며, 브라우저에서 바로 실행됩니다."
                : "Free and runs directly in your browser."}
            </p>
            <Link
              href={tool.href}
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              {tool.name[locale]} &rarr;
            </Link>
          </div>
        )}
      </article>

      {/* 관련 글 추천 (키워드 기반) */}
      <div className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "관련 글 더 보기" : "Related Articles"}
        </h3>
        <div className="space-y-3">
          {relatedPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="block rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
              >
                <div className="font-medium text-gray-900 dark:text-white">{p.title[locale]}</div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {p.description[locale]}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
