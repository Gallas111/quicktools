"use client";

import { useLocale } from "@/components/LocaleProvider";

export default function PrivacyPage() {
  const { locale } = useLocale();

  if (locale === "en") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-gray-700 leading-relaxed dark:text-gray-300">
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: March 18, 2026</p>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">1. Overview</h2>
            <p>
              Toolkio (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates the website toolkio.com. This page explains how we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">2. Data Collection</h2>
            <p>
              All tools on Toolkio run entirely in your browser. Text, images, and other data you input into our tools are processed locally on your device and are never sent to our servers.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">3. Analytics</h2>
            <p>
              We use Google Analytics to collect anonymous usage statistics (page views, referrers, device type). This helps us improve our service. Google Analytics may use cookies; you can opt out via your browser settings.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">4. Advertising</h2>
            <p>
              We may display advertisements through Google AdSense. Google may use cookies and similar technologies to serve ads based on your browsing activity. You can manage your ad preferences at{" "}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">Google Ads Settings</a>.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">5. Cookies</h2>
            <p>
              We use cookies for analytics and advertising purposes. Essential cookies (such as language preference) are stored locally. You can disable cookies through your browser settings, though some features may not work as expected.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">6. Third-Party Services</h2>
            <p>
              Our site uses the following third-party services:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Google Analytics (traffic analysis)</li>
              <li>Google AdSense (advertising)</li>
              <li>Cloudflare (hosting and CDN)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">7. Children&apos;s Privacy</h2>
            <p>
              Our service is not directed at children under 13. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">9. Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{" "}
              <span className="font-medium text-gray-900 dark:text-white">kingyw102@gmail.com</span>.
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
        개인정보처리방침
      </h1>
      <div className="space-y-6 text-gray-700 leading-relaxed dark:text-gray-300">
        <p className="text-sm text-gray-500 dark:text-gray-400">최종 수정일: 2026년 3월 18일</p>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">1. 개요</h2>
          <p>
            Toolkio(&quot;본 서비스&quot;)는 toolkio.com을 운영하며, 이용자의 개인정보를 중요하게 생각합니다. 본 개인정보처리방침은 어떤 정보를 수집하고 어떻게 이용하는지 설명합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">2. 수집하는 정보</h2>
          <p>
            Toolkio의 모든 도구는 브라우저에서 실행됩니다. 사용자가 입력하는 텍스트, 이미지 등의 데이터는 사용자의 기기에서만 처리되며, 서버로 전송되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">3. 분석 도구</h2>
          <p>
            서비스 개선을 위해 Google Analytics를 사용하여 페이지뷰, 유입 경로, 기기 유형 등 익명의 사용 통계를 수집합니다. Google Analytics는 쿠키를 사용할 수 있으며, 브라우저 설정에서 비활성화할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">4. 광고</h2>
          <p>
            Google AdSense를 통해 광고를 표시할 수 있습니다. Google은 쿠키 및 유사 기술을 사용하여 사용자의 관심사에 맞는 광고를 제공할 수 있습니다. 광고 설정은{" "}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">Google 광고 설정</a>
            에서 관리할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">5. 쿠키</h2>
          <p>
            본 서비스는 분석 및 광고 목적으로 쿠키를 사용합니다. 언어 설정 등 필수 쿠키는 로컬에 저장됩니다. 브라우저 설정을 통해 쿠키를 비활성화할 수 있으나, 일부 기능이 정상 작동하지 않을 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">6. 제3자 서비스</h2>
          <p>본 서비스는 다음의 제3자 서비스를 이용합니다:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Google Analytics (트래픽 분석)</li>
            <li>Google AdSense (광고)</li>
            <li>Cloudflare (호스팅 및 CDN)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">7. 아동 보호</h2>
          <p>
            본 서비스는 만 14세 미만의 아동을 대상으로 하지 않으며, 아동의 개인정보를 의도적으로 수집하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">8. 변경 사항</h2>
          <p>
            본 개인정보처리방침은 수시로 변경될 수 있으며, 변경 시 이 페이지에 게시합니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">9. 문의</h2>
          <p>
            개인정보처리방침에 관한 문의는{" "}
            <span className="font-medium text-gray-900 dark:text-white">kingyw102@gmail.com</span>
            으로 연락해 주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
