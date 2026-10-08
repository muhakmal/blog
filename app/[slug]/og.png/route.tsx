import { ImageResponse } from "next/og";
import OgCard, { ogOptions } from "../../../components/OgCard";
import { getPostData, getSortedPostsData } from "../../../lib/posts";
import { formatDate } from "../../../lib/site";

// Served as /<slug>/og.png: the share preview image for each post.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getSortedPostsData().map((post) => ({ slug: post.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);
  const eyebrow = post?.categories.slice(0, 2).join(" · ").toUpperCase() || "BLOG";
  const footer = post ? `${formatDate(post.date)} · ${post.readingTime}` : "";
  return new ImageResponse(<OgCard eyebrow={eyebrow} title={post?.title ?? "Tulisan"} footer={footer} />, ogOptions);
}
