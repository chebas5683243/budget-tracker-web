import { CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";
import { Category, CategoryType } from "@/types/categories";
import { CategoryOverviewItem } from "@/types/reports";
import { Currency } from "@/types/settings";

interface CategoryTypeStatsDataProps {
  categoriesData: CategoryOverviewItem[] | undefined;
  total: number | undefined;
  currency: Currency | undefined;
}

export function CategoryTypeStatsData({
  categoriesData,
  currency,
  total,
}: CategoryTypeStatsDataProps) {
  if (!categoriesData || !currency || total === undefined)
    return (
      <div className="flex flex-col gap-4 py-4 px-8 mb-2 animate-pulse">
        <CategoryItemSkeleton />
        <CategoryItemSkeleton />
        <CategoryItemSkeleton />
      </div>
    );

  if (categoriesData.length === 0) {
    return (
      <CardContent className="flex-1 flex justify-center items-center">
        <p className="text-center text-muted-foreground">
          There is no data for the selected period
        </p>
      </CardContent>
    );
  }

  return (
    <ScrollArea className="px-4 mb-2">
      <div className="flex flex-col gap-4 p-4">
        {categoriesData.map(({ category, sum }) => (
          <CategoryItem
            key={category.name}
            category={category}
            amount={sum.amount}
            currency={currency}
            total={total}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

function CategoryItemSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="w-32 h-6 bg-muted rounded-md" />
        <div className="w-16 h-6 bg-muted rounded-md" />
      </div>
      <div className="w-full h-4 bg-muted rounded-md" />
    </div>
  );
}

interface CategoryItemProps {
  category: Category;
  amount: number;
  currency: string;
  total: number;
}

function CategoryItem({
  category,
  amount,
  currency,
  total,
}: CategoryItemProps) {
  const percentage = (amount / total) * 100;
  const amountFormatted = formatCurrency({ amount, currency });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex gap-2 items-center">
            <span className="text-muted-foreground">{category.icon}</span>
            <span className="text-muted-foreground">{category.name}</span>
          </div>
          <span className="text-muted-foreground text-xs">
            ({percentage.toFixed(1)}%)
          </span>
        </div>
        <span className="text-muted-foreground text-sm">{amountFormatted}</span>
      </div>
      <Progress
        value={percentage}
        indicatorClassName={
          category.type === CategoryType.INCOME
            ? "bg-emerald-500"
            : "bg-red-500"
        }
      />
    </div>
  );
}
