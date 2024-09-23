import { Category } from "./categories";

export interface CategoryOverviewItem {
  category: Category;
  sum: {
    amount: number;
  };
}
