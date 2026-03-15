import type { SpendingCategory, DemographicGroup } from "./spending-types";

export const CATEGORIES: SpendingCategory[] = [
  { id: "housing", name: "Housing", shortName: "Housing", color: "#2C4A6E" },
  { id: "transportation", name: "Transportation", shortName: "Transport", color: "#6B4226" },
  { id: "food", name: "Food", shortName: "Food", color: "#1A1A1A" },
  { id: "insurance-pensions", name: "Personal Insurance & Pensions", shortName: "Insurance", color: "#4A4A4A" },
  { id: "healthcare", name: "Healthcare", shortName: "Healthcare", color: "#2C4A6E" },
  { id: "entertainment", name: "Entertainment", shortName: "Fun", color: "#6B4226" },
  { id: "cash-contributions", name: "Cash Contributions", shortName: "Donations", color: "#1A1A1A" },
  { id: "apparel", name: "Apparel & Services", shortName: "Apparel", color: "#B8A99A" },
  { id: "education", name: "Education", shortName: "Education", color: "#4A4A4A" },
  { id: "miscellaneous", name: "Miscellaneous", shortName: "Misc", color: "#B8A99A" },
  { id: "personal-care", name: "Personal Care", shortName: "Self-Care", color: "#2C4A6E" },
  { id: "alcoholic-beverages", name: "Alcoholic Beverages", shortName: "Alcohol", color: "#4A4A4A" },
  { id: "tobacco", name: "Tobacco & Smoking", shortName: "Tobacco", color: "#B8A99A" },
  { id: "reading", name: "Reading", shortName: "Reading", color: "#6B4226" },
];

function makeSpending(amounts: Record<string, number>) {
  return Object.entries(amounts).map(([categoryId, amount]) => ({ categoryId, amount }));
}

export const NATIONAL_AVERAGE: DemographicGroup = {
  id: "all",
  label: "All Consumer Units",
  totalExpenditure: 77280,
  spending: makeSpending({
    "housing": 25436,
    "transportation": 13174,
    "food": 9985,
    "insurance-pensions": 9556,
    "healthcare": 6159,
    "entertainment": 3635,
    "cash-contributions": 2378,
    "apparel": 2041,
    "education": 1656,
    "miscellaneous": 1184,
    "personal-care": 950,
    "alcoholic-beverages": 637,
    "tobacco": 370,
    "reading": 117,
  }),
};

export const AGE_GROUPS: DemographicGroup[] = [
  {
    id: "under-25",
    label: "Under 25",
    totalExpenditure: 49560,
    spending: makeSpending({
      "housing": 17609, "transportation": 10699, "food": 5953, "insurance-pensions": 5089,
      "healthcare": 1723, "entertainment": 1835, "cash-contributions": 482, "apparel": 1418,
      "education": 1500, "miscellaneous": 481, "personal-care": 680, "alcoholic-beverages": 329,
      "tobacco": 222, "reading": 74,
    }),
  },
  {
    id: "25-34",
    label: "25–34",
    totalExpenditure: 71867,
    spending: makeSpending({
      "housing": 25317, "transportation": 12879, "food": 9704, "insurance-pensions": 10281,
      "healthcare": 3532, "entertainment": 3008, "cash-contributions": 1015, "apparel": 2083,
      "education": 1118, "miscellaneous": 970, "personal-care": 899, "alcoholic-beverages": 654,
      "tobacco": 316, "reading": 90,
    }),
  },
  {
    id: "35-44",
    label: "35–44",
    totalExpenditure: 90939,
    spending: makeSpending({
      "housing": 30156, "transportation": 15326, "food": 12006, "insurance-pensions": 13220,
      "healthcare": 5509, "entertainment": 4694, "cash-contributions": 1767, "apparel": 2959,
      "education": 1732, "miscellaneous": 1308, "personal-care": 1072, "alcoholic-beverages": 681,
      "tobacco": 381, "reading": 128,
    }),
  },
  {
    id: "45-54",
    label: "45–54",
    totalExpenditure: 97319,
    spending: makeSpending({
      "housing": 29095, "transportation": 17311, "food": 12941, "insurance-pensions": 14879,
      "healthcare": 6338, "entertainment": 4530, "cash-contributions": 2496, "apparel": 2574,
      "education": 3193, "miscellaneous": 1363, "personal-care": 1228, "alcoholic-beverages": 817,
      "tobacco": 447, "reading": 107,
    }),
  },
  {
    id: "55-64",
    label: "55–64",
    totalExpenditure: 83379,
    spending: makeSpending({
      "housing": 25595, "transportation": 14443, "food": 10069, "insurance-pensions": 11131,
      "healthcare": 7164, "entertainment": 3899, "cash-contributions": 2800, "apparel": 1927,
      "education": 2028, "miscellaneous": 1466, "personal-care": 960, "alcoholic-beverages": 717,
      "tobacco": 523, "reading": 78,
    }),
  },
  {
    id: "65-74",
    label: "65–74",
    totalExpenditure: 65149,
    spending: makeSpending({
      "housing": 22216, "transportation": 10899, "food": 8566, "insurance-pensions": 4286,
      "healthcare": 7942, "entertainment": 3447, "cash-contributions": 2756, "apparel": 1520,
      "education": 514, "miscellaneous": 1111, "personal-care": 806, "alcoholic-beverages": 586,
      "tobacco": 365, "reading": 135,
    }),
  },
  {
    id: "75-plus",
    label: "75+",
    totalExpenditure: 53031,
    spending: makeSpending({
      "housing": 20370, "transportation": 6448, "food": 6508, "insurance-pensions": 1879,
      "healthcare": 8145, "entertainment": 2131, "cash-contributions": 3653, "apparel": 958,
      "education": 500, "miscellaneous": 970, "personal-care": 723, "alcoholic-beverages": 363,
      "tobacco": 141, "reading": 207,
    }),
  },
];

