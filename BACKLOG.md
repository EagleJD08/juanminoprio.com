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
- [x] Add Schwab Dashboard to Portfolio Grid — components exist at `src/components/schwab/`, need content collection entry + portfolio card (2026-04-03)
- [ ] "Case Study Mode" toggle on data dashboards — add a toggle that switches between "Data View" (charts/numbers) and "Strategy View" (guided narrative with annotations, strategic insights, and "what I would do" commentary overlaid on the same charts). Start with Apple Revenue Dashboard. Shows hiring managers how Juan thinks, not just what he built.
- [x] "Results I've Driven" metrics banner — animated counter section surfacing 4-5 key metrics (10.2M impressions, 42% faster turnaround, 3 interactive projects shipped, etc.). Position between About and Resume. Numbers-first credibility for finance hiring managers. (2026-04-03)
- [ ] "How I Built This" collapsible process sections on portfolio projects — narrative walkthrough of tools used, data sources, analytical approach, design decisions, and lessons learned. Includes "Time to build" and "AI tools used" callouts. Start with Apple + Spending Viz.
- [x] Populate Tools page with real content — curated list of tools Juan uses (AI, marketing stack, productivity), positioned as practitioner credibility (2026-04-03)
- [ ] SEO metadata + Open Graph improvements — unique OG images per page, structured data, sitemap

### P1 — This Month
- [ ] Skills Radar / T-Shape Competency Map — interactive spider/radar chart (React + Recharts) mapping Juan's T-shaped expertise. Vertical axis: Consumer Psychology (deep). Horizontal arms: AI for Marketing, MarTech, Data Storytelling, Product Marketing, Lifecycle Marketing, Content Production, Financial Literacy. Each node is clickable and expands to show evidence (project link, metric, or LinkedIn post). Gives recruiters an instant "does this person match our JD?" answer in one visual.
- [ ] Edge Social Proof API — Cloudflare Worker + D1 endpoint (`/api/stats`) that surfaces live site metrics: quiz completion count + most common result, portfolio project view counts. Lightweight React widget on portfolio grid cards shows real numbers (e.g., "427 people have taken this quiz"). Uses `navigator.sendBeacon` for zero LCP impact. Demonstrates full-stack edge data instrumentation.
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
- [x] Add Schwab Dashboard to Portfolio Grid — content entry + SVG thumbnail added (2026-04-03)
- [x] "Results I've Driven" metrics banner — 4 metrics, animated counters, between About and Resume (2026-04-03)
- [x] Populate Tools page with real content — 5 categories, 23 tools, bilingual (2026-04-03)
