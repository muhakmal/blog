import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PostList from "./PostList";
import type { PostSummary } from "../lib/posts";

// Static listing for one tag or category, so each one has its own indexable URL.
export default function TaxonomyPage({ label, name, posts }: { label: string; name: string; posts: PostSummary[] }) {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-12">
      <Link
        href="/posts"
        className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-neu-sm bg-neu-bg border border-neu-edge shadow-neu-extruded-sm hover:-translate-y-1 hover:shadow-neu-extruded hover:text-neu-accent active:translate-y-0.5 active:shadow-neu-inset-sm motion-reduce:hover:translate-y-0 transition-all duration-300 font-bold text-neu-muted text-sm"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden /> Semua tulisan
      </Link>
      <header className="flex flex-col gap-4 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-neu-accent">{label}</p>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-neu-fg">{name}</h1>
        <p className="text-neu-muted">{posts.length} tulisan</p>
      </header>
      <PostList posts={posts} grouped />
    </div>
  );
}
