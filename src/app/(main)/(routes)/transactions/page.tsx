"use client";

import { useState } from "react";

import { DataTableDemo } from "./_components/transactions-table";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Separator } from "@/components/ui/separator";

import { startOfMonth } from "date-fns";

function TransactionsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  return (
    <main>
      <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
        <h2 className="text-3xl font-bold">Transactions History</h2>
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
      <Separator className="w-full" />
      <DataTableDemo />
    </main>
  );
}

export default TransactionsPage;
