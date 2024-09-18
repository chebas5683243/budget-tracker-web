import { SortIconIndicator } from "./sort-icon-indicator";
import { TransactionActions } from "./transaction-actions";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/types/categories";
import { type Transaction } from "@/types/transactions";

import { Column, type ColumnDef } from "@tanstack/react-table";

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    id: "category",
    accessorFn: (col) => col.category.name,
    header: ({ column }) => (
      <SortIconIndicator
        title="Category"
        isSorted={column.getIsSorted()}
        onClick={() => toggleSortFn(column)}
      />
    ),
    cell: ({ row }) => {
      const { name, icon } = row.original.category;
      return `${icon} ${name}`;
    },
  },
  {
    id: "description",
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "transactionDate",
    accessorKey: "transactionDate",
    header: ({ column }) => (
      <SortIconIndicator
        title="Date"
        isSorted={column.getIsSorted()}
        onClick={() => toggleSortFn(column)}
      />
    ),
    cell: ({ row }) =>
      new Date(row.getValue("transactionDate")).toLocaleDateString(),
  },
  {
    id: "amount",
    accessorFn: (col) => col.amount,
    header: ({ column }) => (
      <SortIconIndicator
        title="Amount"
        isSorted={column.getIsSorted()}
        onClick={() => toggleSortFn(column)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2 justify-center">
        <span className="w-10 text-right">{row.getValue("amount")}</span>
        <span>USD</span>
      </div>
    ),
    meta: {
      style: {
        textAlign: "center",
      },
    },
  },
  {
    id: "type",
    accessorFn: (col) => col.category.type,
    header: "Type",
    cell: ({ row }) => {
      const { type } = row.original.category;
      return (
        <div
          className={cn(
            "capitalize p-2 rounded-lg text-center max-w-32 m-auto",
            type === CategoryType.EXPENSE
              ? "bg-red-400/10 text-red-500"
              : "bg-emerald-400/10 text-emerald-500",
          )}
        >
          {type}
        </div>
      );
    },
    meta: {
      style: {
        textAlign: "center",
      },
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TransactionActions transaction={row.original} />,
  },
];

function toggleSortFn(column: Column<any, any>) {
  const isSorted = column.getIsSorted();

  if (isSorted === false) column.toggleSorting(false);
  if (isSorted === "asc") column.toggleSorting(true);
  if (isSorted === "desc") column.clearSorting();
}
