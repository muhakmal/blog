import type { MetadataRoute } from "next";
import { getAllCategories, getAllTags, getSortedPostsData } from "../lib/posts";
import { absoluteUrl } from "../lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPostsData();
  const latest = posts.map((post) => post.updated || post.date).sort().at(-1);
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/cv"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/posts"), lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((post) => ({
      url: absoluteUrl(`/${post.slug}`),
      lastModified: post.updated || post.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...getAllCategories().map((category) => ({
      url: absoluteUrl(`/kategori/${category.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    ...getAllTags().map((tag) => ({
      url: absoluteUrl(`/tag/${tag.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
  ];
}
