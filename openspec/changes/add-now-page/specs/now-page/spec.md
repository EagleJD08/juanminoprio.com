## ADDED Requirements

### Requirement: /now page route and layout
The system SHALL serve a page at the `/now` URL that displays Juan's current focus areas. The page MUST use the `BaseLayout` wrapper and render the site's `Navbar` and `Footer` components. The page MUST use the site's existing design tokens: Navy (#1A1A1A), Cream (#FAFAFA), Terracotta (#6B4226), Plus Jakarta Sans for headings, and Inter for body text.

#### Scenario: Visitor navigates to /now
- **WHEN** a visitor navigates to `/now`
- **THEN** the page renders with Navbar, structured "what I'm up to" content, and Footer using the site's design system

#### Scenario: Page meta tags are set correctly
- **WHEN** the /now page is rendered
- **THEN** the page title is set to a descriptive title (e.g., "Now — Juan Minoprio") and the meta description reflects the page's purpose

### Requirement: Now content collection
The system SHALL use an Astro content collection to store the /now page data in a single markdown file (`src/content/now/current.md`). The content file MUST include frontmatter with a `lastUpdated` date field and category sections in the markdown body. The content collection MUST be registered in `src/content.config.ts` with a Zod schema validating the `lastUpdated` field.

#### Scenario: Content renders from markdown file
- **WHEN** the /now page loads
- **THEN** the page content is sourced from the `now` content collection, not hardcoded in the page component

#### Scenario: Content file is updated
- **WHEN** a developer edits `src/content/now/current.md` and rebuilds the site
- **THEN** the /now page reflects the updated content without any component code changes

### Requirement: Last-updated indicator
The /now page SHALL display the `lastUpdated` date from the content file's frontmatter. The date MUST be displayed in a human-readable format (e.g., "March 2026") and be visually distinct from body text.

#### Scenario: Last-updated date is visible
- **WHEN** the /now page is displayed
- **THEN** the last-updated date from frontmatter is rendered near the top of the page in a human-readable format

### Requirement: Category sections
The /now page content SHALL be organized into distinct category sections (e.g., Currently Doing, Learning, Building, Reading, Exploring). Each category section MUST display a heading and a list of items. Categories MUST be defined in the markdown body so they can be added, removed, or reordered by editing the content file.

#### Scenario: Multiple categories are displayed
- **WHEN** the /now page renders
- **THEN** each category from the markdown content is displayed as a visually distinct section with its heading and items

#### Scenario: A category is removed from the content file
- **WHEN** a developer removes a category section from the markdown file and rebuilds
- **THEN** the /now page no longer displays that category, with no layout breakage

### Requirement: Navbar "Now" link
The site's Navbar component SHALL include a "Now" link that navigates to the `/now` page. The link MUST appear in both the desktop navigation and the mobile menu. The link MUST use a full path (`/now`), not an anchor.

#### Scenario: Desktop navigation includes Now link
- **WHEN** a visitor views any page on the site at desktop viewport
- **THEN** the Navbar displays a "Now" link alongside the existing navigation links

#### Scenario: Mobile menu includes Now link
- **WHEN** a visitor opens the mobile navigation menu
- **THEN** the menu includes a "Now" link that navigates to `/now`

#### Scenario: Clicking Now link from any page
- **WHEN** a visitor clicks the "Now" link from any page on the site
- **THEN** they are navigated to the `/now` page

### Requirement: Navbar anchor links work from /now page
The existing Navbar anchor links (About, Resume, Tools, Contact) SHALL resolve correctly when clicked from the /now page. The links MUST navigate to the homepage sections (e.g., `/#about`) rather than non-existent anchors on the /now page (e.g., `/now#about`).

#### Scenario: Clicking an anchor link from the /now page
- **WHEN** a visitor is on the `/now` page and clicks the "About" link in the Navbar
- **THEN** they are navigated to the homepage About section at `/#about`

### Requirement: Animated entrance
The /now page content SHALL animate in using a Framer Motion fade-up transition consistent with the animation patterns used on the homepage. Category sections SHOULD stagger their entrance sequentially.

#### Scenario: Page loads with animation
- **WHEN** the /now page finishes loading
- **THEN** the page heading and category sections fade in and slide up, with each section staggering after the previous one
