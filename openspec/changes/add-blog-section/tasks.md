## 1. Content Collection Setup
- [ ] 1.1 Add `blog` collection schema to `src/content.config.ts` with Zod validation for title, description, date, pillar, tags, featured, coverImage, and readTime
- [ ] 1.2 Create `src/content/blog/` directory with a sample post (`hello-world.md`) that exercises all frontmatter fields
- [ ] 1.3 Verify the build passes with the new collection and sample post (`npm run build`)

## 2. Utility Functions
- [ ] 2.1 Create `src/lib/read-time.ts` with a function that takes a markdown body string and returns estimated read time (e.g., "5 min read") at ~200 words/minute, rounded up
- [ ] 2.2 Verify the utility handles edge cases: empty string returns "1 min read", very long content computes correctly

## 3. Blog Post Layout
- [ ] 3.1 Create `src/layouts/BlogPostLayout.astro` wrapping `BaseLayout` with article header (title, pillar badge, date, read time), optional cover image, prose-styled content area, and "Back to blog" link
- [ ] 3.2 Reuse the existing pillar color mapping (business=dusty-blue, marketing=terracotta, ai=sage) from the portfolio pattern
- [ ] 3.3 Add blog-specific OG meta tags (og:type "article", og:url with canonical, og:image with cover or fallback) to the layout head
- [ ] 3.4 Add `<link rel="canonical">` and RSS auto-discovery `<link>` to the layout head

## 4. Blog Pages
- [ ] 4.1 Create `src/pages/blog/index.astro` — blog index page with header, pillar filter buttons, and post card grid in reverse-chronological order
- [ ] 4.2 Implement pillar filter UI using pillar-colored buttons (All, Business, Marketing, AI) with active/inactive states matching the design system
- [ ] 4.3 Add client-side filter script (vanilla JS) that shows/hides cards based on data attributes and syncs with URL hash
- [ ] 4.4 Add empty state for when no posts exist (same pattern as PortfolioGrid)
- [ ] 4.5 Create `src/pages/blog/[...slug].astro` — dynamic post pages using `getStaticPaths`, fetching `blog` collection, computing read time, and rendering with `BlogPostLayout`
- [ ] 4.6 Set page titles: "Blog -- Juan Minoprio" for index, "[Post Title] -- Juan Minoprio" for post pages

## 5. RSS Feed
- [ ] 5.1 Install `@astrojs/rss` package (`npm install @astrojs/rss`)
- [ ] 5.2 Add `site: 'https://juanminoprio.com'` to `astro.config.mjs`
- [ ] 5.3 Create `src/pages/rss.xml.ts` endpoint that generates RSS feed from blog collection with channel title, description, and per-post entries

## 6. Navigation Update
- [ ] 6.1 Add "Blog" link to `src/components/Navbar.astro` nav links array, pointing to `/blog`
- [ ] 6.2 Update Navbar to detect blog pages (`Astro.url.pathname.startsWith('/blog')`) and show always-visible nav (skip the scroll-triggered opacity logic) with a "Home" link back to `/`
- [ ] 6.3 Ensure mobile menu includes the Blog link and functions correctly on blog pages

## 7. Verification
- [ ] 7.1 Run `npm run build` and confirm zero errors
- [ ] 7.2 Run `npm run preview` and verify `/blog` index page renders with filter controls and post cards
- [ ] 7.3 Verify `/blog/hello-world` (sample post) renders with correct title, pillar badge, read time, and styled content
- [ ] 7.4 Verify `/rss.xml` returns valid XML with the sample post entry
- [ ] 7.5 Verify Navbar shows "Blog" link on the homepage and is always-visible on blog pages
- [ ] 7.6 Verify pillar filtering works (click each filter, check cards show/hide, check URL hash updates)
- [ ] 7.7 Verify responsive layout on mobile viewport (375px) for both index and post pages
- [ ] 7.8 Verify OG meta tags and canonical URL on a blog post page (view source)
