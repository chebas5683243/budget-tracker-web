"use client";

import { CategoryItem } from "./category-item";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";

import { PlusSquare, TrendingDown, TrendingUp } from "lucide-react";

interface CategoryGroupProps {
  type: "income" | "expense";
}

const categories = [
  {
    id: "1",
    name: "Food",
    icon: "🍔",
  },
  {
    id: "2",
    name: "Transport",
    icon: "🚗",
  },
  {
    id: "3",
    name: "Entertainment",
    icon: "🎉",
  },
  {
    id: "4",
    name: "Health",
    icon: "🏥",
  },
  {
    id: "5",
    name: "Education",
    icon: "📚",
  },
  {
    id: "6",
    name: "Shopping",
    icon: "🛍️",
  },
  {
    id: "7",
    name: "Bills",
    icon: "💡",
  },
  {
    id: "8",
    name: "Salary",
    icon: "💰",
  },
  {
    id: "9",
    name: "Investments",
    icon: "📈",
  },
];

export function CategoryGroup({ type }: CategoryGroupProps) {
  const { onOpen } = useModal();

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
          {type === "income" && (
            <TrendingUp className="size-12 p-2 bg-emerald-400/10 text-emerald-500 rounded-lg shrink-0" />
          )}
          {type === "expense" && (
            <TrendingDown className="size-12 p-2 bg-red-400/10 text-red-500 rounded-lg shrink-0" />
          )}
          <div className="flex flex-col gap-1">
            <CardTitle>
              {type === "income" ? "Incomes" : "Expenses"} categories
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
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </CardContent>
    </Card>
  );
}
