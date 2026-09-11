import { getPostData, getSortedPostsData, getAdjacentPosts } from '../../lib/posts';
import Link from 'next/link';
import { ArrowLeft, Clock, ChevronLeft, ChevronRight, Folder } from 'lucide-react';
import ReadingProgressBar from '../../components/ReadingProgressBar';
import TableOfContents from '../../components/TableOfContents';
import BackToTop from '../../components/BackToTop';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<import("next").Metadata> {
  const params = await props.params;
  const postData = await getPostData(params.slug);

  if (!postData) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${postData.title} — muhakmal.`,
    description: postData.excerpt,
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      type: "article",
      publishedTime: postData.date,
    }
  };
}

export default async function Post(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const postData = await getPostData(params.slug);
  const { prev, next } = getAdjacentPosts(params.slug);

  if (!postData) {
    return <div className="max-w-3xl mx-auto py-32 px-6 text-center text-neu-fg font-display">Post not found</div>;
  }

  return (
    <>
      <ReadingProgressBar />
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12 relative">
        <article className="w-full max-w-3xl mx-auto flex-shrink-0">
          <Link 
            href="/posts" 
            className="inline-flex items-center gap-2 mb-12 px-6 py-3 rounded-neu-sm bg-neu-bg shadow-neu-extruded-sm hover:-translate-y-1 hover:shadow-neu-extruded hover:text-neu-accent active:translate-y-0.5 active:shadow-neu-inset-sm transition-all duration-300 font-bold text-neu-muted text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Tulisan
          </Link>
          
          <header className="mb-12 p-8 md:p-12 rounded-neu bg-neu-bg shadow-neu-inset">
            {postData.categories && postData.categories.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <Folder className="w-4 h-4 text-neu-accent" />
                <span className="text-xs font-bold tracking-wider uppercase text-neu-accent">
                  {postData.categories.join(', ')}
                </span>
              </div>
            )}
            
            <h1 className="font-display font-extrabold text-3xl md:text-5xl text-neu-fg mb-6 leading-tight">
              {postData.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-neu-muted">
              <time dateTime={postData.date} className="font-bold tracking-wide">{postData.date}</time>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {postData.readingTime}
              </div>
            </div>
          </header>

          <div className="p-6 md:p-12 rounded-neu bg-neu-bg shadow-neu-extruded overflow-hidden">
            {postData.excerpt && (
              <div className="mb-8 p-6 rounded-neu-inner bg-neu-bg shadow-neu-inset-sm text-lg font-medium text-neu-fg italic border-l-4 border-neu-accent leading-relaxed">
                {postData.excerpt}
              </div>
            )}
            
            <div 
              className="prose prose-lg max-w-none prose-p:text-neu-muted prose-headings:text-neu-fg prose-headings:font-display prose-headings:font-bold prose-a:text-neu-accent hover:prose-a:text-neu-accent-light prose-strong:text-neu-fg prose-img:rounded-neu-sm prose-img:shadow-neu-extruded" 
              dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }} 
            />
          </div>

          {/* Tags */}
          {postData.tags && postData.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {postData.tags.map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-neu-sm bg-neu-bg shadow-neu-extruded-sm text-xs font-bold text-neu-muted tracking-wide">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Previous / Next Navigation */}
          <nav className="mt-16 pt-8 border-t border-neu-muted/20 flex flex-col sm:flex-row gap-6 justify-between">
            {next ? (
              <Link href={`/${next.slug}`} className="flex-1 group p-6 rounded-neu-sm bg-neu-bg shadow-neu-extruded hover:shadow-neu-inset-sm transition-all text-left">
                <div className="text-xs font-bold text-neu-accent mb-2 uppercase tracking-wider flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" /> Sebelumnya
                </div>
                <div className="font-display font-bold text-neu-fg group-hover:text-neu-accent line-clamp-2">{next.title}</div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            
            {prev ? (
              <Link href={`/${prev.slug}`} className="flex-1 group p-6 rounded-neu-sm bg-neu-bg shadow-neu-extruded hover:shadow-neu-inset-sm transition-all text-right">
                <div className="text-xs font-bold text-neu-accent mb-2 uppercase tracking-wider flex items-center justify-end gap-1">
                  Selanjutnya <ChevronRight className="w-4 h-4" />
                </div>
                <div className="font-display font-bold text-neu-fg group-hover:text-neu-accent line-clamp-2">{prev.title}</div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </nav>
        </article>

        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden lg:block">
          <TableOfContents />
        </aside>
      </div>
      <BackToTop />
    </>
  );
}
