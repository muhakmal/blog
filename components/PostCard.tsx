import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { PostData } from "../lib/posts";

export default function PostCard({ post }: { post: PostData }) {
  return (
    <Link 
      href={`/${post.slug}`} 
      className="group flex flex-col p-6 md:p-8 rounded-neu bg-neu-bg shadow-neu-extruded hover:-translate-y-1 hover:shadow-neu-extruded-hover active:translate-y-0.5 active:shadow-neu-inset-sm transition-all duration-300"
    >
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="text-xs font-bold text-neu-accent tracking-wide">{post.date}</div>
        <div className="flex items-center gap-1 text-xs font-medium text-neu-muted">
          <Clock className="w-3 h-3" />
          <span>{post.readingTime}</span>
        </div>
        {post.categories && post.categories.length > 0 && (
          <div className="px-2 py-0.5 rounded-full bg-neu-bg shadow-neu-inset-sm text-xs font-medium text-neu-muted">
            {post.categories[0]}
          </div>
        )}
      </div>
      
      <h3 className="font-display font-bold text-xl md:text-2xl text-neu-fg group-hover:text-neu-accent transition-colors mb-3 line-clamp-2">
        {post.title}
      </h3>
      
      <p className="text-neu-muted text-sm line-clamp-3 mb-6 flex-grow">
        {post.excerpt}
      </p>

      <div className="flex items-center text-sm font-bold text-neu-accent mt-auto group-hover:translate-x-1 transition-transform">
        Baca selengkapnya <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </Link>
  );
}
