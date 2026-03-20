## Context

The site is built with Astro 5.17 + React 19 + Tailwind CSS 4 + Framer Motion. Astro automatically serves `src/pages/404.astro` for any unmatched route with the correct HTTP 404 status code. The existing `BaseLayout` component wraps all pages and includes `Navbar` and `Footer`. The site uses a consistent design system (Navy/Cream palette, Plus Jakarta Sans + Inter typography) and Framer Motion entrance animations (fade-up, scale-in patterns).

No custom 404 page exists today — visitors hitting bad URLs get a generic browser error.

## Goals / Non-Goals

**Goals:**
- Serve a branded, on-theme 404 page for all unmatched routes
- Provide a clear path back to homepage
- Match existing motion and design language
- Zero maintenance — inherits layout changes automatically

**Non-Goals:**
- Search or sitemap suggestions on the 404 page (unnecessary complexity for a small site)
- Analytics tracking on 404 hits (can be added later via Netlify)
- Dynamic "you might be looking for" content
- Custom error pages for other HTTP status codes (500, etc.)

## Decisions

**1. Pure Astro component (no React island)**
The 404 page is entirely static — no interactivity beyond the CTA link. Using a `.astro` file with inline Framer Motion via a small React island only for the animation wrapper keeps the page lightweight. Alternative: CSS-only animation would avoid React entirely, but Framer Motion is already loaded site-wide and maintains consistency.

**2. Use BaseLayout wrapper**
Wrapping in `BaseLayout` gives Navbar + Footer for free and ensures meta tags, fonts, and global styles are inherited. Alternative: A standalone page would be lighter but would drift from the site's look over time.

**3. Centered single-column layout**
A vertically and horizontally centered content block with heading, subtext, and CTA button. This is the simplest, most effective pattern for error pages — no sidebar, no grid, no distractions.

**4. Framer Motion fade-up entrance**
Reuse the same fade-up animation pattern used on the homepage Hero and About sections. Keeps motion language consistent without introducing new animation patterns.

## Risks / Trade-offs

- **Framer Motion bundle on a static page** → Acceptable because it's already in the site's bundle; no incremental cost.
- **BaseLayout changes could break 404 styling** → Mitigated by using the same layout as every other page; if it breaks here, it breaks everywhere.
