import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title.ko + " | " + post.title.en,
    description: post.description.ko + " " + post.description.en,
    keywords: post.keywords,
    openGraph: {
      title: post.title.ko,
      description: post.description.ko,
      type: "article",
      publishedTime: post.date,
      ...(post.image && {
        images: [{ url: `https://toolkio.com${post.image}`, width: 1024, height: 1024 }],
      }),
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Toolkio Blog",
  url: "https://toolkio.com/blog",
  description: "온라인 도구 활용 가이드와 팁",
  inLanguage: ["ko", "en"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
