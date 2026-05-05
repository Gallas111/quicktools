"use client";

import { useLocale } from "@/components/LocaleProvider";

export interface GuideSection {
  heading: { ko: string; en: string };
  body: { ko: string; en: string };
}

export interface FaqItem {
  q: { ko: string; en: string };
  a: { ko: string; en: string };
}

export interface ToolGuideData {
  intro?: { ko: string; en: string };
  sections: GuideSection[];
  faqs?: FaqItem[];
  cta?: { ko: string; en: string };
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

      {data.cta && (
        <p className="text-sm italic text-gray-500 dark:text-gray-400">
          {data.cta[locale]}
        </p>
      )}
    </section>
  );
}
