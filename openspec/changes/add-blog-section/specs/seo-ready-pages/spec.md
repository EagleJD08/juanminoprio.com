## ADDED Requirements

### Requirement: Unique page title per post
Each blog post page MUST set an HTML `<title>` in the format `[Post Title] -- Juan Minoprio`. The blog index page MUST have the title `Blog -- Juan Minoprio`.

#### Scenario: Post page title tag
- **WHEN** a visitor views a blog post titled "How AI Changes Marketing"
- **THEN** the HTML `<title>` SHALL be "How AI Changes Marketing -- Juan Minoprio"

#### Scenario: Blog index title tag
- **WHEN** a visitor views the `/blog` page
- **THEN** the HTML `<title>` SHALL be "Blog -- Juan Minoprio"

### Requirement: Meta description per post
Each blog post page MUST include a `<meta name="description">` tag using the post's `description` frontmatter field. The blog index page MUST have a static meta description.

#### Scenario: Post meta description
- **WHEN** a search engine crawls a blog post with description "A deep dive into AI-driven marketing strategies"
- **THEN** the `<meta name="description">` content SHALL be "A deep dive into AI-driven marketing strategies"

### Requirement: Open Graph tags per post
Each blog post page MUST include Open Graph meta tags: `og:title` (post title), `og:description` (post description), `og:type` ("article"), `og:url` (canonical post URL), and `og:image` (cover image if present, fallback to site default).

#### Scenario: Post shared on social media
- **WHEN** a blog post URL is shared on LinkedIn or Twitter
- **THEN** the social platform SHALL display the post title, description, and image from the OG tags

#### Scenario: Post without cover image shared
- **WHEN** a blog post without a `coverImage` is shared on social media
- **THEN** the `og:image` tag SHALL fall back to the site's default OG image (`/images/og-image.png`)

### Requirement: Canonical URL per post
Each blog post page MUST include a `<link rel="canonical">` tag pointing to the full post URL (`https://juanminoprio.com/blog/[slug]`).

#### Scenario: Canonical URL rendering
- **WHEN** a search engine indexes a blog post at `/blog/marketing-fundamentals`
- **THEN** the canonical link SHALL be `https://juanminoprio.com/blog/marketing-fundamentals`

### Requirement: RSS feed auto-discovery
The blog index page and all blog post pages MUST include a `<link rel="alternate" type="application/rss+xml">` tag pointing to `/rss.xml` so browsers and feed readers can auto-discover the feed.

#### Scenario: Browser feed discovery
- **WHEN** a visitor views any blog page in a browser that supports feed auto-discovery
- **THEN** the browser SHALL detect and offer the RSS feed for subscription
