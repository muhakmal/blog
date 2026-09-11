import PostCard from "./PostCard";
import type { PostSummary } from "../lib/posts";

// Posts grouped under a heading per year (newest first), or a flat grid.
export default function PostList({ posts, grouped }: { posts: PostSummary[]; grouped: boolean }) {
  if (!grouped) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    );
  }

  const byYear = new Map<string, PostSummary[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4) || "Tanpa tanggal";
    byYear.set(year, [...(byYear.get(year) ?? []), post]);
  }

  return (
    <div className="flex flex-col gap-16">
      {Array.from(byYear, ([year, yearPosts]) => (
        <section key={year} aria-labelledby={`year-${year}`} className="flex flex-col gap-8">
          <h2 id={`year-${year}`} className="flex items-center gap-4 font-display font-extrabold text-2xl text-neu-fg">
            {year}
            <span className="text-sm font-bold text-neu-muted">{yearPosts.length} tulisan</span>
            <span aria-hidden className="flex-1 h-px bg-neu-muted/20" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {yearPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
