import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Category {
  name: string;
  emoji: string;
  type: "expense" | "income";
}

export function CategoriesStats() {
  return (
    <div className="flex flex-wrap gap-1.5 md:flex-nowrap">
      <CategoryTypeStats
        title="Income Categories"
        categoriesData={[
          {
            category: { name: "Food", emoji: "🍔", type: "income" },
            amount: 1000,
          },
        ]}
        total={2000}
        currency="$"
      />
      <CategoryTypeStats
        title="Expense Categories"
        categoriesData={[
          {
            category: { name: "Food", emoji: "🍔", type: "expense" },
            amount: 1000,
          },
          {
            category: { name: "Transport", emoji: "🚕", type: "expense" },
            amount: 500,
          },
          {
            category: { name: "Entertainment", emoji: "🎉", type: "expense" },
            amount: 1000,
          },
          {
            category: { name: "Health", emoji: "💊", type: "expense" },
            amount: 500,
          },
          {
            category: { name: "Education", emoji: "📚", type: "expense" },
            amount: 500,
          },
          {
            category: { name: "Gifts", emoji: "🎁", type: "expense" },
            amount: 500,
          },
        ]}
        total={4000}
        currency="$"
      />
    </div>
  );
}

interface CategoryTypeStatsProps {
  title: string;
  categoriesData: {
    category: Category;
    amount: number;
  }[];
  total: number;
  currency: string;
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

      {categoriesData.length === 0 && (
        <CardContent className="flex-1 flex justify-center items-center">
          <p className="text-center text-muted-foreground">
            There is no data for the selected period
          </p>
        </CardContent>
      )}

      {categoriesData.length > 0 && (
        <ScrollArea className="px-4 mb-2">
          <div className="flex flex-col gap-4 p-4">
            {categoriesData.map(({ category, amount }) => (
              <CategoryItem
                key={category.name}
                category={category}
                amount={amount}
                currency={currency}
                total={total}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </Card>
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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex gap-2 items-center">
            <span className="text-muted-foreground">{category.emoji}</span>
            <span className="text-muted-foreground">{category.name}</span>
          </div>
          <span className="text-muted-foreground text-xs">
            ({percentage.toFixed(0)}%)
          </span>
        </div>
        <span className="text-muted-foreground text-sm">
          {currency}
          {amount}
        </span>
      </div>
      <Progress
        value={percentage}
        indicatorClassName={
          category.type === "income" ? "bg-emerald-500" : "bg-red-500"
        }
      />
    </div>
  );
}
