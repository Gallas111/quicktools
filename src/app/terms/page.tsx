"use client";

import { useLocale } from "@/components/LocaleProvider";

export default function TermsPage() {
  const { locale } = useLocale();

  if (locale === "en") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Terms of Service
        </h1>
        <div className="space-y-6 text-gray-700 leading-relaxed dark:text-gray-300">
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: March 18, 2026</p>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
            <p>By accessing and using Toolkio (toolkio.com), you agree to be bound by these Terms of Service.</p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">2. Service Description</h2>
            <p>Toolkio provides free online tools including character counters, image compressors, QR code generators, and more. All tools run in your browser and do not require registration.</p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">3. Use of Service</h2>
            <p>You may use our tools for personal and commercial purposes. However, you may not:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Use the service for illegal activities</li>
              <li>Attempt to disrupt or overload the service</li>
              <li>Scrape or crawl the service in an automated manner that degrades performance</li>
              <li>Reproduce or redistribute the service without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">4. Disclaimer</h2>
            <p>Toolkio is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that the tools will be error-free or uninterrupted. Results from our tools are for reference purposes and should be verified independently when accuracy is critical.</p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">5. Limitation of Liability</h2>
            <p>Toolkio shall not be liable for any damages arising from the use or inability to use our service, including but not limited to data loss, business interruption, or financial loss.</p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">6. Intellectual Property</h2>
            <p>The content, design, and code of Toolkio are protected by copyright. Users retain ownership of any data they input into the tools.</p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">7. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">8. Contact</h2>
            <p>For questions about these Terms, contact us at{" "}
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
        이용약관
      </h1>
      <div className="space-y-6 text-gray-700 leading-relaxed dark:text-gray-300">
        <p className="text-sm text-gray-500 dark:text-gray-400">최종 수정일: 2026년 3월 18일</p>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">1. 약관의 동의</h2>
          <p>Toolkio(toolkio.com)에 접속하고 이용함으로써 본 이용약관에 동의하는 것으로 간주합니다.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">2. 서비스 설명</h2>
          <p>Toolkio는 글자수 세기, 이미지 압축, QR코드 생성기 등 무료 온라인 도구를 제공합니다. 모든 도구는 브라우저에서 실행되며 회원가입이 필요하지 않습니다.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">3. 이용 규칙</h2>
          <p>본 서비스는 개인적, 상업적 용도로 자유롭게 사용할 수 있습니다. 단, 다음 행위는 금지됩니다:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>불법적인 목적으로 서비스를 이용하는 행위</li>
            <li>서비스를 방해하거나 과부하를 유발하는 행위</li>
            <li>성능을 저하시키는 자동화된 수집(크롤링) 행위</li>
            <li>허가 없이 서비스를 복제하거나 재배포하는 행위</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">4. 면책 조항</h2>
          <p>Toolkio는 &quot;있는 그대로&quot; 제공되며, 어떠한 종류의 보증도 하지 않습니다. 도구의 결과는 참고용이며, 정확성이 중요한 경우 별도로 검증하시기 바랍니다.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">5. 책임 제한</h2>
          <p>Toolkio는 서비스 이용 또는 이용 불능으로 발생하는 데이터 손실, 업무 중단, 금전적 손실 등 어떠한 손해에 대해서도 책임을 지지 않습니다.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">6. 지적 재산권</h2>
          <p>Toolkio의 콘텐츠, 디자인 및 코드는 저작권으로 보호됩니다. 사용자가 도구에 입력한 데이터에 대한 소유권은 사용자에게 있습니다.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">7. 약관 변경</h2>
          <p>본 약관은 사전 공지 없이 변경될 수 있으며, 변경 후 서비스를 계속 이용하면 변경된 약관에 동의한 것으로 간주합니다.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">8. 문의</h2>
          <p>이용약관에 관한 문의는{" "}
            <span className="font-medium text-gray-900 dark:text-white">kingyw102@gmail.com</span>
            으로 연락해 주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
