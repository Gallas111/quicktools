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

      <div className="space-y-10 text-gray-700 leading-relaxed dark:text-gray-300">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            {locale === "ko" ? "Toolkio란?" : "What is Toolkio?"}
          </h2>
          <p>
            {locale === "ko"
              ? `Toolkio는 일상과 개발에 필요한 ${tools.length}가지 이상의 무료 온라인 도구를 제공하는 웹 서비스예요. 글자수 세기, 이미지 압축, QR코드 생성, JSON 포맷터, 단위 변환기처럼 자주 찾게 되는 도구들을 회원가입 없이 바로 쓸 수 있도록 만들었습니다.`
              : `Toolkio is a free web service offering ${tools.length}+ online tools for everyday life and development. Use character counters, image compressors, QR generators, JSON formatters, unit converters, and more — no sign-up required.`}
          </p>
          <p className="mt-3">
            {locale === "ko"
              ? "모든 도구가 브라우저에서 동작하기 때문에 입력하신 데이터가 외부 서버로 전송되지 않아요. 비공개 문서, 회사 코드, 민감한 이미지를 다루실 때도 마음 편하게 쓰실 수 있습니다."
              : "Every tool runs locally in your browser — your data never leaves your device. Even sensitive documents, code, or images stay completely private."}
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            {locale === "ko" ? "Toolkio를 만든 이유" : "Why We Built Toolkio"}
          </h2>
          <p className="mb-3">
            {locale === "ko"
              ? "온라인 도구를 검색하면 가장 먼저 나오는 사이트들이 광고로 가득하거나, 회원가입을 강요하거나, 결과 화면에서 다시 결제 페이지로 보내는 경우가 많아요. 단순히 글자수 한 번 세고 싶었을 뿐인데 시간이 5~10분씩 빠지더라고요."
              : "Most online tool sites are buried in ads, gated by sign-ups, or push you to upgrade after a single use. We wanted a place where everyday tasks — counting characters, compressing an image, decoding Base64 — take seconds, not minutes."}
          </p>
          <p>
            {locale === "ko"
              ? "그래서 Toolkio는 '클릭 한 번으로 끝나는 도구'를 원칙으로 만들었어요. 결과는 즉시, 데이터는 안전하게, 비용은 0원으로. 도구별로 한국어·영어 가이드 글까지 함께 제공해서 처음 보는 분도 5분 안에 익숙해지도록 구성했습니다."
              : "So Toolkio is built around one rule — every tool finishes in a single click. Instant results, private by default, free forever. Each tool comes with Korean and English guides so first-time users can get up to speed in five minutes."}
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
            {locale === "ko" ? "도구 카테고리" : "Tool Categories"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: locale === "ko" ? "텍스트·문서" : "Text & Documents",
                desc:
                  locale === "ko"
                    ? "글자수 카운터, 마크다운 미리보기, Lorem Ipsum, Diff 비교"
                    : "Character counter, Markdown preview, Lorem Ipsum, Diff checker",
              },
              {
                title: locale === "ko" ? "이미지·미디어" : "Image & Media",
                desc:
                  locale === "ko"
                    ? "이미지 압축기, QR코드 생성, 색상 변환, 유튜브 썸네일 추출"
                    : "Image compressor, QR code generator, color converter, YouTube thumbnail",
              },
              {
                title: locale === "ko" ? "개발자 도구" : "Developer Tools",
                desc:
                  locale === "ko"
                    ? "JSON 포맷터, Base64 인코더, Hash 생성기, Regex 테스터, UUID, CSS Minifier"
                    : "JSON formatter, Base64 encoder, hash generator, regex tester, UUID, CSS minifier",
              },
              {
                title: locale === "ko" ? "계산기·단위" : "Calculators & Units",
                desc:
                  locale === "ko"
                    ? "BMI·BMR, 학점(GPA), 단위·진법 변환, 백분율, 연봉, D-day"
                    : "BMI·BMR, GPA, unit/base converters, percentage, salary, D-day",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
              >
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
              ? `현재 ${tools.length}개의 도구를 운영하고 있어요. 매주 사용 데이터를 살펴서 자주 찾는 도구를 다듬고, 부족한 도구를 새로 추가해 가고 있습니다. 추가했으면 하는 도구가 있으시면 아래 이메일로 알려주세요. 즉시 검토 후 우선순위에 반영하겠습니다.`
              : `We currently offer ${tools.length} tools and add new ones regularly based on what users ask for. If there is a tool you wish existed, please email us — we read every suggestion and prioritize the ones that solve real problems.`}
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
            {locale === "ko" ? "자주 묻는 질문" : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-4">
            {[
              {
                q: locale === "ko" ? "정말 무료인가요? 결제 페이지가 따로 있나요?" : "Is it really free? Any hidden payment?",
                a:
                  locale === "ko"
                    ? "전부 무료예요. 결제 페이지·프리미엄 등급 같은 게 없어요. 광고 없이 운영 중이고, 향후에도 핵심 도구는 무료를 유지할 계획이에요."
                    : "Yes, completely free. No paywall, no premium tier, no ads on tool pages. Core tools will stay free.",
              },
              {
                q: locale === "ko" ? "데이터가 정말 외부로 안 나가나요?" : "Is my data really not sent anywhere?",
                a:
                  locale === "ko"
                    ? "맞아요. 모든 변환·계산이 브라우저(JavaScript)에서 끝나거든요. 네트워크 탭을 열어 보시면 실제로 외부 요청이 없는 걸 확인하실 수 있어요. 단, 광고·분석 스크립트(Google Analytics)는 일반적인 페이지 뷰만 수집합니다."
                    : "Correct. All processing happens in your browser via JavaScript — open the Network tab and you can verify no requests leave your machine. The only external requests are standard analytics for page views, never your input.",
              },
              {
                q: locale === "ko" ? "회원가입이 필요한가요?" : "Do I need to sign up?",
                a:
                  locale === "ko"
                    ? "필요 없어요. 이메일·비밀번호 없이 모든 도구를 그대로 사용하실 수 있어요. 즐겨찾기에 추가하시면 매번 빠르게 접근 가능해요."
                    : "No. Every tool is accessible without an account. Bookmark the page for quick access.",
              },
              {
                q: locale === "ko" ? "기업·학교에서 사용해도 되나요?" : "Can I use it at work or school?",
                a:
                  locale === "ko"
                    ? "네. 별도 라이선스 없이 자유롭게 사용하시면 돼요. 사내 보안 정책상 외부 서비스 이용이 제한되는 경우, 모든 처리가 브라우저에서 끝난다는 점을 보안팀에 설명하시면 도움이 될 거예요."
                    : "Yes. Free to use in workplaces, schools, and organizations. Since processing happens client-side, it usually clears strict security reviews.",
              },
              {
                q: locale === "ko" ? "버그를 발견했어요. 어디로 알리면 되나요?" : "I found a bug. Where do I report it?",
                a:
                  locale === "ko"
                    ? "아래 이메일(kingyw102@gmail.com)로 보내주시면 24~48시간 안에 검토하고 답변드릴게요. 가능하시면 사용 환경(브라우저·OS·재현 단계)을 함께 적어주시면 빠르게 해결할 수 있어요."
                    : "Email kingyw102@gmail.com — we usually respond within 24~48 hours. Including your browser, OS, and reproduction steps speeds things up a lot.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">{item.q}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
            {locale === "ko" ? "문의" : "Contact"}
          </h2>
          <p>
            {locale === "ko"
              ? "문의사항·도구 추천·제휴 제안은 아래 이메일로 보내주세요. 평일 24~48시간 안에 답변드립니다."
              : "Feedback, tool requests, and partnership inquiries are welcome — we usually respond within 24~48 business hours."}
          </p>
          <p className="mt-2 font-medium text-gray-900 dark:text-white">
            kingyw102@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
}
