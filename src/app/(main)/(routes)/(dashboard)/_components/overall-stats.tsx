import { Card } from "@/components/ui/card";

import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

export function OverallStats() {
  return (
    <div className="flex flex-wrap gap-1.5 md:flex-nowrap">
      <BalanceCard
        icon={
          <TrendingUp className="size-12 p-2 bg-emerald-400/10 text-emerald-500 rounded-lg" />
        }
        title="Income"
        amount={4000}
        currency="$"
      />
      <BalanceCard
        icon={
          <TrendingDown className="size-12 p-2 bg-red-400/10 text-red-500 rounded-lg" />
        }
        title="Expense"
        amount={3000}
        currency="$"
      />
      <BalanceCard
        icon={
          <Wallet className="size-12 p-2 bg-violet-400/10 text-violet-500 rounded-lg" />
        }
        title="Balance"
        amount={1000}
        currency="$"
      />
    </div>
  );
}

interface BalanceCardProps {
  icon: React.ReactNode;
  title: string;
  amount: number;
  currency: string;
}

function BalanceCard({ amount, currency, icon, title }: BalanceCardProps) {
  return (
    <Card className="flex h-24 items-center gap-2 p-4 w-full">
      {icon}
      <div className="flex flex-col">
        <span className="text-muted-foreground">{title}</span>
        <span className="text-2xl">
          {currency}
          {amount}
        </span>
      </div>
    </Card>
  );
}
