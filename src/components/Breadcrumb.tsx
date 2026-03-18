"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { tools } from "@/lib/tools";

export default function Breadcrumb() {
  const pathname = usePathname();
  const { locale } = useLocale();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [
    { label: locale === "ko" ? "홈" : "Home", href: "/" },
  ];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;

    if (segment === "tools") {
      crumbs.push({ label: locale === "ko" ? "도구" : "Tools", href: "/" });
    } else if (segment === "blog") {
      crumbs.push({ label: locale === "ko" ? "블로그" : "Blog", href: "/blog" });
    } else if (segment === "about") {
      crumbs.push({ label: locale === "ko" ? "소개" : "About", href: "/about" });
    } else if (segment === "privacy") {
      crumbs.push({
        label: locale === "ko" ? "개인정보처리방침" : "Privacy",
        href: "/privacy",
      });
    } else if (segment === "terms") {
      crumbs.push({
        label: locale === "ko" ? "이용약관" : "Terms",
        href: "/terms",
      });
    } else {
      // Tool page or blog post
      const tool = tools.find((t) => t.href === currentPath);
      if (tool) {
        crumbs.push({ label: tool.name[locale], href: currentPath });
      } else {
        // Blog slug - show truncated
        const decodedSegment = decodeURIComponent(segment);
        const label =
          decodedSegment.length > 30
            ? decodedSegment.slice(0, 30) + "..."
            : decodedSegment;
        crumbs.push({ label, href: currentPath });
      }
    }
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-5xl px-4 pt-3"
    >
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        {crumbs.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center gap-1">
            {i > 0 && <span className="mx-1">/</span>}
            {i === crumbs.length - 1 ? (
              <span className="text-gray-900 dark:text-white">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-gray-900 dark:hover:text-white">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
