// Reports broken images and internal links in the posts.
//
//   node scripts/check-content.mjs              local files + internal links
//   node scripts/check-content.mjs --external   also request every external image
//   node scripts/check-content.mjs --strict     exit 1 when anything is broken (default: warn only)
//
// On GitHub Actions the problems show up as warning annotations on the file.
import fs from "node:fs";
import path from "node:path";
import { BASE_PATH, ROOT, findImages, isExternal, localFileFor, readPosts } from "./content-images.mjs";

const args = new Set(process.argv.slice(2));
const checkExternal = args.has("--external");
const strict = args.has("--strict");
const inActions = Boolean(process.env.GITHUB_ACTIONS);

const posts = readPosts();
const published = posts.filter((post) => post.data.draft !== true);
const slugs = new Set(posts.map((post) => post.slug));
const problems = [];

function report(post, message) {
  problems.push({ post, message });
}

async function isReachable(url) {
  const target = url.startsWith("//") ? `https:${url}` : url;
  try {
    const response = await fetch(target, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
      headers: { "User-Agent": "Mozilla/5.0 (content check)" },
    });
    response.body?.cancel();
    return response.ok ? null : `HTTP ${response.status}`;
  } catch (error) {
    return error.name === "TimeoutError" ? "timeout" : "tidak bisa dijangkau";
  }
}

const externalChecks = [];

for (const post of published) {
  for (const src of findImages(post.content)) {
    if (isExternal(src)) {
      if (checkExternal && !src.startsWith("data:")) {
        externalChecks.push(isReachable(src).then((error) => error && report(post, `gambar eksternal ${error}: ${src}`)));
      }
      continue;
    }
    const file = localFileFor(src, post.slug);
    if (!fs.existsSync(file)) report(post, `gambar tidak ada: ${src} (dicari di ${path.relative(ROOT, file)})`);
  }

  // Links to other posts, e.g. (/blog/some-slug) or (/some-slug/), must point at a real post.
  for (const match of post.content.matchAll(/\]\((\/[^)\s#?]*)[^)]*\)/g)) {
    const target = match[1].replace(new RegExp(`^${BASE_PATH}`), "").replace(/^\/|\/$/g, "");
    if (!target || target.includes("/") || /\.[a-z0-9]+$/i.test(target)) continue;
    if (!["posts", "cv"].includes(target) && !slugs.has(target)) report(post, `tautan internal mati: ${match[1]}`);
  }
}

await Promise.all(externalChecks);

for (const { post, message } of problems) {
  const file = path.relative(ROOT, post.filePath);
  console.log(inActions ? `::warning file=${file}::${message}` : `${file}: ${message}`);
}

const scope = checkExternal ? "lokal + eksternal" : "lokal";
console.log(`\n${problems.length} masalah ditemukan di ${published.length} tulisan (${scope}).`);
if (strict && problems.length > 0) process.exit(1);
