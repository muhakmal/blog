import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TaxonomyPage from "../../../components/TaxonomyPage";
import { getAllCategories, getPostsByCategory } from "../../../lib/posts";
import { absoluteUrl, pageOpenGraph } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ kategori: category.slug }));
}

export async function generateMetadata(props: { params: Promise<{ kategori: string }> }): Promise<Metadata> {
  const { kategori } = await props.params;
  const entry = getAllCategories().find((c) => c.slug === kategori);
  if (!entry) return { title: "Kategori tidak ditemukan" };
  return {
    title: `Kategori ${entry.name}`,
    description: `${entry.count} tulisan dalam kategori ${entry.name}.`,
    alternates: { canonical: absoluteUrl(`/kategori/${kategori}`) },
    openGraph: pageOpenGraph(`Kategori ${entry.name}`, `${entry.count} tulisan dalam kategori ${entry.name}.`, `/kategori/${kategori}`),
  };
}

export default async function CategoryPage(props: { params: Promise<{ kategori: string }> }) {
  const { kategori } = await props.params;
  const entry = getAllCategories().find((c) => c.slug === kategori);
  if (!entry) notFound();
  return <TaxonomyPage label="Kategori" name={entry.name} posts={getPostsByCategory(kategori)} />;
}
