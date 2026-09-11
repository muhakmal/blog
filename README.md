# muhakmal. — CV & Blog

Personal resume and blog of Muhamad Akmal, built with Next.js (static export) and served from
GitHub Pages at <https://muhakmal.github.io/blog/>.

## Development

```bash
npm install
npm run dev     # http://localhost:3000/blog
npm run lint
npm run build   # static site in out/
```

Draft posts (`draft: true`) are visible in `npm run dev` with a "Draft" badge, but are not exported.

## Content

- Posts are Markdown files in `extracted_content/` (front matter: `title`, `date`, `draft`, `excerpt`, `categories`, `tags`).
- Images go in `public/media/` and are referenced as `/blog/media/<file>`. Relative image paths in a
  post resolve to `public/media/<post-slug>/<file>`.
- Resume data lives in `data/profile.ts`.

## Admin (CMS)

`/blog/admin/` runs [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (Decap-compatible, config in
`public/admin/config.yml`). It commits straight to `main`, which triggers a redeploy.

Sign in with **Sign In Using Access Token**: create a GitHub
[fine-grained token](https://github.com/settings/personal-access-tokens/new) scoped to
`muhakmal/blog` with **Contents: Read and write**. Locally you can also pick
**Work with Local Repository** (Chrome/Edge) to edit the working copy without a token.

## Deployment

`.github/workflows/deploy.yml` builds and publishes `out/` on every push to `main`.
GitHub Pages must be set to **Settings → Pages → Source: GitHub Actions**.

Outputs include `/blog/feed.xml` (RSS) and `/blog/sitemap.xml`.
