"use client";

import { useMemo, useState } from "react";

import { CategoriesStats } from "./categories-stats";
import { OverallStats } from "./overall-stats";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useGetCategoryOverviewReport } from "@/services/reports/get-categories-overview";
import { useGetSettings } from "@/services/settings/get-settings";
import { CategoryType } from "@/types/categories";
import { Currency } from "@/types/settings";

import { endOfDay, startOfMonth } from "date-fns";

export function Overview() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  const { data: categoriesOverview } = useGetCategoryOverviewReport({
    startDate: dateRange.from.getTime(),
    endDate: endOfDay(dateRange.to.getTime()).getTime(),
  });

  const balances = useMemo(() => {
    if (!categoriesOverview) return undefined;

    let income = 0;
    let expense = 0;

    categoriesOverview.forEach((catOverview) => {
      if (catOverview.category.type === CategoryType.EXPENSE) {
        expense += catOverview.sum.amount;
      } else {
        income += catOverview.sum.amount;
      }
    });

    return { income, expense, balance: income - expense };
  }, [categoriesOverview]);

  const { data: currency } = useGetSettings<Currency>({
    select: (settings) => settings.currency,
  });

  return (
    <div className="container">
      <div className="flex flex-wrap items-end justify-between gap-2 py-6">
        <h2 className="text-3xl font-bold">Overview</h2>
        <div className="flex items-center gap-3">
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(values) => {
              const { from, to } = values.range;
              if (!from || !to) return;
              setDateRange({ from, to });
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <OverallStats balances={balances} currency={currency} />
        <CategoriesStats
          categoriesOverview={categoriesOverview}
          income={balances?.income}
          expense={balances?.expense}
          currency={currency}
        />
      </div>
    </div>
  );
}
