## ADDED Requirements

### Requirement: Blog post layout
Each blog post SHALL render in a dedicated layout (`BlogPostLayout.astro`) that wraps `BaseLayout`. The layout MUST include: a back-to-blog navigation link, post title, pillar badge, publication date, estimated read time, optional cover image, and the rendered markdown content.

#### Scenario: Full post page render
- **WHEN** a visitor navigates to `/blog/[slug]`
- **THEN** the page SHALL display the post title as an `<h1>`, a pillar badge with the correct pillar color, the formatted date, the estimated read time, and the full rendered markdown content

#### Scenario: Post with cover image
- **WHEN** a blog post has a `coverImage` value in frontmatter
- **THEN** the layout SHALL display the image above the content area with lazy loading and a 16:9 aspect ratio container

#### Scenario: Post without cover image
- **WHEN** a blog post does not have a `coverImage` value
- **THEN** the layout SHALL render normally without an image container and without broken markup

### Requirement: Typography optimized for reading
The post content area MUST use Tailwind typography (`prose`) classes consistent with the existing portfolio post layout. Headings SHALL use Plus Jakarta Sans (font-heading), body text SHALL use Inter, and blockquotes SHALL use Lora (font-accent) with italic styling and a terracotta left border.

#### Scenario: Long-form content readability
- **WHEN** a blog post contains 1000+ words with headings, paragraphs, lists, and code blocks
- **THEN** the content SHALL render with consistent vertical rhythm, a max-width of `max-w-3xl`, and comfortable line height (`leading-relaxed`)

### Requirement: Estimated read time
The system SHALL compute an estimated read time for each post based on word count (~200 words per minute), rounded up to the nearest minute. If the author provides `readTime` in frontmatter, that value MUST take precedence.

#### Scenario: Auto-computed read time
- **WHEN** a 1000-word blog post does not specify `readTime` in frontmatter
- **THEN** the displayed read time SHALL be "5 min read"

#### Scenario: Author-provided read time
- **WHEN** a blog post sets `readTime: "3 min read"` in frontmatter
- **THEN** the displayed read time SHALL be "3 min read" regardless of actual word count

### Requirement: Back navigation
The post layout MUST include a "Back to blog" link that navigates to `/blog`. The link SHALL appear above the post title.

#### Scenario: Navigate back to index
- **WHEN** a visitor clicks "Back to blog" on a post page
- **THEN** the browser SHALL navigate to `/blog`

### Requirement: Responsive design
The post layout MUST be fully responsive. On mobile (< 768px), content MUST fill the available width with appropriate padding. On desktop, content MUST be centered with a max-width container.

#### Scenario: Mobile viewport
- **WHEN** the post page is viewed on a 375px-wide viewport
- **THEN** all content SHALL be readable without horizontal scrolling, images SHALL scale to fit, and padding SHALL be at least 1.5rem (px-6)
