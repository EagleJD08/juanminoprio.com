## 1. Page Setup

- [ ] 1.1 Create `src/pages/404.astro` using `BaseLayout` wrapper with title "Page Not Found" and appropriate meta description
- [ ] 1.2 Verify Astro serves the page with HTTP 404 status for unmatched routes

## 2. Content & Styling

- [ ] 2.1 Build centered content block with heading ("Page not found"), friendly subtext, and homepage CTA button
- [ ] 2.2 Style using existing design tokens: Navy/Cream palette, Plus Jakarta Sans heading, Inter body, Terracotta CTA button

## 3. Animation

- [ ] 3.1 Add a React island with Framer Motion fade-up entrance animation on the content block (consistent with homepage Hero pattern)

## 4. Verification

- [ ] 4.1 Test 404 page renders correctly at a non-existent URL (e.g., /asdfasdf)
- [ ] 4.2 Confirm Navbar and Footer are visible and all navigation links work
- [ ] 4.3 Confirm CTA button navigates to homepage
- [ ] 4.4 Run `npm run build` to verify no build errors
