import { getPostData, getSortedPostsData } from "../../lib/posts";
import { BASE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "../../lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);
}

// Feed readers show the HTML outside the site: make site-relative links and images absolute.
function absolutizeHtml(html: string, postUrl: string) {
  return html
    .replace(new RegExp(`(src|href)="${BASE_PATH}/`, "g"), `$1="${SITE_URL}/`)
    .replace(/href="#/g, `href="${postUrl}#`);
}

function cdata(value: string) {
  return `<![CDATA[${value.replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;
}

export async function GET() {
  const posts = getSortedPostsData();
  const items = await Promise.all(
    posts.map(async (post) => {
      const url = absoluteUrl(`/${post.slug}`);
      const full = await getPostData(post.slug);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : ""}
      <description>${escapeXml(post.excerpt)}</description>
      ${full ? `<content:encoded>${cdata(absolutizeHtml(full.contentHtml, url))}</content:encoded>` : ""}
${post.categories.map((c) => `      <category>${escapeXml(c)}</category>`).join("\n")}
    </item>`;
    })
  );

  const lastBuildDate = posts.map((post) => post.updated || post.date).sort().at(-1);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${absoluteUrl("/")}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>id</language>
    ${lastBuildDate ? `<lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>` : ""}
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
