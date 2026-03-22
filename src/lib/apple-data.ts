// src/lib/apple-data.ts

// ── Types ──────────────────────────────────────────────

export interface RevenueSegment {
  id: string;
  name: string;
  shortName: string;
  amount: number; // billions
  percentOfTotal: number;
  yoyGrowth: number; // percent
  color: string;
  description: string;
}

export interface Product {
  name: string;
  image: string; // path to WebP in /assets/apple-products/
  startingPrice: number;
}

export interface ProductSegment {
  segmentId: string;
  products: Product[];
}

export interface Facility {
  id: string;
  name: string;
  location: string;
  state: string;
  coords: { x: number; y: number }; // SVG coordinates on US map
  investment: string;
  status: string;
  description: string;
}

export interface Q1Callout {
  metric: string;
  value: string;
  change: string;
  color: string;
}

// ── Constants ──────────────────────────────────────────

export const TOTAL_REVENUE = 416.16;
export const NET_INCOME = 112.0;
export const GROSS_MARGIN = 46.9;
export const PRODUCTS_GROSS_MARGIN = 36.8;
export const SERVICES_GROSS_MARGIN = 75.4;
export const ACTIVE_DEVICES = 2.5;
export const PAID_SUBSCRIPTIONS = 1.0;
export const RD_SPEND = 34.55;
export const US_INVESTMENT = 600;
export const DILUTED_EPS = 7.46;
export const REVENUE_YOY = 6.4;
export const NET_INCOME_YOY = 19.5;
export const EPS_YOY = 22.1;

// ── Revenue Segments ───────────────────────────────────

export const REVENUE_SEGMENTS: RevenueSegment[] = [
  {
    id: "iphone",
    name: "iPhone",
    shortName: "iPhone",
    amount: 209.59,
    percentOfTotal: 50.4,
    yoyGrowth: 4.2,
    color: "#007AFF",
    description: "The ecosystem's front door — half the company in one product.",
  },
  {
    id: "services",
    name: "Services",
    shortName: "Services",
    amount: 109.16,
    percentOfTotal: 26.2,
    yoyGrowth: 13.5,
    color: "#34C759",
    description: "App Store, iCloud, Music, TV+, AppleCare, Pay — recurring and high-margin.",
  },
  {
    id: "wearables",
    name: "Wearables, Home & Accessories",
    shortName: "Wearables",
    amount: 35.69,
    percentOfTotal: 8.6,
    yoyGrowth: -3.6,
    color: "#FF9500",
    description: "Watch, AirPods, HomePod, Vision Pro — the ecosystem glue.",
  },
  {
    id: "mac",
    name: "Mac",
    shortName: "Mac",
    amount: 33.71,
    percentOfTotal: 8.1,
    yoyGrowth: 12.4,
    color: "#AF52DE",
    description: "Laptops and desktops powered by Apple Silicon.",
  },
  {
    id: "ipad",
    name: "iPad",
    shortName: "iPad",
    amount: 28.02,
    percentOfTotal: 6.7,
    yoyGrowth: 5.0,
    color: "#FF2D55",
    description: "Tablets spanning consumer to professional creative workflows.",
  },
];

// ── Product Lineups ────────────────────────────────────

