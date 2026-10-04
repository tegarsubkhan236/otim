import { RetailModulePage } from "@/app/_components/retail-module-page";

export default async function RetailMasterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <RetailModulePage slug={slug} />;
}
