## ADDED Requirements

### Requirement: Branded 404 error page
The system SHALL serve a custom-designed 404 page for any URL that does not match a defined route. The page MUST use the site's existing design system (Navy/Cream palette, Plus Jakarta Sans headings, Inter body text) and render within the BaseLayout (Navbar + Footer).

#### Scenario: Visitor hits an undefined URL
- **WHEN** a visitor navigates to a URL that does not match any defined route
- **THEN** the server returns HTTP status 404 and renders the branded 404 page with Navbar, error content, and Footer

#### Scenario: 404 page renders correct design tokens
- **WHEN** the 404 page is displayed
- **THEN** the page uses the site's Navy (#1A1A1A), Cream (#FAFAFA), and Terracotta (#6B4226) colors, Plus Jakarta Sans for headings, and Inter for body text

### Requirement: Homepage recovery call-to-action
The 404 page SHALL display a prominent, styled button that links to the homepage ("/"). The button MUST use the site's existing CTA styling (Terracotta background, cream text).

#### Scenario: Visitor clicks the CTA button
- **WHEN** a visitor clicks the "Back to Home" button on the 404 page
- **THEN** they are navigated to the homepage at "/"

### Requirement: Animated entrance
The 404 page content block SHALL animate in using a Framer Motion fade-up transition consistent with the motion patterns used on the homepage.

#### Scenario: Page loads with animation
- **WHEN** the 404 page finishes loading
- **THEN** the content block (heading, subtext, CTA) fades in and slides up from below

### Requirement: Full navigation context
The 404 page SHALL render the site's Navbar and Footer components so visitors can navigate to any section without using the browser's back button.

#### Scenario: Navigation from 404 page
- **WHEN** the 404 page is displayed
- **THEN** the Navbar with all navigation links and the Footer are visible and functional
