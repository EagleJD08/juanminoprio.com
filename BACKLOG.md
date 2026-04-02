---
type: reference
status: active
domain: networking
tags: [website, backlog, features]
created: 2026-03-29
updated: 2026-03-29
---

# Website Feature Backlog — juanminoprio.com

Prioritized list for the overnight Website Feature Factory agent. Agent picks the top unchecked item.

## Priority Features

### P0 — Ship This Week
- [x] Add Apple Revenue Dashboard to Portfolio Grid — components exist at `src/components/apple/`, need content collection entry + portfolio card (2026-04-01)
- [ ] Add Schwab Dashboard to Portfolio Grid — components exist at `src/components/schwab/`, need content collection entry + portfolio card
- [ ] "Case Study Mode" toggle on data dashboards — add a toggle that switches between "Data View" (charts/numbers) and "Strategy View" (guided narrative with annotations, strategic insights, and "what I would do" commentary overlaid on the same charts). Start with Apple Revenue Dashboard. Shows hiring managers how Juan thinks, not just what he built.
- [ ] "Results I've Driven" metrics banner — animated counter section surfacing 4-5 key metrics (10.2M impressions, 42% faster turnaround, 3 interactive projects shipped, etc.). Position between About and Resume. Numbers-first credibility for finance hiring managers.
- [ ] "How I Built This" collapsible process sections on portfolio projects — narrative walkthrough of tools used, data sources, analytical approach, design decisions, and lessons learned. Includes "Time to build" and "AI tools used" callouts. Start with Apple + Spending Viz.
- [ ] Populate Tools page with real content — curated list of tools Juan uses (AI, marketing stack, productivity), positioned as practitioner credibility
- [ ] SEO metadata + Open Graph improvements — unique OG images per page, structured data, sitemap

### P1 — This Month
- [ ] Blog/Writing section — content collection for articles, listing page with pillar filtering (Consumer Psych / AI / Business), individual article pages with MDX support
- [ ] "One Chart" data visualization series — 5 standalone interactive charts (React + Recharts), each telling one business story, linkable from LinkedIn posts
- [ ] Mobile responsiveness polish — audit all components on mobile viewports, fix any layout issues
- [ ] Performance optimization pass — lazy load below-fold components, optimize images, minimize JS bundle

### P2 — Next Month
- [ ] "If I Were CMO" spec campaign page — scrollytelling interactive page for a Miami target company (City National Bank)
- [ ] Compound Effect Lab — interactive calculator/simulator page
- [ ] Dark mode toggle — respect system preference, persist choice
- [ ] Reading list / bookshelf page — curated books with mini-reviews, linked to Zettelkasten notes

### Spec Projects Queue (for Spec Project Builder agent)
1. [ ] **Apple Revenue Dashboard** — finish: verify all 9 chapters build, generate placeholder images, add to portfolio grid, test `/apple-revenue` route
2. [ ] **"If I Were CMO" Campaign** — research City National Bank marketing, design full GTM spec campaign as scrollytelling page
3. [ ] **"One Chart" Data Series** — 5 standalone interactive data viz pieces (brand value, marketing spend efficiency, consumer behavior shifts, revenue storytelling, competitive dynamics)
4. [ ] **Schwab Dashboard Polish** — verify 7 existing components, ensure build passes, add to portfolio grid
5. [ ] **Marketing Automation Teardown** — analyze a public company's digital presence and martech stack

## Completed
- [x] Add Apple Revenue Dashboard to Portfolio Grid — content entry + SVG thumbnail added (2026-04-01)
