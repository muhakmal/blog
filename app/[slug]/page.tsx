import { getPostData, getSortedPostsData } from '../../lib/posts';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const postData = await getPostData(params.slug);

  if (!postData) {
    return <div className="max-w-3xl mx-auto py-16 px-6 text-center text-neu-fg font-display">Post not found</div>;
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <Link 
        href="/posts" 
        className="inline-flex items-center gap-2 mb-12 px-6 py-3 rounded-neu-sm bg-neu-bg shadow-neu-extruded-sm hover:-translate-y-1 hover:shadow-neu-extruded hover:text-neu-accent active:translate-y-0.5 active:shadow-neu-inset-sm transition-all duration-300 font-medium text-neu-muted"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Notes
      </Link>
      
      <header className="mb-12 p-8 md:p-12 rounded-neu bg-neu-bg shadow-neu-inset">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-neu-fg mb-4 leading-tight">
          {postData.title}
        </h1>
        <div className="flex items-center gap-4 text-sm font-medium text-neu-muted">
          <time dateTime={postData.date} className="text-neu-accent">{postData.date}</time>
          {/* Add Reading time or Author here if needed */}
        </div>
      </header>

      <div className="p-6 md:p-12 rounded-neu bg-neu-bg shadow-neu-extruded overflow-hidden">
        <div 
          className="prose prose-lg max-w-none prose-p:text-neu-muted prose-headings:text-neu-fg prose-headings:font-display prose-headings:font-bold prose-a:text-neu-accent hover:prose-a:text-neu-accent-light prose-strong:text-neu-fg prose-blockquote:border-neu-accent prose-blockquote:bg-neu-bg prose-blockquote:shadow-neu-inset-sm prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-6 prose-img:rounded-neu-sm prose-img:shadow-neu-extruded" 
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </div>
    </article>
  );
}