export const PRODUCT_LINEUPS: ProductSegment[] = [
  {
    segmentId: "iphone",
    products: [
      { name: "iPhone 16", image: "/assets/apple-products/iphone-16.webp", startingPrice: 799 },
      { name: "iPhone 16 Plus", image: "/assets/apple-products/iphone-16-plus.webp", startingPrice: 899 },
      { name: "iPhone 16 Pro", image: "/assets/apple-products/iphone-16-pro.webp", startingPrice: 999 },
      { name: "iPhone 16 Pro Max", image: "/assets/apple-products/iphone-16-pro-max.webp", startingPrice: 1199 },
      { name: "iPhone SE", image: "/assets/apple-products/iphone-se.webp", startingPrice: 429 },
    ],
  },
  {
    segmentId: "mac",
    products: [
      { name: 'MacBook Air 13"', image: "/assets/apple-products/macbook-air-13.webp", startingPrice: 1099 },
      { name: 'MacBook Air 15"', image: "/assets/apple-products/macbook-air-15.webp", startingPrice: 1299 },
      { name: 'MacBook Pro 14"', image: "/assets/apple-products/macbook-pro-14.webp", startingPrice: 1599 },
      { name: 'MacBook Pro 16"', image: "/assets/apple-products/macbook-pro-16.webp", startingPrice: 2499 },
      { name: "iMac", image: "/assets/apple-products/imac.webp", startingPrice: 1299 },
      { name: "Mac mini", image: "/assets/apple-products/mac-mini.webp", startingPrice: 599 },
      { name: "Mac Studio", image: "/assets/apple-products/mac-studio.webp", startingPrice: 1999 },
      { name: "Mac Pro", image: "/assets/apple-products/mac-pro.webp", startingPrice: 6999 },
    ],
  },
  {
    segmentId: "ipad",
    products: [
      { name: "iPad", image: "/assets/apple-products/ipad.webp", startingPrice: 349 },
      { name: "iPad Air", image: "/assets/apple-products/ipad-air.webp", startingPrice: 599 },
      { name: "iPad Pro", image: "/assets/apple-products/ipad-pro.webp", startingPrice: 999 },
      { name: "iPad mini", image: "/assets/apple-products/ipad-mini.webp", startingPrice: 499 },
    ],
  },
  {
    segmentId: "wearables",
    products: [
      { name: "Apple Watch Ultra 2", image: "/assets/apple-products/watch-ultra.webp", startingPrice: 799 },
      { name: "Apple Watch Series 10", image: "/assets/apple-products/watch-series.webp", startingPrice: 399 },
      { name: "Apple Watch SE", image: "/assets/apple-products/watch-se.webp", startingPrice: 249 },
      { name: "AirPods 4", image: "/assets/apple-products/airpods-4.webp", startingPrice: 129 },
      { name: "AirPods Pro 2", image: "/assets/apple-products/airpods-pro.webp", startingPrice: 249 },
      { name: "AirPods Max", image: "/assets/apple-products/airpods-max.webp", startingPrice: 549 },
      { name: "HomePod", image: "/assets/apple-products/homepod.webp", startingPrice: 299 },
      { name: "HomePod mini", image: "/assets/apple-products/homepod-mini.webp", startingPrice: 99 },
      { name: "Apple Vision Pro", image: "/assets/apple-products/vision-pro.webp", startingPrice: 3499 },
    ],
  },
];

// ── Services Detail ────────────────────────────────────

export const SERVICES_LIST = [
  { name: "App Store", icon: "Store" },
  { name: "iCloud+", icon: "Cloud" },
  { name: "Apple Music", icon: "Music" },
  { name: "Apple TV+", icon: "Tv" },
  { name: "AppleCare", icon: "Shield" },
  { name: "Apple Pay", icon: "CreditCard" },
  { name: "Fitness+", icon: "Heart" },
  { name: "Apple Arcade", icon: "Gamepad2" },
  { name: "News+", icon: "Newspaper" },
];

export const SERVICES_HISTORY = [
  { year: "FY2023", revenue: 85.2 },
  { year: "FY2024", revenue: 96.17 },
  { year: "FY2025", revenue: 109.16 },
];

// ── Q1 FY2026 Callouts ────────────────────────────────

export const Q1_CALLOUTS: Q1Callout[] = [
  { metric: "iPhone Revenue", value: "$85.3B", change: "+23%", color: "#007AFF" },
  { metric: "Record Quarter", value: "$143.8B", change: "+16%", color: "#1D1D1F" },
  { metric: "Gross Margin", value: "48.2%", change: "+1.3pp", color: "#34C759" },
  { metric: "Greater China", value: "$25.5B", change: "+38%", color: "#FF9500" },
];

// ── Profit / Waterfall Data ────────────────────────────

