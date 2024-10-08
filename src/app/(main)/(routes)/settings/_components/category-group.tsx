"use client";

import { CategoryItem } from "./category-item";
import { CategoryItemSkeleton } from "./category-item-skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { useGetCategories } from "@/services/categories/get-categories";
import { CategoryType } from "@/types/categories";

import { PlusSquare, TrendingDown, TrendingUp } from "lucide-react";

interface CategoryGroupProps {
  type: CategoryType;
}

export function CategoryGroup({ type }: CategoryGroupProps) {
  const { onOpen } = useModal();

  const { data: categories, isLoading } = useGetCategories();

  const categoriesToRender = categories
    ?.filter((category) => category.type === type)
    .toSorted((cat1, cat2) => cat1.name.localeCompare(cat2.name));

  function onOpenCreateCategoryModal() {
    onOpen({
      modalType: "createCategory",
      data: {
        type,
      },
    });
  }

  return (
    <Card>
      <div className="flex flex-wrap justify-between items-center p-6 gap-y-4">
        <div className="flex gap-2 items-center">
          {type === CategoryType.INCOME && (
            <TrendingUp className="size-12 p-2 bg-emerald-400/10 text-emerald-500 rounded-lg shrink-0" />
          )}
          {type === CategoryType.EXPENSE && (
            <TrendingDown className="size-12 p-2 bg-red-400/10 text-red-500 rounded-lg shrink-0" />
          )}
          <div className="flex flex-col gap-1">
            <CardTitle>
              {type === CategoryType.INCOME ? "Incomes" : "Expenses"} categories
            </CardTitle>
            <CardDescription className="font-medium">
              Sorted by name
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <Button className="gap-2" onClick={onOpenCreateCategoryModal}>
            <PlusSquare className="size-4" />
            <span>Create</span>
          </Button>
        </div>
      </div>
      <Separator />
      <CardContent className="grid grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 gap-2">
        {isLoading &&
          Array.from({ length: 2 }).map(() => <CategoryItemSkeleton />)}
        {categoriesToRender?.length === 0 && (
          <div className="flex flex-col h-28 sm:col-span-2 md:col-span-3 lg:col-span-4 justify-center items-center">
            <p>
              No
              <span
                className={cn(
                  "m-1",
                  type === CategoryType.INCOME
                    ? "text-emerald-500"
                    : "text-red-500",
                )}
              >
                {type.toLowerCase()}
              </span>
              categories yet
            </p>
            <p className="text-sm text-muted-foreground">
              Create one to get started
            </p>
          </div>
        )}
        {categoriesToRender?.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </CardContent>
    </Card>
  );
}
