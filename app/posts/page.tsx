import { getSortedPostsData } from "../../lib/posts";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";

export default function PostsPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-12">
      <header className="flex flex-col gap-6 text-center">
        <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-neu-fg">
          Writing & Notes
        </h1>
        <p className="text-neu-muted text-lg max-w-2xl mx-auto">
          Thoughts, learnings, and reflections on product management, software development, and life.
        </p>
      </header>

      {/* Simple decorative search bar (static for now) */}
      <div className="relative w-full max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neu-muted">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Search posts (coming soon)..."
          disabled
          className="w-full pl-12 pr-4 py-4 rounded-neu-sm bg-neu-bg shadow-neu-inset-deep focus:outline-none focus:ring-2 focus:ring-neu-accent focus:ring-offset-2 focus:ring-offset-neu-bg text-neu-fg placeholder-neu-muted transition-all duration-300"
        />
      </div>

      <div className="flex flex-col gap-6 mt-8">
        {allPostsData.map((post) => (
          <Link key={post.slug} href={`/${post.slug}`} className="group p-6 md:p-8 rounded-neu bg-neu-bg shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover active:translate-y-0.5 active:shadow-neu-inset-sm transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="text-sm font-bold text-neu-accent mb-2 tracking-wide">{post.date}</div>
              <h2 className="font-display font-bold text-2xl text-neu-fg group-hover:text-neu-accent transition-colors mb-3 line-clamp-2">{post.title}</h2>
              {/* Optional: Add excerpt rendering here if extracted in lib/posts.ts */}
            </div>
            <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-neu-inner shadow-neu-extruded-sm group-hover:shadow-neu-inset group-hover:text-neu-accent transition-all duration-300 self-start md:self-center">
              <ChevronRight className="w-6 h-6" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
