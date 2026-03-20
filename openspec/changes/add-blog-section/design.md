## Context

The site is built with Astro 5.17 + React 19 + Tailwind CSS 4 + Framer Motion. It already has a `portfolio` content collection defined in `src/content.config.ts` with a Zod schema, dynamic routes at `src/pages/portfolio/[...slug].astro`, and a `PortfolioGrid.astro` component that renders cards with pillar-based styling. The `BaseLayout` wraps all pages with skip-nav and OG meta, while `Navbar` provides fixed top navigation using anchor links (About, Resume, Tools, Contact). The design system uses Navy (#1A1A1A), Cream (#FAFAFA), Terracotta (#6B4226), Sage (#7A9E7E), and Dusty Blue (#2C4A6E), with Plus Jakarta Sans for headings, Inter for body, and Lora for accents.

The blog section gives Juan's content pillars (How Businesses Work, Marketing, AI) a permanent, SEO-indexable home. The architecture must follow the same patterns already established by the portfolio collection to keep the codebase consistent.

## Goals / Non-Goals

**Goals**
- Reuse the existing content collection pattern so blog authoring is identical to portfolio authoring (write `.md`, commit, deploy)
- Provide a filterable `/blog` index page and individual `/blog/[slug]` post pages
- Add an RSS feed at `/rss.xml` so readers can subscribe
- Integrate the Blog link into the existing Navbar without breaking the current scroll-based navigation
- Match the existing design system exactly — no new colors, fonts, or spacing tokens

**Non-Goals**
- No CMS, admin panel, or draft/publish workflow beyond git — content is managed as markdown files in the repo
- No comments, reactions, or social engagement features on post pages
- No search functionality within the blog (can be added later)
- No pagination on the index page in v1 — reverse-chronological list is sufficient until post count warrants it
- No analytics integration (handled at the Netlify level)
- No image optimization pipeline — cover images use standard `<img>` tags with lazy loading

## Decisions

**D1: Blog collection schema extends the portfolio pattern**
Define a `blog` collection in `src/content.config.ts` alongside the existing `portfolio` collection. The schema adds `readTime` (optional, computed at build if omitted) and `coverImage` (optional string path) to the fields already used by portfolio (`title`, `description`, `date`, `pillar`, `tags`, `featured`). The `pillar` field reuses the same `z.enum(['business', 'marketing', 'ai'])` so pillar styling logic can be shared.

**D2: Pillar filtering is client-side, not route-based**
The `/blog` index page renders all posts statically and uses a small client-side script (vanilla JS, no React island) to show/hide cards based on the active pillar filter. This avoids generating separate `/blog/pillar/business` routes and keeps the build simple. The filter state is stored in the URL hash (`#marketing`) so it survives page refresh and is shareable.

**D3: Navbar gets a conditional Blog link that routes to `/blog`**
The current nav links are anchor-based (`#about`, `#resume`). Blog is a separate page, so its link uses a full path (`/blog`). When the user is on `/blog` or `/blog/[slug]`, the nav shows a "Home" link back to `/` alongside the Blog link. This is handled by checking `Astro.url.pathname` in the Navbar component.

**D4: Post layout is a new Astro layout, not a reuse of BaseLayout**
Create `src/layouts/BlogPostLayout.astro` that wraps `BaseLayout` and adds blog-specific structure: article header (title, metadata bar, cover image), prose-styled content area (reusing the Tailwind typography classes from the portfolio `[...slug].astro`), and a "Back to blog" link. This keeps blog concerns separated from the generic base layout.

**D5: RSS feed uses `@astrojs/rss` as an Astro page endpoint**
Create `src/pages/rss.xml.ts` as a static API endpoint. It imports `@astrojs/rss` and fetches the `blog` collection to generate the feed. This is the standard Astro approach and requires adding `site` to `astro.config.mjs`.

**D6: Read time is computed at build time**
A utility function (`src/lib/read-time.ts`) estimates read time from the markdown body (~200 words/minute). It runs during `getStaticPaths` so the value is baked into the static HTML. If the author provides `readTime` in frontmatter, that value takes precedence.

**D7: Blog post files live in `src/content/blog/`**
Following the same convention as `src/content/portfolio/`. Each post is a single `.md` file named with a slug-friendly filename (e.g., `2026-03-20-how-ai-changes-marketing.md`). No nested folders per post in v1.

## Risks / Trade-offs

**R1: No pagination in v1**
With all posts rendered on the index page, performance degrades if post count exceeds ~50. Acceptable for launch since Juan will have <10 posts. Pagination can be added later with Astro's `paginate()` function without changing the URL structure.

**R2: Client-side filtering means all post cards are in the initial HTML**
Every post card is sent in the HTML payload regardless of filter state. For <50 posts this is negligible (~2-3 KB per card). The alternative (SSR or route-based filtering) adds complexity without benefit at this scale.

**R3: Navbar behavior change**
The current Navbar uses only anchor links and hides on initial load (appears after 100px scroll). On blog pages, the user lands mid-page with no visible nav if this behavior is preserved. The Navbar must be always-visible on blog pages, which means adding a conditional check. Risk of regression on the homepage nav behavior.

**R4: New dependency (`@astrojs/rss`)**
Lightweight, officially maintained by the Astro team. Low risk. Must be added to `package.json` and the RSS integration is not added to `astro.config.mjs` — it's used as a library in the endpoint, not as an Astro integration.

**R5: `site` config required for RSS**
`@astrojs/rss` requires `site` in `astro.config.mjs` to generate absolute URLs. This also affects any future sitemap generation. Setting it to `https://juanminoprio.com` is straightforward but must not break local dev (`astro dev` handles this gracefully).
