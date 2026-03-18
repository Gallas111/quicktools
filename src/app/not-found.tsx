import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
      <div className="mb-6 text-7xl font-bold text-gray-200 dark:text-gray-800">404</div>
      <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          홈으로 가기
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          블로그 보기
        </Link>
      </div>
    </div>
  );
}
