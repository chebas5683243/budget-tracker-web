import { CategoryTypeStatsData } from "./category-type-stats-data";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryType } from "@/types/categories";
import { CategoryOverviewItem } from "@/types/reports";
import { Currency } from "@/types/settings";

interface CategoryStatsProps {
  categoriesOverview: CategoryOverviewItem[] | undefined;
  income: number | undefined;
  expense: number | undefined;
  currency: Currency | undefined;
}

export function CategoriesStats({
  categoriesOverview,
  income,
  expense,
  currency,
}: CategoryStatsProps) {
  const incomeCategoriesOverview = categoriesOverview?.filter(
    (catOverview) => catOverview.category.type === CategoryType.INCOME,
  );

  const expenseCategoriesOverview = categoriesOverview?.filter(
    (catOverview) => catOverview.category.type === CategoryType.EXPENSE,
  );

  return (
    <div className="flex flex-wrap gap-1.5 md:flex-nowrap">
      <CategoryTypeStats
        title="Income Categories"
        categoriesData={incomeCategoriesOverview}
        total={income}
        currency={currency}
      />
      <CategoryTypeStats
        title="Expense Categories"
        categoriesData={expenseCategoriesOverview}
        total={expense}
        currency={currency}
      />
    </div>
  );
}

interface CategoryTypeStatsProps {
  title: string;
  categoriesData: CategoryOverviewItem[] | undefined;
  total: number | undefined;
  currency: Currency | undefined;
}

function CategoryTypeStats({
  currency,
  categoriesData,
  title,
  total,
}: CategoryTypeStatsProps) {
  return (
    <Card className="flex flex-col h-80 w-full">
      <CardHeader>
        <CardTitle className="text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CategoryTypeStatsData
        categoriesData={categoriesData}
        currency={currency}
        total={total}
      />
    </Card>
  );
}
