// Revenue streams
export interface RevenueStream {
  id: string;
  name: string;
  shortName: string;
  amount: number; // in billions
  percentOfTotal: number;
  yoyGrowth: number; // percentage
  color: string;
  description: string;
}

// Expense categories
export interface ExpenseCategory {
  id: string;
  name: string;
  amount: number; // in billions
  color: string;
}

// Key metrics
export interface KeyMetric {
  label: string;
  value: string;
  subtext?: string;
  yoyChange?: string;
}

export const TOTAL_REVENUE = 23.9; // billions
export const NET_INCOME = 8.9; // billions
export const TOTAL_CLIENT_ASSETS = 11.9; // trillions
export const TOTAL_ACCOUNTS = 46.5; // millions
export const NET_NEW_ASSETS = 519; // billions
export const DAILY_AVG_TRADES = 8.3; // millions (Q4)
export const NET_INTEREST_MARGIN = 2.90; // percent (Q4)
export const MARGIN_LOAN_BALANCES = 112.3; // billions

export const REVENUE_STREAMS: RevenueStream[] = [
  {
    id: "net-interest",
    name: "Net Interest Revenue",
    shortName: "Net Interest",
    amount: 11.8,
    percentOfTotal: 49,
    yoyGrowth: 28,
    color: "#2C4A6E", // slate-navy
    description: "Income from lending client deposits and margin loans"
  },
  {
    id: "asset-management",
    name: "Asset Management & Admin Fees",
    shortName: "Asset Mgmt",
    amount: 6.5,
    percentOfTotal: 27,
    yoyGrowth: 14,
    color: "#6B4226", // cocoa
    description: "Fees from mutual funds, ETFs, and advisory services"
  },
  {
    id: "trading",
    name: "Trading Revenue",
    shortName: "Trading",
    amount: 3.9,
    percentOfTotal: 16,
    yoyGrowth: 20,
    color: "#4A4A4A", // charcoal
    description: "Options, futures, and order flow revenue"
  },
  {
    id: "other",
    name: "Bank Deposits & Other",
    shortName: "Other",
    amount: 1.7,
    percentOfTotal: 8,
    yoyGrowth: 0,
    color: "#B8A99A", // mushroom
    description: "Bank deposit account fees and other revenue"
  }
];

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { id: "compensation", name: "Compensation & Benefits", amount: 8.1, color: "#ef4444" },
  { id: "technology", name: "Technology & Communications", amount: 2.4, color: "#ef4444" },
  { id: "other-costs", name: "Other Operating Costs", amount: 2.8, color: "#ef4444" },
  { id: "taxes", name: "Taxes", amount: 1.7, color: "#ef4444" },
];

export const TOTAL_EXPENSES = EXPENSE_CATEGORIES.reduce((sum, e) => sum + e.amount, 0);

export const YOY_METRICS: KeyMetric[] = [
  { label: "Revenue", value: "$23.9B", yoyChange: "+22%" },
  { label: "Net Income", value: "$8.9B", yoyChange: "+51%" },
  { label: "Client Assets", value: "$11.9T", yoyChange: "+18%" },
  { label: "Net New Assets", value: "$519B", subtext: "5.1% organic growth" },
];

// Helper to format billions for display
export function formatBillions(value: number): string {
  return `$${value.toFixed(1)}B`;
}

export function formatTrillions(value: number): string {
  return `$${value.toFixed(1)}T`;
}
