// Shared site constants. BASE_PATH must match `basePath` in next.config.ts.
export const BASE_PATH = "/blog";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || `https://muhakmal.github.io${BASE_PATH}`
).replace(/\/$/, "");

export const SITE_NAME = "muhakmal.";
export const SITE_DESCRIPTION =
  "CV & Blog of Muhamad Akmal, Product Manager & Life Connoisseur.";

// Absolute URL for a path inside the app, e.g. absoluteUrl("/posts").
export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path === "/" ? "/" : path}`;
}

// URL for a static file in /public, which next/link does not prefix.
export function assetPath(path: string) {
  return `${BASE_PATH}${path}`;
}

export function formatDate(iso: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
