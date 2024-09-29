import { useMemo } from "react";

import { HistoryChartTooltip } from "./history-chart-tooltip";
import { getMonthName, leftFillNum } from "@/lib/utils";
import { HistoryDataRecord, Timeframe } from "@/types/reports";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HistoryChartProps {
  timeframe: Timeframe;
  records?: HistoryDataRecord[];
  isLoading: boolean;
}

export type FormattedRecord = {
  income: number;
  expense: number;
  balance: number;
  xAxisKey: string;
  xAxisName: string;
};

export function HistoryChart({
  timeframe,
  records,
  isLoading,
}: HistoryChartProps) {
  const formattedRecords: FormattedRecord[] = useMemo(() => {
    if (isLoading || !records) return [];
    return records.map((record) => {
      const xAxisKey =
        timeframe === Timeframe.MONTH
          ? leftFillNum(record.day!, 2, "0")
          : getMonthName(record.month);

      const xAxisName = Timeframe.MONTH ? "Day" : "Month";

      return {
        income: record.balance.income,
        expense: record.balance.expense,
        balance: record.balance.income - record.balance.expense,
        xAxisKey,
        xAxisName,
      } satisfies FormattedRecord;
    });
  }, [records, timeframe, isLoading]);

  if (isLoading) return <HistoryChartSkeleton />;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart height={300} width={500} data={formattedRecords}>
        <defs>
          <linearGradient id="incomeBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#10b981" stopOpacity="1" />
            <stop offset="1" stopColor="#10b981" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="expenseBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ef4444" stopOpacity="1" />
            <stop offset="1" stopColor="#ef4444" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray={4} opacity={0.3} />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="xAxisKey"
          className="text-xs"
        />
        <YAxis axisLine={false} tickLine={false} className="text-xs" />
        <Tooltip
          cursor={{ className: "opacity-10" }}
          content={HistoryChartTooltip}
        />
        <Bar
          dataKey="income"
          label="Income"
          fill="url(#incomeBar)"
          radius={4}
        />
        <Bar
          dataKey="expense"
          label="Expense"
          fill="url(#expenseBar)"
          radius={4}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

function HistoryChartSkeleton() {
  return <div className="w-full h-[300px] bg-muted rounded-md animate-pulse" />;
}
