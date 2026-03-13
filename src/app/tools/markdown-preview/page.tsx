"use client";

import { useState, useMemo } from "react";
import { useLocale } from "@/components/LocaleProvider";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseMarkdown(md: string): string {
  let html = escapeHtml(md);

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre class="md-code-block"><code>${code.trim()}</code></pre>`;
  });

  // Inline code (`code`)
  html = html.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>');

  // Headers (must be at line start)
  html = html.replace(/^######\s+(.+)$/gm, '<h6 class="md-h6">$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="md-h5">$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4 class="md-h4">$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="md-h3">$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 class="md-h2">$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="md-h1">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Links [text](url) - url was already escaped, unescape for href
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="md-link">$1</a>'
  );

  // Blockquotes
  html = html.replace(/^&gt;\s+(.+)$/gm, '<blockquote class="md-blockquote">$1</blockquote>');

  // Unordered lists
  html = html.replace(/^[-*]\s+(.+)$/gm, '<li class="md-ul-item">$1</li>');
  html = html.replace(
    /(<li class="md-ul-item">[\s\S]*?<\/li>)(\n?)/g,
    (match) => match
  );
  html = html.replace(
    /((?:<li class="md-ul-item">.*<\/li>\n?)+)/g,
    '<ul class="md-ul">$1</ul>'
  );

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="md-ol-item">$1</li>');
  html = html.replace(
    /((?:<li class="md-ol-item">.*<\/li>\n?)+)/g,
    '<ol class="md-ol">$1</ol>'
  );

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr class="md-hr" />');

  // Line breaks: convert double newlines to paragraph breaks, single newlines to <br>
  html = html.replace(/\n\n/g, "</p><p>");
  html = html.replace(/\n/g, "<br />");

  // Wrap in paragraph
  html = `<p>${html}</p>`;

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, "");
  html = html.replace(/<p>(<h[1-6])/g, "$1");
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, "$1");
  html = html.replace(/<p>(<pre)/g, "$1");
  html = html.replace(/(<\/pre>)<\/p>/g, "$1");
  html = html.replace(/<p>(<ul)/g, "$1");
  html = html.replace(/(<\/ul>)<\/p>/g, "$1");
  html = html.replace(/<p>(<ol)/g, "$1");
  html = html.replace(/(<\/ol>)<\/p>/g, "$1");
  html = html.replace(/<p>(<blockquote)/g, "$1");
  html = html.replace(/(<\/blockquote>)<\/p>/g, "$1");
  html = html.replace(/<p>(<hr\s*\/>)/g, "$1");
  html = html.replace(/(<hr\s*\/>)<\/p>/g, "$1");

  return html;
}

export default function MarkdownPreview() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const { locale, t } = useLocale();

  const renderedHtml = useMemo(() => {
    if (!input.trim()) return "";
    return parseMarkdown(input);
  }, [input]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(renderedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        {locale === "ko" ? "마크다운 미리보기" : "Markdown Preview"}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {locale === "ko"
          ? "마크다운을 입력하면 실시간으로 미리보기를 확인할 수 있습니다."
          : "Type markdown and see a live preview in real-time."}
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setInput("")}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {t.clear}
        </button>
        {renderedHtml && (
          <button
            onClick={handleCopy}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            {copied
              ? t.copied
              : locale === "ko"
                ? "HTML 복사"
                : "Copy HTML"}
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "마크다운 입력" : "Markdown Input"}
            </label>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              locale === "ko"
                ? "마크다운을 입력하세요...\n\n# 제목\n**굵은 글씨** *기울임*\n- 목록 항목"
                : "Type your markdown here...\n\n# Heading\n**bold** *italic*\n- list item"
            }
            spellCheck={false}
            className="h-96 w-full resize-y rounded-xl border border-gray-200 bg-white p-4 font-mono text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale === "ko" ? "미리보기" : "Preview"}
            </label>
          </div>
          <div
            className="md-preview h-96 overflow-auto rounded-xl border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-900 dark:text-white"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
      </div>

      <style jsx global>{`
        .md-preview .md-h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; }
        .md-preview .md-h2 { font-size: 1.5em; font-weight: bold; margin: 0.75em 0; }
        .md-preview .md-h3 { font-size: 1.17em; font-weight: bold; margin: 0.83em 0; }
        .md-preview .md-h4 { font-size: 1em; font-weight: bold; margin: 1em 0; }
        .md-preview .md-h5 { font-size: 0.83em; font-weight: bold; margin: 1.5em 0; }
        .md-preview .md-h6 { font-size: 0.67em; font-weight: bold; margin: 2em 0; }
        .md-preview .md-link { color: #7c3aed; text-decoration: underline; }
        .md-preview .md-code-block {
          background: #f3f4f6; border-radius: 0.5rem; padding: 1rem;
          overflow-x: auto; margin: 0.5em 0; font-family: monospace;
        }
        .dark .md-preview .md-code-block { background: #1f2937; }
        .md-preview .md-inline-code {
          background: #f3f4f6; border-radius: 0.25rem; padding: 0.125rem 0.375rem;
          font-family: monospace; font-size: 0.9em;
        }
        .dark .md-preview .md-inline-code { background: #1f2937; }
        .md-preview .md-blockquote {
          border-left: 4px solid #c4b5fd; padding-left: 1rem;
          color: #6b7280; margin: 0.5em 0; font-style: italic;
        }
        .md-preview .md-ul { list-style-type: disc; padding-left: 1.5rem; margin: 0.5em 0; }
        .md-preview .md-ol { list-style-type: decimal; padding-left: 1.5rem; margin: 0.5em 0; }
        .md-preview .md-hr { border: none; border-top: 1px solid #d1d5db; margin: 1em 0; }
        .md-preview p { margin: 0.5em 0; }
        .md-preview strong { font-weight: bold; }
        .md-preview em { font-style: italic; }
      `}</style>

      <div className="mt-12 space-y-4 text-sm text-gray-500 dark:text-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {locale === "ko" ? "마크다운 미리보기란?" : "What is Markdown Preview?"}
        </h2>
        <p>
          {locale === "ko"
            ? "마크다운 미리보기는 마크다운 문법으로 작성한 텍스트를 실시간으로 렌더링하여 보여주는 무료 온라인 도구입니다. 제목, 굵은 글씨, 기울임, 코드 블록, 링크, 목록, 인용문 등 다양한 마크다운 문법을 지원합니다. 브라우저에서 바로 실행되며 데이터가 서버로 전송되지 않습니다."
            : "Markdown Preview is a free online tool that renders markdown text in real-time. It supports headers, bold, italic, code blocks, links, lists, blockquotes, and more. It runs entirely in your browser — no data is sent to any server."}
        </p>
      </div>
    </div>
  );
}
