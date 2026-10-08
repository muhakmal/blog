import Link from "next/link";
import { Fragment, ViewTransition } from "react";
import { ChevronRight, Clock } from "lucide-react";
import type { PostSummary } from "../lib/posts";
import { formatDate } from "../lib/site";

type PostCardProps = {
  post: PostSummary;
  headingLevel?: "h2" | "h3";
  // Search terms to mark in the title and excerpt.
  highlight?: string[];
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, terms }: { text: string; terms?: string[] }) {
  const usable = terms?.filter((term) => term.length > 1);
  if (!usable?.length) return <>{text}</>;
  const pattern = new RegExp(`(${usable.map(escapeRegExp).join("|")})`, "gi");
  return (
    <>
      {text.split(pattern).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="bg-neu-accent/20 text-inherit rounded px-0.5">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

export default function PostCard({ post, headingLevel: Heading = "h3", highlight }: PostCardProps) {
  return (
    <Link
      href={`/${post.slug}`}
      className="reveal group flex flex-col p-6 md:p-8 rounded-neu bg-neu-bg border border-neu-edge shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover active:translate-y-0.5 active:shadow-neu-inset-sm motion-reduce:hover:translate-y-0 transition-all duration-300"
    >
      {post.cover && (
        // Static export: next/image optimisation is unavailable, so a plain lazy <img> is used.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="mb-5 aspect-[1200/630] w-full object-cover rounded-neu-sm shadow-neu-inset-sm"
        />
      )}
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
          <Highlight text={post.title} terms={highlight} />
        </Heading>
      </ViewTransition>

      {post.excerpt && (
        <p className="text-neu-muted text-sm line-clamp-3 mb-6 flex-grow">
          <Highlight text={post.excerpt} terms={highlight} />
        </p>
      )}

      <span className="flex items-center text-sm font-bold text-neu-accent mt-auto group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0 transition-transform">
        Baca selengkapnya <ChevronRight className="w-4 h-4 ml-1" aria-hidden />
      </span>
    </Link>
  );
}
