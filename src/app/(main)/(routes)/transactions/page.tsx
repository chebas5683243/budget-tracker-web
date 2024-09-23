"use client";

import { useMemo, useState } from "react";

import { TransactionsTable } from "./_components/transactions-table";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Separator } from "@/components/ui/separator";
import { useGetTransactions } from "@/services/transactions/get-transactions";

import { endOfDay, startOfMonth } from "date-fns";

function TransactionsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  const {
    data: transactions,
    isFetching: loadingTransactions,
    isRefetching,
  } = useGetTransactions({
    startDate: dateRange.from.getTime(),
    endDate: endOfDay(dateRange.to.getTime()).getTime(),
  });

  const transactionsToRender = useMemo(
    () => transactions || [],
    [transactions],
  );

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
      <TransactionsTable
        transactions={transactionsToRender}
        fetchingData={loadingTransactions && !isRefetching}
      />
    </main>
  );
}

export default TransactionsPage;
