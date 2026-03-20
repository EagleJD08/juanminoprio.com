# Add /now Page

## Why

The site's homepage is a polished snapshot -- resume, tools, portfolio -- but it's static. It tells visitors *what Juan has done*, not *what Juan is doing right now*. That's a missed opportunity for three reasons:

1. **Recruiters and hiring managers care about trajectory.** A /now page signals momentum: active learning, current projects, evolving interests. It separates Juan from candidates with stale portfolios.
2. **It builds trust through transparency.** Public accountability on what you're focused on (studying for FINRA certs, building with AI, shipping side projects) is more compelling than a bullet-point resume.
3. **It gives repeat visitors a reason to come back.** The homepage rarely changes. A periodically updated /now page creates a living presence on the site.

Inspired by [nownownow.com](https://nownownow.com), this is a low-effort, high-signal addition that reinforces Juan's brand as someone who builds in public and stays sharp.

## What Changes

A new standalone page at `/now` that displays what Juan is currently focused on across a few simple categories: current role, what he's learning, what he's building, what he's reading, and what he's exploring. The content is manually updated (not dynamically fetched) -- just a markdown content file that gets edited every few weeks.

The page uses the existing BaseLayout, Navbar, and Footer. It follows the same design language as the rest of the site (typography, colors, spacing). No new design system tokens, no new dependencies.

The navbar gets a "Now" link so the page is discoverable from anywhere on the site.

## Capabilities

### New Capabilities

- **`/now` route**: A new Astro page that renders structured "what I'm up to" content. Visitors can navigate to it directly or from the navbar.
- **Now content collection**: A content collection (or single markdown file) that holds the /now page data -- categories, items, and a "last updated" date. Editing what's on the page means editing one file, not touching component code.
- **Last-updated indicator**: The page displays when it was last updated, so visitors know how current the information is.
- **Navbar link to /now**: The global navbar includes a "Now" link that routes to the new page. Works on both desktop and mobile menus.

### Modified Capabilities

- **Navbar component**: Updated to include the /now link alongside the existing About, Resume, Tools, and Contact links. Since /now is a separate page (not a homepage section), the link uses a full path (`/now`) rather than an anchor (`#now`).
- **Content config**: Extended to register the now content collection (if using a collection rather than a standalone markdown file).

## Impact

- **New files**: ~2-3 (page route, content file, optional component)
- **Modified files**: ~2 (Navbar, content config)
- **Risk**: Low. This is an additive change -- no existing functionality is altered beyond adding a nav link.
- **Performance**: Negligible. One additional static page. No new JS bundles, no API calls.
- **SEO**: Positive. New indexable page with relevant professional keywords. Supports long-tail searches like "Juan Minoprio current projects."
- **Maintenance**: Minimal. The page only needs updating when Juan's focus areas change (roughly monthly).
