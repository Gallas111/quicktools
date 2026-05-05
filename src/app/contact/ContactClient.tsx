"use client";

import { useLocale } from "@/components/LocaleProvider";

export default function ContactClient() {
    const { locale } = useLocale();
    const t = (ko: string, en: string) => (locale === "ko" ? ko : en);

    return (
        <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                {t("문의 — Contact Us", "Contact Us")}
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
                {t(
                    "피드백·버그 리포트·도구 추천을 환영합니다. 평일 24~48시간 안에 답변드려요.",
                    "Have feedback, found a bug, or want to suggest a new tool? Feel free to reach out. We typically respond within 1-2 business days."
                )}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
                    <div className="text-4xl mb-4">📧</div>
                    <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        {t("이메일", "Email")}
                    </h2>
                    <a
                        href="mailto:kingyw102@gmail.com"
                        className="text-emerald-600 hover:underline"
                    >
                        kingyw102@gmail.com
                    </a>
                    <p className="text-sm text-gray-500 mt-2">
                        {t("평일 24~48시간 안에 답변", "We typically respond within 1-2 business days.")}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
                    <div className="text-4xl mb-4">📍</div>
                    <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        {t("위치", "Location")}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        {t("대한민국 서울", "Seoul, South Korea")}
                    </p>
                </div>
            </div>

            <section className="mt-12 space-y-6 text-gray-700 leading-relaxed dark:text-gray-300">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t("문의 전 확인해 주세요", "Before You Email")}
                </h2>
                <p>
                    {t(
                        "다음과 같은 내용은 메일 없이도 빠르게 확인하실 수 있어요. 도구가 동작하지 않거나 결과가 이상할 때는 먼저 브라우저를 새로고침하거나 다른 브라우저(크롬·사파리·엣지)에서 시도해 보세요. 모든 도구가 브라우저에서 동작하기 때문에 캐시 문제로 막히는 경우가 있거든요.",
                        "Some questions can be solved faster without writing an email. If a tool seems broken, try refreshing the page or switching browsers (Chrome, Safari, Edge) — most issues are cache-related since everything runs in your browser."
                    )}
                </p>
                <p>
                    {t(
                        "그래도 해결이 안 되면 메일 본문에 사용하신 브라우저·OS·재현 단계를 같이 적어주세요. 빠르면 같은 날, 늦어도 2일 안에 회신드립니다.",
                        "If the issue persists, please include your browser, OS, and reproduction steps in your email. We respond within 1-2 business days at the latest."
                    )}
                </p>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t("자주 받는 문의", "Common Inquiries")}
                </h2>
                <div className="space-y-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                        <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                            {t("새 도구 추천", "Tool requests")}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t(
                                "어떤 작업을 자주 하시는지, 기존 도구에서 어떤 점이 부족한지 알려주시면 검토 후 우선순위에 반영합니다.",
                                "Tell us what task you do often and what existing tools lack. We review every request and prioritize the ones that solve real problems."
                            )}
                        </p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                        <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                            {t("버그 리포트", "Bug reports")}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t(
                                "어떤 도구·어떤 입력값에서 문제가 났는지, 브라우저·OS 정보를 함께 적어주세요. 가능하면 스크린샷도 첨부 부탁드립니다.",
                                "Include the tool name, input that caused the issue, browser, and OS. Screenshots help a lot."
                            )}
                        </p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                        <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                            {t("제휴·콘텐츠 협업", "Partnership & content")}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t(
                                "광고·후원·콘텐츠 협업 제안은 회사명·연락처·제안 내용을 메일 본문에 정리해 주세요. 검토 후 답변드립니다.",
                                "For advertising, sponsorship, or content partnerships, please include your company, contact, and proposal details in your email."
                            )}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