export const INCOME_GROUPS: DemographicGroup[] = [
  {
    id: "lowest-20",
    label: "Lowest 20%",
    totalExpenditure: 33776,
    spending: makeSpending({
      "housing": 13943, "transportation": 4917, "food": 5278, "insurance-pensions": 713,
      "healthcare": 3539, "entertainment": 1445, "cash-contributions": 749, "apparel": 938,
      "education": 727, "miscellaneous": 428, "personal-care": 438, "alcoholic-beverages": 217,
      "tobacco": 378, "reading": 65,
    }),
  },
  {
    id: "second-20",
    label: "Second 20%",
    totalExpenditure: 48923,
    spending: makeSpending({
      "housing": 18656, "transportation": 7809, "food": 7100, "insurance-pensions": 2608,
      "healthcare": 4844, "entertainment": 2234, "cash-contributions": 1472, "apparel": 1247,
      "education": 531, "miscellaneous": 1023, "personal-care": 637, "alcoholic-beverages": 329,
      "tobacco": 360, "reading": 72,
    }),
  },
  {
    id: "third-20",
    label: "Third 20%",
    totalExpenditure: 65487,
    spending: makeSpending({
      "housing": 22674, "transportation": 11909, "food": 8989, "insurance-pensions": 5942,
      "healthcare": 5753, "entertainment": 2718, "cash-contributions": 1839, "apparel": 1640,
      "education": 1079, "miscellaneous": 1089, "personal-care": 875, "alcoholic-beverages": 441,
      "tobacco": 450, "reading": 88,
    }),
  },
  {
    id: "fourth-20",
    label: "Fourth 20%",
    totalExpenditure: 87922,
    spending: makeSpending({
      "housing": 27951, "transportation": 15914, "food": 11550, "insurance-pensions": 11878,
      "healthcare": 7010, "entertainment": 3871, "cash-contributions": 2383, "apparel": 2487,
      "education": 1176, "miscellaneous": 1270, "personal-care": 1111, "alcoholic-beverages": 772,
      "tobacco": 396, "reading": 153,
    }),
  },
  {
    id: "highest-20",
    label: "Highest 20%",
    totalExpenditure: 150093,
    spending: makeSpending({
      "housing": 43897, "transportation": 25279, "food": 16996, "insurance-pensions": 26604,
      "healthcare": 9633, "entertainment": 7898, "cash-contributions": 5441, "apparel": 3888,
      "education": 4766, "miscellaneous": 2106, "personal-care": 1687, "alcoholic-beverages": 1426,
      "tobacco": 265, "reading": 208,
    }),
  },
];

export function getCategoryById(id: string): SpendingCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getSpendingAmount(group: DemographicGroup, categoryId: string): number {
  return group.spending.find((s) => s.categoryId === categoryId)?.amount ?? 0;
}
