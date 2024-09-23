import { useMemo } from "react";

import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Currency } from "@/types/settings";

import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

interface OverallStatsProps {
  balances?: {
    income: number;
    expense: number;
    balance: number;
  };
  currency?: Currency;
}

export function OverallStats({ balances, currency }: OverallStatsProps) {
  return (
    <div className="flex flex-wrap gap-1.5 md:flex-nowrap">
      <BalanceCard
        icon={
          <TrendingUp className="size-12 p-2 bg-emerald-400/10 text-emerald-500 rounded-lg" />
        }
        title="Income"
        amount={balances?.income}
        currency={currency}
      />
      <BalanceCard
        icon={
          <TrendingDown className="size-12 p-2 bg-red-400/10 text-red-500 rounded-lg" />
        }
        title="Expense"
        amount={balances?.expense}
        currency={currency}
      />
      <BalanceCard
        icon={
          <Wallet className="size-12 p-2 bg-violet-400/10 text-violet-500 rounded-lg" />
        }
        title="Balance"
        amount={balances?.balance}
        currency={currency}
      />
    </div>
  );
}

interface BalanceCardProps {
  icon: React.ReactNode;
  title: string;
  amount?: number;
  currency?: Currency;
}

function BalanceCard({ amount, currency, icon, title }: BalanceCardProps) {
  const amountFormatted = useMemo(() => {
    if (amount === undefined || !currency) return undefined;
    return formatCurrency({ amount, currency });
  }, [currency, amount]);

  return (
    <Card className="flex h-24 items-center gap-2 p-4 w-full">
      {icon}
      <div className="flex flex-col">
        <span className="text-muted-foreground">{title}</span>
        {amountFormatted ? (
          <span className="text-2xl">{amountFormatted}</span>
        ) : (
          <div className="h-8 w-24 rounded-md bg-muted animate-pulse" />
        )}
      </div>
    </Card>
  );
}
