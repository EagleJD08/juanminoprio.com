export interface SpendingCategory {
  id: string;
  name: string;
  shortName: string;
  color: string;
}

export interface SpendingRecord {
  categoryId: string;
  amount: number;
}

export interface DemographicGroup {
  id: string;
  label: string;
  totalExpenditure: number;
  spending: SpendingRecord[];
}

export type DemographicType = "age" | "income";

export interface SelectedDemographic {
  type: DemographicType;
  groupId: string;
}
