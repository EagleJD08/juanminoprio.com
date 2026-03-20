# Add 404 Page

## Why

Every broken link, mistyped URL, or stale bookmark currently dumps visitors into a generic browser error with zero branding and no way back. That is a dead end — they bounce, and we lose a potential connection.

A branded 404 page turns that dead end into a soft landing. It keeps visitors inside the site's visual world, reassures them nothing is broken on their end, and gives them a single clear path back to content that matters. For a personal portfolio where every visit counts, there is no reason to let bad URLs leak people out.

## What Changes

A new `404.astro` page in `src/pages/` that Astro automatically serves for any unmatched route. The page uses the existing `BaseLayout` (which includes `Navbar` and `Footer`), so visitors retain full navigation context. The content area shows a short, friendly message and a prominent call-to-action linking back to the homepage. A subtle Framer Motion entrance animation keeps the page consistent with the motion language used elsewhere on the site.

No changes to existing pages, components, or routing logic. This is purely additive.

## Capabilities

### New Capabilities

- **Branded error experience** — Visitors who hit a bad URL see a page that matches the site's design system (Navy/Cream palette, Plus Jakarta Sans + Inter typography, existing spacing and layout tokens) instead of a blank or browser-default error.
- **Homepage recovery CTA** — A clear, styled button directs lost visitors back to the homepage, minimizing bounce.
- **Animated entrance** — A lightweight Framer Motion fade/slide animation on the content block, consistent with the motion patterns already used across the site.
- **Full navigation context** — Navbar and footer render on the 404 page via `BaseLayout`, so visitors can navigate to any section without needing the back button.

### Modified Capabilities

None. No existing pages, components, or styles are altered.

## Impact

- **Visitor retention** — Eliminates the primary bounce vector for mistyped or outdated URLs.
- **Brand consistency** — Every possible URL on the domain now reflects the site's identity.
- **SEO hygiene** — Astro serves the correct `404` HTTP status code automatically; no risk of soft-404 issues.
- **Maintenance cost** — Near zero. The page is static with no data dependencies. It inherits layout updates automatically from `BaseLayout`.
