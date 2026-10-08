import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { cache } from 'react';
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
import { BASE_PATH, SITE_TIME_ZONE, SITE_URL, slugify } from './site';
import { normalizeText } from './search';

const postsDirectory = path.join(process.cwd(), 'extracted_content');
const publicDirectory = path.join(process.cwd(), 'public');

// Drafts are visible in `next dev` so they can be previewed, but never exported.
const SHOW_DRAFTS = process.env.NODE_ENV !== 'production';

export type PostSummary = {
  slug: string;
  title: string;
  // Publish date as "YYYY-MM-DD" in local (WIB) time.
  date: string;
  // Last content change, "YYYY-MM-DD": front matter `updated`, else the last git edit.
  updated: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  readingTime: string;
  draft: boolean;
  // URL of the cover image, only set when the file really exists.
  cover: string;
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

export type Taxonomy = { name: string; slug: string; count: number };

type ParsedPost = PostSummary & {
  timestamp: number;
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

function toDate(value: unknown) {
  if (!value) return null;
  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? null : date;
}

// Calendar date in WIB, so a post published at 06:00 WIB is not dated the previous day (UTC).
const localDateFormat = new Intl.DateTimeFormat('en-CA', {
  timeZone: SITE_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function toLocalIsoDate(date: Date | null) {
  return date ? localDateFormat.format(date) : '';
}

function formatReadingTime(content: string) {
  const minutes = Math.max(1, Math.round(readingTime(content).minutes));
  return `${minutes} menit baca`;
}

// Maps a site URL ("/blog/media/x.png") to its file in public/, or null for other URLs.
function publicFileFor(src: string) {
  if (!src.startsWith(`${BASE_PATH}/`)) return null;
  const relative = decodeURI(src.slice(BASE_PATH.length).split(/[?#]/)[0]);
  return path.join(publicDirectory, relative);
}

function isExternal(src: string) {
  return /^([a-z]+:)?\/\//i.test(src) || src.startsWith('data:');
}

// Relative image paths come from the old Hugo page bundles and live in public/media/<slug>/.
function resolveImageSrc(src: string, slug: string) {
  if (isExternal(src) || src.startsWith('/')) return src;
  return `${BASE_PATH}/media/${slug}/${src}`;
}

function localImageExists(src: string) {
  const file = publicFileFor(src);
  return file !== null && fs.existsSync(file);
}

// Cover image: `cover` (CMS field) or the legacy Hugo `image.filename`, if the file exists.
function resolveCover(data: Record<string, unknown>, slug: string) {
  const candidates: string[] = [];
  if (typeof data.cover === 'string' && data.cover.trim()) {
    candidates.push(resolveImageSrc(data.cover.trim(), slug));
  }
  const legacy = (data.image as { filename?: unknown } | null | undefined)?.filename;
  if (typeof legacy === 'string' && legacy.trim()) {
    const name = legacy.trim();
    const names = path.extname(name) ? [name] : ['jpg', 'jpeg', 'png', 'webp'].map((ext) => `${name}.${ext}`);
    candidates.push(...names.map((n) => resolveImageSrc(n, slug)));
  }
  return candidates.find((src) => isExternal(src) || localImageExists(src)) ?? '';
}

// Date of the last commit that modified (not added) the file, "" outside a git checkout.
function gitLastModified(file: string) {
  try {
    const output = execFileSync('git', ['log', '-1', '--diff-filter=M', '--format=%cI', '--', file], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return toDate(output);
  } catch {
    return null;
  }
}

function parsePostFile(fileName: string): ParsedPost {
  const slug = fileName.replace(/\.md$/, '');
  const filePath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const customExcerpt = typeof data.excerpt === 'string' ? data.excerpt.trim() : '';
  const published = toDate(data.date);
  const modified = toDate(data.updated) ?? gitLastModified(filePath);
  const updated = modified && published && modified > published ? modified : published;

  return {
    slug,
    title: data.title || 'Untitled',
    date: toLocalIsoDate(published),
    updated: toLocalIsoDate(updated),
    timestamp: published?.getTime() ?? 0,
    excerpt: customExcerpt || generateExcerpt(content),
    hasCustomExcerpt: Boolean(customExcerpt),
    categories: toStringList(data.categories),
    tags: toStringList(data.tags),
    readingTime: formatReadingTime(content),
    draft: data.draft === true,
    cover: resolveCover(data, slug),
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
    // Newest first by full timestamp; slug keeps same-moment posts in a stable order.
    .sort((a, b) => b.timestamp - a.timestamp || a.slug.localeCompare(b.slug));

  cachedPosts = posts;
  return posts;
}

function toSummary(post: ParsedPost): PostSummary {
  const { slug, title, date, updated, excerpt, categories, tags, readingTime, draft, cover } = post;
  return { slug, title, date, updated, excerpt, categories, tags, readingTime, draft, cover };
}

export function getSortedPostsData(): PostSummary[] {
  return getParsedPosts().map(toSummary);
}

// Summaries plus a compact bag of unique words from the body, for client-side search.
export function getSearchablePosts(): SearchablePost[] {
  return getParsedPosts().map((post) => {
    const words = new Set(
      normalizeText(toPlainText(post.content))
        .split(/[^\p{L}\p{N}]+/u)
        .filter((word) => word.length > 2)
    );
    return { ...toSummary(post), searchText: Array.from(words).join(' ') };
  });
}

// Groups tags or categories by slug, so "QRIS" and "qris" share one page.
function collectTaxonomy(pick: (post: ParsedPost) => string[]): Taxonomy[] {
  const bySlug = new Map<string, Taxonomy>();
  for (const post of getParsedPosts()) {
    const seen = new Set<string>();
    for (const name of pick(post)) {
      const slug = slugify(name);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      const entry = bySlug.get(slug) ?? { name, slug, count: 0 };
      entry.count += 1;
      bySlug.set(slug, entry);
    }
  }
  return Array.from(bySlug.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getAllCategories() {
  return collectTaxonomy((post) => post.categories);
}

export function getAllTags() {
  return collectTaxonomy((post) => post.tags);
}

export function getPostsByCategory(slug: string) {
  return getSortedPostsData().filter((post) => post.categories.some((c) => slugify(c) === slug));
}

export function getPostsByTag(slug: string) {
  return getSortedPostsData().filter((post) => post.tags.some((t) => slugify(t) === slug));
}

// Rewrites image paths (swapping missing local files for a placeholder), marks external
// links, wraps tables and collects h2/h3 for the TOC.
function rehypePostEnhancements({ slug, headings }: { slug: string; headings: Heading[] }) {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName === 'img') {
        const src = resolveImageSrc(String(node.properties.src ?? ''), slug);
        if (!isExternal(src) && !localImageExists(src) && parent && index !== undefined) {
          const alt = String(node.properties.alt ?? '').trim();
          const label = alt ? `Gambar tidak tersedia: ${alt}` : 'Gambar tidak tersedia';
          parent.children[index] = {
            type: 'element',
            tagName: 'span',
            properties: { className: ['image-missing'], role: 'img', ariaLabel: label },
            children: [{ type: 'text', value: label }],
          };
          return SKIP;
        }
        node.properties.src = src;
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

// Cached per build so generateMetadata, the page and the image route share one render.
export const getPostData = cache(async (slug: string): Promise<PostData | null> => {
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
});

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

  const tagSlugs = new Set(current.tags.map(slugify));
  const categorySlugs = new Set(current.categories.map(slugify));
  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      score:
        post.tags.filter((tag) => tagSlugs.has(slugify(tag))).length * 2 +
        post.categories.filter((cat) => categorySlugs.has(slugify(cat))).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}
