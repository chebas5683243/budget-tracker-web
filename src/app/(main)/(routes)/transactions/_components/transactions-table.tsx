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

type Transaction = {
  id: string;
  amount: number;
  description: string;
  date: number;
  type: "expense" | "income";
  category: string;
  categoryIcon: string;
};

const data: Transaction[] = [
  {
    id: "495a7683-b9c0-4e2d-9b5d-52c908f9919d",
    amount: 2000,
    description: "asd",
    date: 1623945600000,
    type: "expense",
    category: "test12312",
    categoryIcon: "😐",
  },
  {
    id: "73b011fe-179d-4df6-8839-ee826d6351bc",
    amount: 4000,
    description: "",
    date: 1623945600000,
    type: "income",
    category: "123123",
    categoryIcon: "🫢",
  },
  {
    id: "3b2b8b3e-b1f5-4ce4-9c08-42c8503840a0",
    amount: 1234,
    description: "12312",
    date: 1623945600000,
    type: "income",
    category: "aaa",
    categoryIcon: "🥲",
  },
  {
    id: "3916567c-2004-4951-8c8b-76be6e589f64",
    amount: 11,
    description: "asdasd",
    date: 1623945600000,
    type: "income",
    category: "123123",
    categoryIcon: "🫢",
  },
  {
    id: "af12117d-477a-45b5-a5a7-c39c5c056d26",
    amount: 2000,
    description: "asd",
    date: 1623945600000,
    type: "income",
    category: "asd",
    categoryIcon: "😜",
  },
  {
    id: "4d159bb2-1b26-40b9-92f3-990ee569ba42",
    amount: 1000,
    description: "test 2",
    date: 1623945600000,
    type: "income",
    category: "o_ O",
    categoryIcon: "😆",
  },
  {
    id: "513ca573-b694-4b5a-81be-ab682c334c5f",
    amount: 23,
    description: "test2",
    date: 1623945600000,
    type: "expense",
    category: "test12312",
    categoryIcon: "😐",
  },
  {
    id: "127c103a-be7f-4369-ad30-8d47ae63b51e",
    amount: 1000,
    description: "test",
    date: 1623945600000,
    type: "income",
    category: "o_ O",
    categoryIcon: "😆",
  },
];

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
    cell: ({ row }) =>
      `${row.original.categoryIcon} ${row.getValue("category")}`,
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
    cell: ({ row }) => (
      <div
        className={cn(
          "capitalize p-2 rounded-lg text-center max-w-32 m-auto",
          row.getValue("type") === "expense"
            ? "bg-red-400/10 text-red-500"
            : "bg-emerald-400/10 text-emerald-500",
        )}
      >
        {row.getValue("type")}
      </div>
    ),
    meta: {
      style: {
        textAlign: "center",
      },
    },
  },
];

const allData = [...data, ...data, ...data, ...data, ...data, ...data, ...data];

export function DataTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: allData,
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
