import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'extracted_content');

export type PostData = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  readingTime: string;
  contentHtml?: string;
  draft: boolean;
};

// Generate excerpt from content if not explicitly provided
function generateExcerpt(content: string, length = 160) {
  if (!content) return '';
  // Strip markdown formatting for excerpt
  const plainText = content
    .replace(/#+\s/g, '') // Remove headings
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/[*_~`]/g, '') // Remove bold, italic, code
    .replace(/\n+/g, ' ') // Replace newlines with space
    .trim();
  
  if (plainText.length <= length) return plainText;
  return plainText.substring(0, length).trim() + '...';
}

export function getSortedPostsData(): PostData[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md') && file !== '_index.md');
  
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    return {
      slug,
      title: matterResult.data.title || 'Untitled',
      date: matterResult.data.date ? new Date(matterResult.data.date).toISOString().split('T')[0] : '',
      excerpt: matterResult.data.excerpt || generateExcerpt(matterResult.content),
      categories: matterResult.data.categories || [],
      tags: matterResult.data.tags || [],
      readingTime: readingTime(matterResult.content).text,
      draft: matterResult.data.draft || false,
    };
  });
  
  // Sort posts by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  
  // Modern parsing pipeline with unified
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(matterResult.content);
    
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: matterResult.data.title || 'Untitled',
    date: matterResult.data.date ? new Date(matterResult.data.date).toISOString().split('T')[0] : '',
    excerpt: matterResult.data.excerpt || generateExcerpt(matterResult.content),
    categories: matterResult.data.categories || [],
    tags: matterResult.data.tags || [],
    readingTime: readingTime(matterResult.content).text,
    draft: matterResult.data.draft || false,
    contentHtml,
  };
}

export function getAdjacentPosts(slug: string) {
  const sortedPosts = getSortedPostsData();
  const currentIndex = sortedPosts.findIndex((post) => post.slug === slug);
  
  if (currentIndex === -1) return { prev: null, next: null };
  
  // Array is sorted descending (newest first)
  // So next chronologically is index - 1, prev is index + 1
  const prev = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  
  return { prev, next };
}
