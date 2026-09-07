import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();
  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Muhakmal Blog</h1>
      <ul>
        {allPostsData.map(({ slug, title, date }) => (
          <li key={slug} className="mb-4">
            <Link href={`/blog/${slug}`} className="text-xl font-semibold text-blue-600 hover:underline">{title}</Link>
            <p className="text-sm text-gray-500">{date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
