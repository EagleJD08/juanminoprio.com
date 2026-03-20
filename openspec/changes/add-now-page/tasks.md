## 1. Content Collection Setup

- [ ] 1.1 Create `src/content/now/` directory
- [ ] 1.2 Create `src/content/now/current.md` with frontmatter (`lastUpdated` date) and placeholder content for each category (Currently Doing, Learning, Building, Reading, Exploring)
- [ ] 1.3 Add the `now` collection to `src/content.config.ts` with a Zod schema validating the `lastUpdated` field as a date string

## 2. Page Component

- [ ] 2.1 Create `src/pages/now.astro` using `BaseLayout` wrapper with title "Now — Juan Minoprio" and descriptive meta description
- [ ] 2.2 Import and render `Navbar` and `Footer` components in the page
- [ ] 2.3 Query the `now` content collection and render the `lastUpdated` date in a human-readable format (e.g., "March 2026")
- [ ] 2.4 Render the markdown body content with styled category sections (heading + item list per category)
- [ ] 2.5 Style the page using existing design tokens: Navy/Cream palette, Plus Jakarta Sans headings, Inter body text, consistent spacing with other pages

## 3. Animation

- [ ] 3.1 Add a Framer Motion fade-up entrance animation on the page hero (title + last-updated indicator)
- [ ] 3.2 Add staggered fade-up animation on each category section, consistent with homepage motion patterns

## 4. Navbar Update

- [ ] 4.1 Add `{ label: "Now", href: "/now" }` to the `navLinks` array in `src/components/Navbar.astro`, positioned first in the list
- [ ] 4.2 Update existing anchor links (`#about`, `#resume`, `#tools`, `#contact`) to use full paths (`/#about`, `/#resume`, `/#tools`, `/#contact`) so they resolve correctly from non-homepage routes

## 5. Verification

- [ ] 5.1 Run `npm run build` and confirm no build errors
- [ ] 5.2 Navigate to `/now` and confirm the page renders with Navbar, content sections, last-updated date, and Footer
- [ ] 5.3 Confirm entrance animations play correctly with staggered category sections
- [ ] 5.4 Confirm the "Now" link appears in both desktop and mobile Navbar menus
- [ ] 5.5 Click Navbar anchor links (About, Resume, Tools, Contact) from the /now page and confirm they navigate to the correct homepage sections
- [ ] 5.6 Edit `src/content/now/current.md`, rebuild, and confirm changes appear on the /now page without modifying any component code
- [ ] 5.7 Test responsive layout at mobile, tablet, and desktop viewports
