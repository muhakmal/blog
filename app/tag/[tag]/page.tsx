import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TaxonomyPage from "../../../components/TaxonomyPage";
import { getAllTags, getPostsByTag } from "../../../lib/posts";
import { absoluteUrl, pageOpenGraph } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata(props: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await props.params;
  const entry = getAllTags().find((t) => t.slug === tag);
  if (!entry) return { title: "Tag tidak ditemukan" };
  return {
    title: `#${entry.name}`,
    description: `${entry.count} tulisan dengan tag #${entry.name}.`,
    alternates: { canonical: absoluteUrl(`/tag/${tag}`) },
    openGraph: pageOpenGraph(`#${entry.name}`, `${entry.count} tulisan dengan tag #${entry.name}.`, `/tag/${tag}`),
  };
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const { tag } = await props.params;
  const entry = getAllTags().find((t) => t.slug === tag);
  if (!entry) notFound();
  return <TaxonomyPage label="Tag" name={`#${entry.name}`} posts={getPostsByTag(tag)} />;
}
