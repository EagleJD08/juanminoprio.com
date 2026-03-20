# Add Blog Section

## Why

Juan's content strategy rests on three pillars — How Businesses Work, Marketing, and AI — but the site has no place to publish written content. LinkedIn posts drive awareness, but they disappear from feeds within days. A blog on juanminoprio.com gives every piece of long-form content a permanent, SEO-indexable home that Juan owns and controls.

Without a blog, the site is a static portfolio. With one, it becomes a growing body of work that compounds over time: each post reinforces expertise, attracts organic search traffic, and gives Juan something concrete to link back to from social. It also fills the gap between the portfolio (finished projects) and the brand (ongoing thinking).

## What Changes

A new `/blog` section added to the site, consisting of:

- **Blog content collection** — a `src/content/blog/` directory using Astro's content collections (same pattern as the existing `portfolio` collection), with a Zod schema defining frontmatter: title, description, date, pillar, tags, featured flag, and optional cover image.
- **Blog index page** (`/blog`) — displays post cards in reverse-chronological order with filtering by content pillar (How Businesses Work, Marketing, AI). Matches the existing design system and page layout patterns.
- **Individual post pages** (`/blog/[slug]`) — clean reading layout with typography optimized for long-form content. Includes post metadata (date, pillar, tags, estimated read time) and navigation back to the index.
- **RSS feed** (`/rss.xml`) — standard Atom/RSS feed using `@astrojs/rss` so readers and aggregators can subscribe.
- **Navigation update** — "Blog" link added to the site header/nav alongside existing pages.

## Capabilities

### New Capabilities

| Capability | Description |
|---|---|
| Markdown blog authoring | Write posts as `.md` files with typed frontmatter; Astro renders them to static HTML at build time |
| Pillar-based filtering | Visitors can filter posts by content pillar on the index page |
| RSS subscription | Standard RSS feed auto-generated from blog posts |
| Reading experience | Dedicated post layout with proper typographic scale, estimated read time, and responsive design |
| SEO-ready pages | Each post gets its own URL, `<title>`, meta description, and Open Graph tags |

### Modified Capabilities

| Capability | Change |
|---|---|
| Site navigation | Add "Blog" link to the global nav component |
| Content collections config | Extend `src/content/config.ts` (or create it) to register the `blog` collection alongside the existing `portfolio` collection |
| Astro config | Add `@astrojs/rss` integration |

## Impact

- **No breaking changes** — all existing pages (homepage, portfolio, projects) remain untouched.
- **Build time** — increases marginally; Astro's static generation handles hundreds of markdown pages with negligible overhead.
- **New dependency** — `@astrojs/rss` (official Astro package, lightweight).
- **Content workflow** — Juan writes `.md` files in `src/content/blog/`, commits, and Netlify deploys automatically. Same workflow as portfolio entries.
- **Design system** — blog pages reuse existing colors, fonts, spacing, and component patterns. No new design tokens required.
