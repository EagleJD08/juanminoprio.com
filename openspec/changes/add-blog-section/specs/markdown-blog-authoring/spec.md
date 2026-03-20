## ADDED Requirements

### Requirement: Blog content collection schema
The system SHALL define a `blog` content collection in `src/content.config.ts` with a Zod schema that validates frontmatter fields: `title` (string, required), `description` (string, required), `date` (string, required), `pillar` (enum: business | marketing | ai, required), `tags` (array of strings, optional), `featured` (boolean, default false), `coverImage` (string, optional), and `readTime` (string, optional).

#### Scenario: Valid blog post frontmatter
- **WHEN** a markdown file in `src/content/blog/` has all required frontmatter fields with valid types
- **THEN** the build SHALL succeed and the post SHALL be available in the `blog` collection

#### Scenario: Missing required frontmatter field
- **WHEN** a markdown file in `src/content/blog/` is missing a required field (title, description, date, or pillar)
- **THEN** the build SHALL fail with a Zod validation error identifying the missing field

#### Scenario: Invalid pillar value
- **WHEN** a blog post frontmatter sets `pillar` to a value not in the enum (business, marketing, ai)
- **THEN** the build SHALL fail with a validation error

### Requirement: Blog posts stored as markdown files
The system SHALL read blog posts from `src/content/blog/` as markdown files. Each file MUST use a slug-friendly filename (lowercase, hyphens, no spaces). The file's name (without extension) SHALL become the post's URL slug.

#### Scenario: New blog post added
- **WHEN** a new `.md` file is added to `src/content/blog/` with valid frontmatter
- **THEN** the build SHALL generate a static HTML page at `/blog/[filename-without-extension]`

#### Scenario: Blog post with markdown content
- **WHEN** a blog post contains standard markdown (headings, lists, code blocks, links, images, blockquotes)
- **THEN** Astro SHALL render the markdown to semantic HTML with proper heading hierarchy
