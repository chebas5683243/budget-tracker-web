"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useGetTransactions } from "@/services/transactions/getTransactions";
import { type Category, CategoryType } from "@/types/categories";
import type { Transaction } from "@/types/transactions";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ChevronDownIcon,
  ChevronsUpDown,
} from "lucide-react";

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "category",
    header: ({ column }) => (
      <SortIconIndicator
        title="Category"
        isSorted={column.getIsSorted()}
        onClick={() => toggleSortFn(column)}
      />
    ),
    cell: ({ row }) => {
      const category: Category = row.getValue("category");
      return `${category.icon} ${category.name}`;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <SortIconIndicator
        title="Date"
        isSorted={column.getIsSorted()}
        onClick={() => toggleSortFn(column)}
      />
    ),
    cell: ({ row }) => new Date(row.getValue("date")).toLocaleDateString(),
  },
  {
    accessorKey: "amount",
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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const category: Category = row.getValue("category");
      return (
        <div
          className={cn(
            "capitalize p-2 rounded-lg text-center max-w-32 m-auto",
            category.type === CategoryType.EXPENSE
              ? "bg-red-400/10 text-red-500"
              : "bg-emerald-400/10 text-emerald-500",
          )}
        >
          {category.type}
        </div>
      );
    },
    meta: {
      style: {
        textAlign: "center",
      },
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: transactions } = useGetTransactions();

  const table = useReactTable({
    data: transactions || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
  });

  return (
    <div className="w-full container">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter description..."
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table className="bg-background">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={(header.column.columnDef.meta as any)?.style}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {pagination.pageSize * pagination.pageIndex + 1} -{" "}
          {Math.min(
            pagination.pageSize * (pagination.pageIndex + 1),
            table.getFilteredRowModel().rows.length,
          )}{" "}
          of {table.getFilteredRowModel().rows.length} row(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function toggleSortFn(column: Column<any, any>) {
  const isSorted = column.getIsSorted();

  if (isSorted === false) column.toggleSorting(false);
  if (isSorted === "asc") column.toggleSorting(true);
  if (isSorted === "desc") column.clearSorting();
}

interface SortIconIndicatorProps {
  title: string;
  onClick: () => void;
  isSorted: false | "asc" | "desc";
}

function SortIconIndicator({
  title,
  onClick,
  isSorted,
}: SortIconIndicatorProps) {
  return (
    <Button variant="ghost" onClick={onClick}>
      {title}
      {!isSorted && <ChevronsUpDown className="ml-2 h-4 w-4" />}
      {isSorted === "asc" && <ArrowDown className="ml-2 h-4 w-4" />}
      {isSorted === "desc" && <ArrowUp className="ml-2 h-4 w-4" />}
    </Button>
  );
}
