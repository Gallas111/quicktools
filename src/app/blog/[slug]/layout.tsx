import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const url = `https://toolkio.com/blog/${slug}`;

  return {
    title: post.title.ko,
    description: post.description.ko,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title.ko,
      description: post.description.ko,
      url,
      siteName: "Toolkio",
      type: "article",
      publishedTime: post.date,
      authors: ["Toolkio"],
      ...(post.image && {
        images: [{ url: `https://toolkio.com${post.image}`, width: 1024, height: 1024, alt: post.title.ko }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.ko,
      description: post.description.ko,
      ...(post.image && { images: [`https://toolkio.com${post.image}`] }),
    },
  };
}

function generateJsonLd(slug: string) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;

  const url = `https://toolkio.com/blog/${slug}`;

  return [
    // BlogPosting schema
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title.ko,
      description: post.description.ko,
      url,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Organization", name: "Toolkio", url: "https://toolkio.com" },
      publisher: { "@type": "Organization", name: "Toolkio", url: "https://toolkio.com" },
      keywords: post.keywords.join(", "),
      inLanguage: "ko",
      ...(post.image && { image: `https://toolkio.com${post.image}` }),
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    },
    // Breadcrumb schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: "https://toolkio.com" },
        { "@type": "ListItem", position: 2, name: "블로그", item: "https://toolkio.com/blog" },
        { "@type": "ListItem", position: 3, name: post.title.ko, item: url },
      ],
    },
  ];
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const jsonLdArray = generateJsonLd(slug);

  return (
    <>
      {jsonLdArray?.map((jsonLd, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}
      {children}
    </>
  );
}
