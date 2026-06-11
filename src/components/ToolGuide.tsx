"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

export interface GuideSection {
  heading: { ko: string; en: string };
  body: { ko: string; en: string };
}

export interface FaqItem {
  q: { ko: string; en: string };
  a: { ko: string; en: string };
}

/** 외부 공식·공공데이터 출처 (근거 인용). 외부 URL은 새 탭으로 엶. */
export interface GuideSource {
  /** 표시 이름 (기관·문서명) */
  label: { ko: string; en: string };
  /** 공식 출처 URL */
  url: string;
  /** 어떤 수치·기준을 이 출처에서 가져왔는지 (선택) */
  note?: { ko: string; en: string };
}

/** 같은 quicktools 사이트 내부의 관련 도구·블로그 링크 (내부 SEO). */
export interface GuideInternalLink {
  /** 내부 경로만 허용 (예: /tools/percent-calculator, /blog/...) */
  href: string;
  label: { ko: string; en: string };
}

export interface ToolGuideData {
  intro?: { ko: string; en: string };
  sections: GuideSection[];
  faqs?: FaqItem[];
  cta?: { ko: string; en: string };
  /** 도구별 고유한 공식 출처 목록 */
  sources?: GuideSource[];
  /** quicktools 내부 관련 도구·글 (외부 자사 블로그 링크 금지) */
  relatedLinks?: GuideInternalLink[];
}

export default function ToolGuide({ data }: { data: ToolGuideData }) {
  const { locale } = useLocale();

  return (
    <section className="mt-16 space-y-8 border-t border-gray-200 pt-12 dark:border-gray-800">
      {data.intro && (
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
          {data.intro[locale]}
        </p>
      )}

      <div className="space-y-6">
        {data.sections.map((s) => (
          <article key={s.heading.en} className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {s.heading[locale]}
            </h2>
            <p className="whitespace-pre-line text-base leading-relaxed text-gray-700 dark:text-gray-300">
              {s.body[locale]}
            </p>
          </article>
        ))}
      </div>

      {data.faqs && data.faqs.length > 0 && (
        <div className="space-y-3">
          {/* FAQPage 스키마 — 아래 가시 FAQ와 동일 데이터(ko). 30개 도구 공통 (2026-06-11) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: data.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q.ko,
                  acceptedAnswer: { "@type": "Answer", text: f.a.ko },
                })),
              }),
            }}
          />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {locale === "ko" ? "자주 묻는 질문" : "Frequently Asked Questions"}
          </h2>
          {data.faqs.map((f) => (
            <details
              key={f.q.en}
              className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">
                {f.q[locale]}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {f.a[locale]}
              </p>
            </details>
          ))}
        </div>
      )}

      {data.relatedLinks && data.relatedLinks.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {locale === "ko" ? "함께 보면 좋은 도구" : "Related Tools You May Need"}
          </h2>
          <ul className="space-y-1.5">
            {data.relatedLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-base font-medium text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
                >
                  {l.label[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.sources && data.sources.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {locale === "ko" ? "출처 · 근거 자료" : "Sources & References"}
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {data.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="font-medium text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
                >
                  {s.label[locale]}
                </a>
                {s.note && (
                  <span className="text-gray-500 dark:text-gray-500">
                    {" — "}
                    {s.note[locale]}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.cta && (
        <p className="text-sm italic text-gray-500 dark:text-gray-400">
          {data.cta[locale]}
        </p>
      )}
    </section>
  );
}
