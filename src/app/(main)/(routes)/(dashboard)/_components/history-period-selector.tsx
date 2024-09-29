import { useMemo } from "react";

import { MonthSelector } from "./month-selector";
import { TimeframeSelector } from "./timeframe-selector";
import { YearSelector } from "./year-selector";
import { TOTAL_MONTHS } from "@/lib/constans";
import { useGetHistoryPeriods } from "@/services/reports/get-history-periods";
import { Period, Timeframe } from "@/types/reports";

interface HistoryPeriodSelectorProps {
  value: Period;
  onValueChange: SetState<Period>;
}

export function HistoryPeriodSelector({
  onValueChange,
  value,
}: HistoryPeriodSelectorProps) {
  const { data: years, isLoading } = useGetHistoryPeriods();

  const yearsList = useMemo(() => years || [], [years]);

  const monthsList = useMemo(
    () => Array.from({ length: TOTAL_MONTHS }).map((_, index) => index),
    [],
  );

  function onTimeframeChange(timeframe: Timeframe) {
    onValueChange((period) => ({
      ...period,
      timeframe,
    }));
  }

  function onYearChange(year: number) {
    onValueChange((period) => ({
      ...period,
      year,
    }));
  }

  function onMonthChange(month: number) {
    onValueChange((period) => ({
      ...period,
      month,
    }));
  }

  if (isLoading) return <HistoryPeriodSelectorSkeleton />;

  return (
    <div className="flex w-full flex-wrap items-center gap-6 self-start p-3">
      <TimeframeSelector
        value={value.timeframe}
        onValueChange={onTimeframeChange}
      />
      <div className="flex flex-1 sm:flex-nowrap gap-6">
        <YearSelector
          years={yearsList}
          value={value.year}
          onValueChange={onYearChange}
        />
        <MonthSelector
          months={monthsList}
          value={value.month}
          onValueChange={onMonthChange}
        />
      </div>
    </div>
  );
}

function HistoryPeriodSelectorSkeleton() {
  return (
    <div className="flex w-full flex-wrap items-center gap-6 self-start p-3">
      <div className="w-[128px] h-10 rounded-md bg-muted animate-pulse" />
      <div className="flex flex-1 sm:flex-nowrap gap-6">
        <div className="flex-1 h-10 rounded-md max-w-[180px] basis-[140px] bg-muted animate-pulse" />
        <div className="flex-1 h-10 rounded-md max-w-[180px] basis-[140px] bg-muted animate-pulse" />
      </div>
    </div>
  );
}
