import { Category } from "./categories";

export interface CategoryOverviewItem {
  category: Category;
  sum: {
    amount: number;
  };
}

export interface Period {
  timeframe: Timeframe;
  year: number;
  month: number;
}

export enum Timeframe {
  YEAR = "year",
  MONTH = "month",
}

export interface HistoryDataRecord {
  balance: Balance;
  year: number;
  month: number;
  day?: number;
}

export interface Balance {
  expense: number;
  income: number;
}
