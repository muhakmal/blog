import type { Metadata } from "next";
import Link from "next/link";
import PostsExplorer from "../../components/PostsExplorer";
import { getAllCategories, getAllTags, getSearchablePosts } from "../../lib/posts";
import { absoluteUrl, pageOpenGraph } from "../../lib/site";

const description = "Catatan, pemikiran, dan perjalanan tentang produk, teknologi, dan kehidupan.";

export const metadata: Metadata = {
  title: "Semua Tulisan",
  description,
  alternates: { canonical: absoluteUrl("/posts") },
  openGraph: pageOpenGraph("Semua Tulisan", description, "/posts"),
};

// The static HTML always lists every post. When the URL carries filters, hide the results
// until PostsExplorer has applied them, so the unfiltered list doesn't flash first.
const pendingFilterScript = `if(/[?&](q|kategori|tag)=/.test(location.search))document.documentElement.dataset.pendingFilter=""`;

export default function PostsPage() {
  const posts = getSearchablePosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-12">
      <script dangerouslySetInnerHTML={{ __html: pendingFilterScript }} />
      <header className="flex flex-col gap-6 text-center">
        <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-neu-fg">Semua Tulisan</h1>
        <p className="text-neu-muted text-lg max-w-2xl mx-auto">{description}</p>
      </header>

      <PostsExplorer posts={posts} categories={categories} />

      <section aria-labelledby="tags-heading" className="flex flex-col gap-6 pt-8 border-t border-neu-muted/20">
        <h2 id="tags-heading" className="font-display font-bold text-2xl text-neu-fg">
          Jelajahi tag
        </h2>
        <ul className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <li key={tag.slug}>
              <Link
                href={`/tag/${tag.slug}`}
                className="inline-block px-3 py-1.5 rounded-neu-sm bg-neu-bg border border-neu-edge shadow-neu-extruded-sm text-xs font-bold text-neu-muted hover:text-neu-accent hover:shadow-neu-extruded transition-all duration-300"
              >
                #{tag.name} <span className="opacity-70">({tag.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
