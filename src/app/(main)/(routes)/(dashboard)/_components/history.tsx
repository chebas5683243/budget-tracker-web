"use client";

import { useState } from "react";

import { HistoryChart } from "./history-chart";
import { HistoryPeriodSelector } from "./history-period-selector";
import { Card } from "@/components/ui/card";
import { useGetHistoryData } from "@/services/reports/get-history-data";
import { Period, Timeframe } from "@/types/reports";

export function History() {
  const [period, setPeriod] = useState<Period>({
    timeframe: Timeframe.MONTH,
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { data: records, isFetching: isFetchinRecords } = useGetHistoryData({
    timeframe: period.timeframe,
    year: period.year,
    month: period.month,
  });

  return (
    <div className="container mb-10">
      <div className="py-6">
        <h2 className="text-3xl font-bold">History</h2>
      </div>
      <Card className="flex flex-col items-center gap-3 p-2">
        <HistoryPeriodSelector value={period} onValueChange={setPeriod} />
        <HistoryChart
          timeframe={period.timeframe}
          records={records}
          isLoading={isFetchinRecords}
        />
      </Card>
    </div>
  );
}
