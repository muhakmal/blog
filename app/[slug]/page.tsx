import { getPostData, getSortedPostsData } from '../../lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  
  if (!postData) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-16 px-4">
      <Link href="/" className="text-blue-600 hover:underline mb-8 block">&larr; Back to home</Link>
      <h1 className="text-4xl font-bold mb-2">{postData.title}</h1>
      <div className="text-gray-500 mb-8">{postData.date}</div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} className="prose lg:prose-xl" />
    </article>
  );
}
