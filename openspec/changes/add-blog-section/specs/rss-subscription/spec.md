## ADDED Requirements

### Requirement: RSS feed endpoint
The system SHALL generate an RSS/Atom feed at `/rss.xml` containing all blog posts. The feed MUST use the `@astrojs/rss` package and include the site URL from `astro.config.mjs`.

#### Scenario: RSS feed content
- **WHEN** a client requests `/rss.xml`
- **THEN** the response SHALL be valid XML with content type `application/xml` containing an entry for every blog post, each with title, description, publication date, and permalink

#### Scenario: New post appears in feed
- **WHEN** a new blog post is added and the site is rebuilt
- **THEN** the RSS feed SHALL include the new post's entry

### Requirement: RSS feed metadata
The feed MUST include channel-level metadata: title ("Juan Minoprio's Blog"), description ("Finance. Marketing. AI. -- Making the complex clear."), and site link (`https://juanminoprio.com`).

#### Scenario: Feed reader subscription
- **WHEN** a user subscribes to `/rss.xml` in a feed reader
- **THEN** the feed reader SHALL display the blog title, description, and all available posts

### Requirement: Site URL configuration
`astro.config.mjs` MUST include a `site` property set to `https://juanminoprio.com` to enable absolute URL generation for the RSS feed.

#### Scenario: Build with site config
- **WHEN** the site is built with the `site` property configured
- **THEN** all RSS feed entry links SHALL use absolute URLs starting with `https://juanminoprio.com`
