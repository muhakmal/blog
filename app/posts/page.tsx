import type { Metadata } from "next";
import PostsExplorer from "../../components/PostsExplorer";
import { getAllCategories, getSearchablePosts } from "../../lib/posts";
import { absoluteUrl } from "../../lib/site";

const description = "Catatan, pemikiran, dan perjalanan tentang produk, teknologi, dan kehidupan.";

export const metadata: Metadata = {
  title: "Semua Tulisan",
  description,
  alternates: { canonical: absoluteUrl("/posts") },
};

export default function PostsPage() {
  const posts = getSearchablePosts();
  const categories = getAllCategories();

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-12">
      <header className="flex flex-col gap-6 text-center">
        <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-neu-fg">Semua Tulisan</h1>
        <p className="text-neu-muted text-lg max-w-2xl mx-auto">{description}</p>
      </header>

      <PostsExplorer posts={posts} categories={categories} />
    </div>
  );
}
