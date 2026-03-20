## Context

The site is built with Astro 5.17 + React 19 + Tailwind CSS 4 + Framer Motion. The homepage (`src/pages/index.astro`) is a single-page layout with section anchors (About, Resume, Tools, Contact) — the Navbar links use `#about`, `#resume`, etc. The existing `BaseLayout` wraps all pages with meta tags, fonts, and global styles; individual pages compose `Navbar` and `Footer` themselves. A content collection system is already in use for the portfolio (`src/content/portfolio/`), registered in `src/content.config.ts` with Zod schemas.

No `/now` page exists today. The site tells visitors what Juan has done but not what he's currently focused on.

## Goals / Non-Goals

**Goals:**
- Add a `/now` route that displays Juan's current focus areas (role, learning, building, reading, exploring)
- Make the page discoverable via a "Now" link in the Navbar (desktop + mobile)
- Content is editable by updating a single markdown file — no component changes needed for routine updates
- Display a "last updated" date so visitors can gauge freshness
- Match the site's existing design language (typography, color palette, spacing, motion)

**Non-Goals:**
- Dynamic data fetching (no APIs, no CMS — just a markdown file)
- Automated "last updated" timestamps (manually set in frontmatter is fine)
- RSS or feed integration for the /now page
- Sub-pages or history of past /now snapshots
- New design system tokens, fonts, or animation patterns

## Decisions

**1. Astro content collection for /now data**
Use a content collection (`src/content/now/`) with a single markdown file (`current.md`) containing frontmatter for `lastUpdated` and structured categories. This follows the established pattern from the portfolio collection, keeps content separate from presentation, and makes updates trivial. Alternative: hardcoding content directly in the page component would skip the collection overhead but couples content to code.

**2. Static `.astro` page with minimal React**
The `/now` page is almost entirely static text. Use a `.astro` page file (`src/pages/now.astro`) with Framer Motion only for the entrance animation (matching the homepage pattern). Alternative: a full React page would be unnecessary since there's no interactivity beyond scroll animations.

**3. Use BaseLayout + Navbar + Footer**
Wrap in `BaseLayout` for consistent meta tags and global styles. Import `Navbar` and `Footer` directly in the page, same as `index.astro`. This ensures the page inherits all layout updates automatically. The Navbar is shared but the "Now" link needs to be a full path (`/now`) rather than an anchor, since it's a separate route.

**4. Navbar link uses full path, not anchor**
The existing nav links use anchors (`#about`, `#resume`) because they target sections on the homepage. The /now link must use `/now` as a full route. The Navbar component currently has a hardcoded `navLinks` array — adding `{ label: "Now", href: "/now" }` is the minimal change. Position it first in the list so it's prominent but doesn't disrupt the existing anchor-based flow.

**5. Card-based category layout**
Each focus category (Currently Doing, Learning, Building, Reading, Exploring) renders as a distinct section with an icon, heading, and list of items. Uses the same spacing and typography patterns as the About and Tools sections. Alternative: a simple prose block would be faster to build but less scannable.

**6. Framer Motion staggered fade-up entrance**
Reuse the same fade-up animation pattern from the homepage. Each category card staggers in sequentially. This maintains motion consistency without new animation patterns.

## Risks / Trade-offs

- **Navbar change affects all pages** → Low risk. Adding one link to a hardcoded array is minimal; all existing links remain unchanged. Test on both desktop and mobile menu.
- **Content collection for a single file is overhead** → Acceptable. It follows existing patterns, gives frontmatter validation via Zod, and is extensible if the /now page ever needs structured data.
- **Manual "last updated" date could become stale** → Acceptable for now. The proposal explicitly targets manual updates on a monthly cadence. A stale date is visible and self-correcting (Juan will notice it when he visits the page).
- **Anchor links break when navigating back from /now** → The existing Navbar links use `#about`, `#resume`, etc. When clicked from `/now`, these resolve to `/now#about` (which doesn't exist). The links should be updated to use full paths (`/#about`, `/#resume`) when rendered on non-homepage routes. This is a small but important fix.
