import { Card } from "@/components/ui/card";

import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

import type { FormattedRecord } from "./history-chart";

export function HistoryChartTooltip({
  payload,
}: TooltipProps<ValueType, NameType>) {
  const record = payload?.[0]?.payload as FormattedRecord | undefined;

  return (
    <Card className="flex flex-col p-2">
      <span>
        {record?.xAxisName}: {record?.xAxisKey}
      </span>
      <span>Income: {record?.income}</span>
      <span>Expense: {record?.expense}</span>
      <span>Balance: {record?.balance}</span>
    </Card>
  );
}
