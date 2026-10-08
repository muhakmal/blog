// Shared helpers for the content scripts: finds image references in the posts.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const ROOT = path.resolve(import.meta.dirname, "..");
export const POSTS_DIR = path.join(ROOT, "extracted_content");
export const PUBLIC_DIR = path.join(ROOT, "public");
export const BASE_PATH = "/blog";

// Markdown images ![alt](src "title") and raw <img src="...">.
const MARKDOWN_IMAGE = /!\[[^\]]*\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g;
const HTML_IMAGE = /<img\b[^>]*\bsrc=["']([^"']+)["']/gi;

export function readPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md") && file !== "_index.md")
    .map((file) => {
      const filePath = path.join(POSTS_DIR, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);
      return { file, filePath, slug: file.replace(/\.md$/, ""), raw, data, content };
    });
}

export function findImages(markdown) {
  const found = [];
  for (const pattern of [MARKDOWN_IMAGE, HTML_IMAGE]) {
    for (const match of markdown.matchAll(pattern)) found.push(match[1]);
  }
  return found;
}

export function isExternal(src) {
  return /^([a-z]+:)?\/\//i.test(src) || src.startsWith("data:");
}

// Same rules as lib/posts.ts: relative paths live in public/media/<slug>/.
export function localFileFor(src, slug) {
  if (isExternal(src)) return null;
  const clean = decodeURI(src.split(/[?#]/)[0]);
  if (!clean.startsWith("/")) return path.join(PUBLIC_DIR, "media", slug, clean);
  if (clean.startsWith(`${BASE_PATH}/`)) return path.join(PUBLIC_DIR, clean.slice(BASE_PATH.length));
  return path.join(PUBLIC_DIR, "__outside_public__", clean); // e.g. a local /Users/... path
}
