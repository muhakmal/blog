import Link from "next/link";
import { ViewTransition } from "react";
import { ChevronRight, Clock } from "lucide-react";
import type { PostSummary } from "../lib/posts";
import { formatDate } from "../lib/site";

type PostCardProps = {
  post: PostSummary;
  headingLevel?: "h2" | "h3";
};

export default function PostCard({ post, headingLevel: Heading = "h3" }: PostCardProps) {
  return (
    <Link
      href={`/${post.slug}`}
      className="reveal group flex flex-col p-6 md:p-8 rounded-neu bg-neu-bg border border-neu-edge shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover active:translate-y-0.5 active:shadow-neu-inset-sm motion-reduce:hover:translate-y-0 transition-all duration-300"
    >
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <time dateTime={post.date} className="text-xs font-bold text-neu-accent tracking-wide">
          {formatDate(post.date)}
        </time>
        <span className="flex items-center gap-1 text-xs font-medium text-neu-muted">
          <Clock className="w-3 h-3" aria-hidden />
          {post.readingTime}
        </span>
        {post.categories.length > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-neu-bg shadow-neu-inset-sm text-xs font-medium text-neu-muted">
            {post.categories[0]}
          </span>
        )}
        {post.draft && (
          <span className="px-2 py-0.5 rounded-full bg-neu-accent text-neu-on-accent text-xs font-bold">Draft</span>
        )}
      </div>

      <ViewTransition name={`post-title-${post.slug}`}>
        <Heading className="font-display font-bold text-xl md:text-2xl text-neu-fg group-hover:text-neu-accent transition-colors mb-3 line-clamp-2">
          {post.title}
        </Heading>
      </ViewTransition>

      {post.excerpt && <p className="text-neu-muted text-sm line-clamp-3 mb-6 flex-grow">{post.excerpt}</p>}

      <span className="flex items-center text-sm font-bold text-neu-accent mt-auto group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0 transition-transform">
        Baca selengkapnya <ChevronRight className="w-4 h-4 ml-1" aria-hidden />
      </span>
    </Link>
  );
}
