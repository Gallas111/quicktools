import RelatedTools from "@/components/RelatedTools";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <RelatedTools />
    </>
  );
}
