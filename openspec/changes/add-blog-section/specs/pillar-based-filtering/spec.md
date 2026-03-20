## ADDED Requirements

### Requirement: Blog index page displays all posts
The `/blog` page SHALL display all published blog posts as cards in reverse-chronological order (newest first). Each card MUST show the post title, description, pillar badge, date, and estimated read time.

#### Scenario: Blog index with multiple posts
- **WHEN** a visitor navigates to `/blog` and there are multiple blog posts
- **THEN** all posts SHALL be displayed as cards sorted by date descending

#### Scenario: Blog index with no posts
- **WHEN** a visitor navigates to `/blog` and there are zero blog posts
- **THEN** the page SHALL display an empty state message indicating posts are coming soon

### Requirement: Pillar filter controls
The blog index page SHALL display filter buttons for each content pillar (How Businesses Work, Marketing, AI) plus an "All" option. The "All" filter MUST be active by default.

#### Scenario: Filter by pillar
- **WHEN** a visitor clicks a pillar filter button (e.g., "Marketing")
- **THEN** only posts with that pillar SHALL be visible and all other posts SHALL be hidden

#### Scenario: Clear filter
- **WHEN** a visitor clicks the "All" filter button
- **THEN** all posts SHALL be visible regardless of pillar

#### Scenario: Active filter visual state
- **WHEN** a pillar filter is active
- **THEN** the active filter button SHALL have a visually distinct style (filled background with pillar color) and inactive buttons SHALL appear muted

### Requirement: Filter state in URL hash
The active filter SHALL be stored in the URL hash (e.g., `/blog#marketing`). The page SHALL read the hash on load and apply the corresponding filter.

#### Scenario: Direct link to filtered view
- **WHEN** a visitor navigates to `/blog#ai`
- **THEN** the page SHALL load with the AI filter active and only AI-pillar posts visible

#### Scenario: No hash in URL
- **WHEN** a visitor navigates to `/blog` without a hash
- **THEN** the "All" filter SHALL be active and all posts SHALL be visible
