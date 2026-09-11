import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { ArrowLeft, Clock, ChevronLeft, ChevronRight, Folder } from 'lucide-react';
import { getPostData, getSortedPostsData, getAdjacentPosts, getRelatedPosts } from '../../lib/posts';
import { SITE_NAME, absoluteUrl, formatDate } from '../../lib/site';
import { profileData } from '../../data/profile';
import ReadingProgressBar from '../../components/ReadingProgressBar';
import TableOfContents from '../../components/TableOfContents';
import BackToTop from '../../components/BackToTop';
import ArticleEnhancements from '../../components/ArticleEnhancements';
import ShareButtons from '../../components/ShareButtons';
import PostCard from '../../components/PostCard';

// Only slugs from generateStaticParams exist; anything else is a real 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return getSortedPostsData().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const postData = await getPostData(slug);
  if (!postData) return { title: 'Tulisan tidak ditemukan' };

  const url = absoluteUrl(`/${slug}`);
  return {
    title: postData.title,
    description: postData.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      url,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: postData.date,
      authors: [profileData.name],
      tags: postData.tags,
    },
    twitter: {
      card: 'summary',
      title: postData.title,
      description: postData.excerpt,
    },
  };
}

const pillClass =
  'px-4 py-2 rounded-neu-sm bg-neu-bg border border-neu-edge shadow-neu-extruded-sm text-xs font-bold text-neu-muted tracking-wide hover:text-neu-accent hover:shadow-neu-extruded transition-all duration-300';

export default async function Post(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const postData = await getPostData(slug);
  if (!postData) notFound();

  const { newer, older } = getAdjacentPosts(slug);
  const related = getRelatedPosts(slug);
  const url = absoluteUrl(`/${slug}`);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postData.title,
    description: postData.excerpt,
    datePublished: postData.date,
    inLanguage: 'id-ID',
    url,
    mainEntityOfPage: url,
    keywords: postData.tags.join(', '),
    author: { '@type': 'Person', name: profileData.name, url: absoluteUrl('/') },
  };

  return (
    <>
      <ReadingProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12 relative">
        <article className="w-full max-w-3xl mx-auto min-w-0">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 mb-12 px-6 py-3 rounded-neu-sm bg-neu-bg border border-neu-edge shadow-neu-extruded-sm hover:-translate-y-1 hover:shadow-neu-extruded hover:text-neu-accent active:translate-y-0.5 active:shadow-neu-inset-sm motion-reduce:hover:translate-y-0 transition-all duration-300 font-bold text-neu-muted text-sm"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden /> Kembali ke Tulisan
          </Link>

          <header className="mb-12 p-8 md:p-12 rounded-neu bg-neu-bg border border-neu-edge shadow-neu-inset">
            {postData.categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Folder className="w-4 h-4 text-neu-accent" aria-hidden />
                <span className="sr-only">Kategori:</span>
                {postData.categories.map((category, i) => (
                  <span key={category} className="text-xs font-bold tracking-wider uppercase">
                    <Link
                      href={`/posts?kategori=${encodeURIComponent(category)}`}
                      className="text-neu-accent hover:underline underline-offset-4"
                    >
                      {category}
                    </Link>
                    {i < postData.categories.length - 1 && <span className="text-neu-muted">,</span>}
                  </span>
                ))}
              </div>
            )}

            <ViewTransition name={`post-title-${slug}`}>
              <h1 className="font-display font-extrabold text-3xl md:text-5xl text-neu-fg mb-6 leading-tight text-balance">
                {postData.title}
              </h1>
            </ViewTransition>

            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-neu-muted">
              <time dateTime={postData.date} className="font-bold tracking-wide">
                {formatDate(postData.date)}
              </time>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" aria-hidden /> {postData.readingTime}
              </span>
              {postData.draft && (
                <span className="px-2 py-0.5 rounded-full bg-neu-accent text-neu-on-accent text-xs font-bold">
                  Draft (tidak dipublikasikan)
                </span>
              )}
            </div>
          </header>

          <TableOfContents headings={postData.headings} variant="inline" />

          <div className="p-6 md:p-12 rounded-neu bg-neu-bg border border-neu-edge shadow-neu-extruded overflow-hidden">
            {postData.hasCustomExcerpt && (
              <p className="mb-8 p-6 rounded-neu-inner bg-neu-bg shadow-neu-inset-sm text-lg font-medium text-neu-fg italic border-l-4 border-neu-accent leading-relaxed">
                {postData.excerpt}
              </p>
            )}

            <div
              data-article-body
              className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-img:rounded-neu-sm"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
            <ArticleEnhancements />
          </div>

          {postData.tags.length > 0 && (
            <ul aria-label="Tag" className="mt-8 flex flex-wrap gap-3">
              {postData.tags.map((tag) => (
                <li key={tag}>
                  <Link href={`/posts?tag=${encodeURIComponent(tag)}`} className={`inline-block ${pillClass}`}>
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8">
            <ShareButtons title={postData.title} url={url} />
          </div>

          <nav aria-label="Tulisan lainnya" className="mt-16 pt-8 border-t border-neu-muted/20 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {older ? (
              <Link
                href={`/${older.slug}`}
                rel="prev"
                className="group p-6 rounded-neu-sm bg-neu-bg border border-neu-edge shadow-neu-extruded hover:shadow-neu-inset-sm transition-all text-left"
              >
                <span className="text-xs font-bold text-neu-accent mb-2 uppercase tracking-wider flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" aria-hidden /> Lebih lama
                </span>
                <span className="block font-display font-bold text-neu-fg group-hover:text-neu-accent line-clamp-2">
                  {older.title}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            {newer && (
              <Link
                href={`/${newer.slug}`}
                rel="next"
                className="group p-6 rounded-neu-sm bg-neu-bg border border-neu-edge shadow-neu-extruded hover:shadow-neu-inset-sm transition-all text-right"
              >
                <span className="text-xs font-bold text-neu-accent mb-2 uppercase tracking-wider flex items-center justify-end gap-1">
                  Lebih baru <ChevronRight className="w-4 h-4" aria-hidden />
                </span>
                <span className="block font-display font-bold text-neu-fg group-hover:text-neu-accent line-clamp-2">
                  {newer.title}
                </span>
              </Link>
            )}
          </nav>

          {related.length > 0 && (
            <section aria-labelledby="related-heading" className="mt-16">
              <h2 id="related-heading" className="font-display font-bold text-2xl text-neu-fg mb-8">
                Tulisan terkait
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {related.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="w-64 flex-shrink-0 hidden lg:block">
          <TableOfContents headings={postData.headings} />
        </aside>
      </div>
      <BackToTop />
    </>
  );
}
