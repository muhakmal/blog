// Shared site constants. BASE_PATH must match `basePath` in next.config.ts.
export const BASE_PATH = "/blog";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || `https://muhakmal.github.io${BASE_PATH}`
).replace(/\/$/, "");

export const SITE_NAME = "muhakmal.";
export const SITE_DESCRIPTION =
  "CV & Blog of Muhamad Akmal, Product Manager & Life Connoisseur.";

// Dates in front matter are written in local (WIB) time.
export const SITE_TIME_ZONE = "Asia/Jakarta";

// Absolute URL for a page inside the app, e.g. absoluteUrl("/posts") -> ".../posts/".
// Pages end with a slash (trailingSlash: true); files with an extension do not.
export function absoluteUrl(path = "/") {
  const withSlash = path.endsWith("/") || /\.[a-z0-9]+$/i.test(path) ? path : `${path}/`;
  return `${SITE_URL}${withSlash}`;
}

// URL for a static file in /public, which next/link does not prefix.
export function assetPath(path: string) {
  return `${BASE_PATH}${path}`;
}

// Absolute URL for an asset path that already includes BASE_PATH ("/blog/media/x.png").
// External URLs are returned unchanged.
export function absoluteAssetUrl(src: string) {
  if (/^([a-z]+:)?\/\//i.test(src)) return src;
  return `${SITE_URL}${src.startsWith(BASE_PATH) ? src.slice(BASE_PATH.length) : src}`;
}

// "YYYY-MM-DD" -> "12 Mar 2021". The ISO date is already in local time, so format it as UTC.
export function formatDate(iso: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

// URL-safe slug for tags and categories: "Product Development" -> "product-development".
export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Open Graph fields for a simple page, so shares show its own title and URL (not the home page's).
export function pageOpenGraph(title: string, description: string, path: string) {
  return {
    title,
    description,
    url: absoluteUrl(path),
    siteName: SITE_NAME,
    locale: "id_ID",
    type: "website" as const,
    images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: SITE_NAME }],
  };
}