export const EXPENSE_CATEGORIES = [
  { id: "cogs", name: "Cost of Sales", amount: 221.0 },
  { id: "rd", name: "R&D", amount: 34.6 },
  { id: "sga", name: "SG&A", amount: 27.1 },
  { id: "taxes", name: "Taxes & Other", amount: 21.5 },
];

export const MARGIN_COMPARISON = [
  { name: "Products", margin: 36.8, color: "#86868B" },
  { name: "Services", margin: 75.4, color: "#34C759" },
];

export const Q1_MARGIN_COMPARISON = [
  { name: "Products", margin: 40.7, color: "#86868B" },
  { name: "Services", margin: 76.5, color: "#34C759" },
];

// ── US Investment Facilities ───────────────────────────

export const FACILITIES: Facility[] = [
  {
    id: "tsmc-arizona",
    name: "TSMC Fab 1",
    location: "Phoenix, AZ",
    state: "AZ",
    coords: { x: 145, y: 235 },
    investment: "$165B (TSMC total)",
    status: "In production — 4nm chips since Jan 2025",
    description: "Apple's first and largest customer. Producing tens of millions of Apple chips.",
  },
  {
    id: "amkor-arizona",
    name: "Amkor Packaging",
    location: "Peoria, AZ",
    state: "AZ",
    coords: { x: 140, y: 240 },
    investment: "$7B",
    status: "Broke ground",
    description: "Advanced chip packaging and testing for Apple Silicon from TSMC fab.",
  },
  {
    id: "houston-servers",
    name: "AI Server Facility",
    location: "Houston, TX",
    state: "TX",
    coords: { x: 340, y: 310 },
    investment: "250,000 sq ft",
    status: "Mass production 2025",
    description: "Apple's first US AI server manufacturing facility. Thousands of jobs.",
  },
  {
    id: "houston-mac",
    name: "Mac mini Production",
    location: "Houston, TX",
    state: "TX",
    coords: { x: 345, y: 315 },
    investment: "220,000 sq ft",
    status: "Production begins 2026",
    description: "First US-made Mac mini. Doubles Houston campus footprint.",
  },
  {
    id: "detroit-academy",
    name: "Manufacturing Academy",
    location: "Detroit, MI",
    state: "MI",
    coords: { x: 440, y: 135 },
    investment: "Partnership with MSU",
    status: "Opened Aug 2025",
    description: "Training American SMBs in AI, automation, and manufacturing.",
  },
  {
    id: "kentucky-corning",
    name: "Corning Glass Production",
    location: "Harrodsburg, KY",
    state: "KY",
    coords: { x: 440, y: 210 },
    investment: "Advanced Mfg Fund",
    status: "Operational",
    description: "World's largest smartphone glass production line. Every iPhone uses Kentucky glass.",
  },
  {
    id: "austin-samsung",
    name: "Samsung Partnership",
    location: "Austin, TX",
    state: "TX",
    coords: { x: 320, y: 300 },
    investment: "TBA",
    status: "Announced",
    description: "Innovative new chip technology collaboration with Samsung.",
  },
];

// ── Takeaway Data ──────────────────────────────────────

export const KEY_TAKEAWAYS = [
  {
    title: "One Product, Half the Revenue",
    description: "iPhone is the gateway at $209.6B (50.4%)",
    accent: "#007AFF",
  },
  {
    title: "The Real Margin Story is Services",
    description: "75.4% gross margin on $109.2B, and growing",
    accent: "#34C759",
  },
  {
    title: "The Infrastructure Moat",
    description: "$600B invested in the only end-to-end US silicon supply chain",
    accent: "#1D1D1F",
  },
];

export const YOY_METRICS = [
  { label: "Revenue", value: "+6.4%", subtext: "$416.2B" },
  { label: "Net Income", value: "+19.5%", subtext: "$112.0B" },
  { label: "Services", value: "+13.5%", subtext: "$109.2B" },
  { label: "Installed Base", value: "2.5B", subtext: "Active Devices" },
];

// ── Helpers ────────────────────────────────────────────

export function formatBillions(n: number): string {
  return `$${n.toFixed(1)}B`;
}

export function formatPrice(n: number): string {
  return `From $${n.toLocaleString()}`;
}
