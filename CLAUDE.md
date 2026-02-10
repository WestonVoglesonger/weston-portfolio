# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build (also validates all MDX frontmatter)
npm run lint         # ESLint (next/core-web-vitals + next/typescript)
npm run typecheck    # tsc --noEmit
npm run test:e2e     # Playwright end-to-end tests
```

There is no unit test runner. The build itself is the primary validation — it statically generates all pages including MDX content, so a successful `npm run build` confirms frontmatter schemas pass and pages render.

## Architecture

Next.js 15 App Router site deployed on Vercel. Tailwind CSS v4 + shadcn/ui primitives (`components/ui/`). Dark mode via `next-themes` (class strategy).

### Content system (MDX)

Two content types live under `content/` and follow the same pattern:

- **Projects** (`content/projects/*.mdx`) — loaded by `lib/projects.ts`
- **Writings** (`content/writings/{category}/*.mdx`) — loaded by `lib/writings.ts`, categories: `essays`, `operating-notes`, `manifestos`, `memos`

Both use `gray-matter` for frontmatter parsing, `zod` for validation (`ProjectFrontmatterSchema` / `WritingFrontmatterSchema`), and `next-mdx-remote/rsc` for server-side MDX compilation (`lib/mdx.ts`). Remark plugins: GFM, smartypants. Rehype plugins: slug, autolink-headings.

**Adding a project:** Create `content/projects/{slug}.mdx` with frontmatter matching `ProjectFrontmatterSchema` in `lib/projects.ts`. The slug field must match the filename. Projects auto-appear on `/projects` and the homepage (first 4 by date descending). Cover images go in `public/assets/projects/{slug}/`.

**Adding a writing:** Create `content/writings/{category}/{slug}.mdx` with frontmatter matching `WritingFrontmatterSchema`.

### Routing

Static pages: `app/page.tsx` (home), `app/about/page.tsx`, `app/experience/page.tsx`, `app/contact/page.tsx`, `app/resume/page.tsx`.

Dynamic: `app/projects/[slug]/page.tsx` (uses `generateStaticParams`), `app/writings/[slug]/page.tsx`.

Listing pages with tag filtering: `app/projects/page.tsx`, `app/writings/page.tsx`.

### Styling

Global CSS vars defined in `app/globals.css` (light/dark tokens for `--background`, `--foreground`, `--muted`, `--card`, `--border`, `--accent`). Custom utility classes: `.shadow-soft`, `.bg-grid`, `.card-hover`, `.fade-in-up`. Prose styles are tuned globally in `globals.css`, not via Tailwind typography config.

### Key components

- `ProjectCard` — 3D tilt effect on hover, accent color from frontmatter, links to `/projects/{slug}`
- `ProjectCardGrid` — grid wrapper for project cards
- `TagsFilter` — client component for tag-based filtering on listing pages
- `SiteHeader` / `SiteFooter` — persistent layout shell
- `ImageGallery` — lightbox gallery (currently hardcoded for NEXUS project in the slug page)

### SEO

`lib/seo.ts` exports `site` config and `baseMetadata()` helper. Analytics via `next-plausible`.
