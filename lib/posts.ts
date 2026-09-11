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
import { visit, SKIP } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';
import type { Root, Element } from 'hast';
import { BASE_PATH, SITE_URL } from './site';

const postsDirectory = path.join(process.cwd(), 'extracted_content');

// Drafts are visible in `next dev` so they can be previewed, but never exported.
const SHOW_DRAFTS = process.env.NODE_ENV !== 'production';

export type PostSummary = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  readingTime: string;
  draft: boolean;
};

export type Heading = {
  id: string;
  text: string;
  level: number;
};

export type PostData = PostSummary & {
  contentHtml: string;
  headings: Heading[];
  // True when the excerpt was written by hand (front matter), not generated from the body.
  hasCustomExcerpt: boolean;
};

export type SearchablePost = PostSummary & {
  searchText: string;
};

type ParsedPost = PostSummary & {
  content: string;
  hasCustomExcerpt: boolean;
};

// Strip markdown/HTML down to readable text for excerpts and search.
function toPlainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ') // fenced code
    .replace(/<[^>]+>/g, ' ') // raw HTML
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '') // headings, quotes, lists
    .replace(/[*_~`#>|!]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function generateExcerpt(content: string, length = 160) {
  const plainText = toPlainText(content);
  if (plainText.length <= length) return plainText;
  const cut = plainText.slice(0, length);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : length).trim()}…`;
}

function toStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((v) => String(v ?? '').trim()).filter(Boolean);
}

function toIsoDate(value: unknown) {
  if (!value) return '';
  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
}

function formatReadingTime(content: string) {
  const minutes = Math.max(1, Math.round(readingTime(content).minutes));
  return `${minutes} menit baca`;
}

function parsePostFile(fileName: string): ParsedPost {
  const slug = fileName.replace(/\.md$/, '');
  const fileContents = fs.readFileSync(path.join(postsDirectory, fileName), 'utf8');
  const { data, content } = matter(fileContents);
  const customExcerpt = typeof data.excerpt === 'string' ? data.excerpt.trim() : '';

  return {
    slug,
    title: data.title || 'Untitled',
    date: toIsoDate(data.date),
    excerpt: customExcerpt || generateExcerpt(content),
    hasCustomExcerpt: Boolean(customExcerpt),
    categories: toStringList(data.categories),
    tags: toStringList(data.tags),
    readingTime: formatReadingTime(content),
    draft: data.draft === true,
    content,
  };
}

let cachedPosts: ParsedPost[] | null = null;

function getParsedPosts(): ParsedPost[] {
  if (cachedPosts && !SHOW_DRAFTS) return cachedPosts;
  if (!fs.existsSync(postsDirectory)) return [];

  const posts = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md') && file !== '_index.md')
    .map(parsePostFile)
    .filter((post) => SHOW_DRAFTS || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  cachedPosts = posts;
  return posts;
}

function toSummary(post: ParsedPost): PostSummary {
  const { slug, title, date, excerpt, categories, tags, readingTime, draft } = post;
  return { slug, title, date, excerpt, categories, tags, readingTime, draft };
}

export function getSortedPostsData(): PostSummary[] {
  return getParsedPosts().map(toSummary);
}

// Summaries plus a compact bag of unique words from the body, for client-side search.
export function getSearchablePosts(): SearchablePost[] {
  return getParsedPosts().map((post) => {
    const words = new Set(
      toPlainText(post.content)
        .toLowerCase()
        .split(/[^\p{L}\p{N}]+/u)
        .filter((word) => word.length > 2)
    );
    return { ...toSummary(post), searchText: Array.from(words).join(' ') };
  });
}

export function getAllCategories() {
  const counts = new Map<string, number>();
  for (const post of getParsedPosts()) {
    for (const category of post.categories) {
      counts.set(category, (counts.get(category) ?? 0) + 1);
    }
  }
  return Array.from(counts, ([name, count]) => ({ name, count })).sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  );
}

// Rewrites relative image paths, marks external links, wraps tables and collects h2/h3 for the TOC.
function rehypePostEnhancements({ slug, headings }: { slug: string; headings: Heading[] }) {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName === 'img') {
        const src = String(node.properties.src ?? '');
        if (src && !/^([a-z]+:)?\/\//i.test(src) && !src.startsWith('/') && !src.startsWith('data:')) {
          // Images from the old Hugo page bundles live in public/media/<slug>/.
          node.properties.src = `${BASE_PATH}/media/${slug}/${src}`;
        }
        node.properties.loading = 'lazy';
        node.properties.decoding = 'async';
      }

      if (node.tagName === 'a') {
        const href = String(node.properties.href ?? '');
        if (/^https?:\/\//.test(href) && !href.startsWith(SITE_URL)) {
          node.properties.target = '_blank';
          node.properties.rel = ['noopener', 'noreferrer'];
        }
      }

      if ((node.tagName === 'h2' || node.tagName === 'h3') && node.properties.id) {
        headings.push({
          id: String(node.properties.id),
          text: toString(node).trim(),
          level: node.tagName === 'h2' ? 2 : 3,
        });
      }

      if (node.tagName === 'table' && parent && index !== undefined) {
        parent.children[index] = {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-wrapper'] },
          children: [node],
        };
        return [SKIP, index + 1];
      }
    });
  };
}

export async function getPostData(slug: string): Promise<PostData | null> {
  const post = getParsedPosts().find((p) => p.slug === slug);
  if (!post) return null;

  const headings: Heading[] = [];
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypePostEnhancements, { slug, headings })
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: { className: ['heading-anchor'], ariaHidden: 'true', tabIndex: -1 },
      content: { type: 'text', value: '#' },
    })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(post.content);

  return {
    ...toSummary(post),
    hasCustomExcerpt: post.hasCustomExcerpt,
    contentHtml: processedContent.toString(),
    headings,
  };
}

// Posts are sorted newest first: "newer" is the previous index, "older" the next one.
export function getAdjacentPosts(slug: string) {
  const posts = getSortedPostsData();
  const currentIndex = posts.findIndex((post) => post.slug === slug);
  if (currentIndex === -1) return { newer: null, older: null };

  return {
    newer: currentIndex > 0 ? posts[currentIndex - 1] : null,
    older: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
}

// Posts sharing tags (weighted higher) or categories with the given post.
export function getRelatedPosts(slug: string, limit = 3): PostSummary[] {
  const posts = getSortedPostsData();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return [];

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      score:
        post.tags.filter((tag) => current.tags.includes(tag)).length * 2 +
        post.categories.filter((cat) => current.categories.includes(cat)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}
