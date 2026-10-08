// Downloads external images used in posts into public/media/<slug>/ and points the post at the
// local copy, so the blog no longer depends on third-party image hosts staying online.
// Images that can't be downloaded keep their original URL.
//
//   node scripts/mirror-images.mjs            mirror and rewrite the posts
//   node scripts/mirror-images.mjs --dry-run  only list what would change
import fs from "node:fs";
import path from "node:path";
import { PUBLIC_DIR, findImages, isExternal, readPosts } from "./content-images.mjs";

const dryRun = process.argv.includes("--dry-run");
const EXTENSIONS = { "image/jpeg": ".jpg", "image/png": ".png", "image/gif": ".gif", "image/webp": ".webp", "image/svg+xml": ".svg" };

async function download(url) {
  const response = await fetch(url.startsWith("//") ? `https:${url}` : url.replace(/^http:/, "https:"), {
    redirect: "follow",
    signal: AbortSignal.timeout(20000),
    headers: { "User-Agent": "Mozilla/5.0 (image mirror)" },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const type = (response.headers.get("content-type") ?? "").split(";")[0].trim();
  if (!type.startsWith("image/")) throw new Error(`bukan gambar (${type || "tanpa content-type"})`);
  return { type, bytes: Buffer.from(await response.arrayBuffer()) };
}

// "https://host/a/b/IMG_7386.jpg?x=1" -> "img_7386.jpg"; falls back to the content type's extension.
function fileNameFor(url, type, taken) {
  const base = decodeURIComponent(new URL(url.startsWith("//") ? `https:${url}` : url).pathname.split("/").pop() || "image");
  const ext = path.extname(base).toLowerCase() || EXTENSIONS[type] || ".img";
  const stem = path.basename(base, path.extname(base)).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "image";
  let name = `${stem}${ext}`;
  for (let i = 2; taken.has(name); i++) name = `${stem}-${i}${ext}`;
  taken.add(name);
  return name;
}

let mirrored = 0;
const failures = [];

for (const post of readPosts()) {
  const urls = [...new Set(findImages(post.content).filter((src) => isExternal(src) && !src.startsWith("data:")))];
  if (urls.length === 0) continue;

  const dir = path.join(PUBLIC_DIR, "media", post.slug);
  const taken = new Set(fs.existsSync(dir) ? fs.readdirSync(dir) : []);
  let raw = post.raw;

  for (const url of urls) {
    try {
      const { type, bytes } = await download(url);
      const name = fileNameFor(url, type, taken);
      if (!dryRun) {
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, name), bytes);
        raw = raw.split(url).join(name);
      }
      mirrored++;
      console.log(`✓ ${post.slug}/${name}  (${Math.round(bytes.length / 1024)} KB)  ← ${url}`);
    } catch (error) {
      failures.push(`${post.file}: ${url} — ${error.cause?.code ?? error.message}`);
    }
  }

  if (!dryRun && raw !== post.raw) fs.writeFileSync(post.filePath, raw);
}

console.log(`\n${mirrored} gambar ${dryRun ? "bisa di-mirror" : "di-mirror"}, ${failures.length} gagal.`);
for (const failure of failures) console.log(`✗ ${failure}`);
