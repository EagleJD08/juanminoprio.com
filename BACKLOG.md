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
- [x] Add Schwab Dashboard to Portfolio Grid — content entry + SVG thumbnail added (2026-04-06)
- [ ] "Case Study Mode" toggle on data dashboards — add a toggle that switches between "Data View" (charts/numbers) and "Strategy View" (guided narrative with annotations, strategic insights, and "what I would do" commentary overlaid on the same charts). Start with Apple Revenue Dashboard. Shows hiring managers how Juan thinks, not just what he built.
- [x] "Results I've Driven" metrics banner — animated counter section with 4 key metrics, positioned between About and Resume (2026-04-06)
- [x] "How I Built This" collapsible process sections on portfolio projects — added to Apple + Schwab pages with data sources, approach, AI tools, and lessons learned (2026-04-06)
- [x] Populate Tools page with real content — 20 tools across 4 categories (AI, Marketing & Analytics, Design & Content, Productivity & Dev) (2026-04-06)
- [x] SEO metadata + Open Graph improvements — canonical URLs, structured data (JSON-LD), Twitter cards, absolute OG image URLs, sitemap.xml (2026-04-06)

### P1 — This Month
- [x] Skills Radar / T-Shape Competency Map — interactive Recharts radar with 7 skill axes, clickable nodes expand to evidence panels with project links and metrics (2026-04-06)
- [ ] Edge Social Proof API — Cloudflare Worker + D1 endpoint (`/api/stats`) that surfaces live site metrics: quiz completion count + most common result, portfolio project view counts. Lightweight React widget on portfolio grid cards shows real numbers (e.g., "427 people have taken this quiz"). Uses `navigator.sendBeacon` for zero LCP impact. Demonstrates full-stack edge data instrumentation.
- [ ] Blog/Writing section — content collection for articles, listing page with pillar filtering (Consumer Psych / AI / Business), individual article pages with MDX support
- [ ] "One Chart" data visualization series — 5 standalone interactive charts (React + Recharts), each telling one business story, linkable from LinkedIn posts
- [x] Mobile responsiveness polish — fixed MetricsBanner grid dividers on mobile, added Skills/Portfolio nav links (2026-04-06)
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
- [x] Add Schwab Dashboard to Portfolio Grid — content entry + SVG thumbnail added (2026-04-06)
- [x] "Results I've Driven" metrics banner — animated counter section, 4 metrics, navy background section (2026-04-06)
- [x] "How I Built This" collapsible sections — shared component added to Apple + Schwab project pages (2026-04-06)
- [x] Populate Tools page with real content — expanded from 8 to 20 tools across 4 categories (2026-04-06)
- [x] SEO metadata + Open Graph improvements — canonical, JSON-LD, Twitter cards, sitemap.xml (2026-04-06)
- [x] Skills Radar / T-Shape Competency Map — interactive Recharts radar with clickable evidence panels (2026-04-06)
- [x] Mobile responsiveness polish — MetricsBanner grid fix, Skills/Portfolio nav links added (2026-04-06)
