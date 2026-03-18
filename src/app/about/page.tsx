"use client";

import Link from "next/link";
import { tools } from "@/lib/tools";
import { useLocale } from "@/components/LocaleProvider";

export default function AboutPage() {
  const { locale } = useLocale();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
        {locale === "ko" ? "Toolkio 소개" : "About Toolkio"}
      </h1>

      <div className="space-y-8 text-gray-700 leading-relaxed dark:text-gray-300">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            {locale === "ko" ? "Toolkio란?" : "What is Toolkio?"}
          </h2>
          <p>
            {locale === "ko"
              ? `Toolkio는 일상과 개발에 필요한 ${tools.length}가지 이상의 무료 온라인 도구를 제공하는 웹 서비스입니다. 글자수 세기, 이미지 압축, QR코드 생성, JSON 포맷터, 단위 변환기 등 다양한 도구를 회원가입 없이 바로 사용할 수 있습니다.`
              : `Toolkio is a free web service offering ${tools.length}+ online tools for everyday life and development. Use character counters, image compressors, QR generators, JSON formatters, unit converters, and more — no sign-up required.`}
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            {locale === "ko" ? "핵심 가치" : "Core Values"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: "🔒",
                title: locale === "ko" ? "개인정보 보호" : "Privacy First",
                desc:
                  locale === "ko"
                    ? "모든 도구는 브라우저에서 실행됩니다. 입력한 데이터는 서버로 전송되지 않습니다."
                    : "All tools run in your browser. Your data is never sent to any server.",
              },
              {
                icon: "⚡",
                title: locale === "ko" ? "빠르고 무료" : "Fast & Free",
                desc:
                  locale === "ko"
                    ? "회원가입, 설치 없이 바로 사용 가능합니다. 모든 도구는 완전히 무료입니다."
                    : "No sign-up or installation needed. Every tool is completely free to use.",
              },
              {
                icon: "🌏",
                title: locale === "ko" ? "한국어 & English" : "Korean & English",
                desc:
                  locale === "ko"
                    ? "모든 도구와 가이드를 한국어와 영어로 제공합니다."
                    : "All tools and guides are available in both Korean and English.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="mb-2 text-2xl">{item.icon}</div>
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            {locale === "ko" ? "제공 도구" : "Available Tools"}
          </h2>
          <p className="mb-4">
            {locale === "ko"
              ? `현재 ${tools.length}개의 도구를 제공하고 있으며, 지속적으로 새로운 도구를 추가하고 있습니다.`
              : `We currently offer ${tools.length} tools, with new ones being added regularly.`}
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            {locale === "ko" ? "모든 도구 보기" : "Browse All Tools"} →
          </Link>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            {locale === "ko" ? "문의" : "Contact"}
          </h2>
          <p>
            {locale === "ko"
              ? "문의사항이나 제안은 아래 이메일로 보내주세요."
              : "For questions or suggestions, please reach out via email."}
          </p>
          <p className="mt-2 font-medium text-gray-900 dark:text-white">
            contact@toolkio.com
          </p>
        </section>
      </div>
    </div>
  );
}
