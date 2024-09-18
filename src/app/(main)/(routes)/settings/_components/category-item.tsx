import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { Category } from "@/types/categories";

import { EllipsisVertical, Pencil, Trash } from "lucide-react";

interface CategoryItemProps {
  category: Category;
}

export function CategoryItem({ category }: CategoryItemProps) {
  const { onOpen } = useModal();

  function onEdit() {
    onOpen({
      modalType: "editCategory",
      data: category,
    });
  }

  function onDelete() {
    onOpen({
      modalType: "deleteCategory",
      data: {
        categoryId: category.id,
      },
    });
  }

  return (
    <Card className="relative group flex hover:bg-muted-foreground/10 hover:cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="absolute top-1 right-1">
          <Button
            variant="ghost"
            className="invisible group-hover:visible p-2 transition group-hover:opacity-100 opacity-0 scale-0 group-hover:scale-100"
          >
            <EllipsisVertical className="size-6 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex gap-2" onClick={onEdit}>
              <Pencil className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 text-red-400 focus:bg-red-400/20 focus:text-red-400"
              onClick={onDelete}
            >
              <Trash className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-col justify-center items-center w-full p-4 gap-2 select-none">
        <span className="text-5xl">{category.icon}</span>
        <span>{category.name}</span>
      </div>
    </Card>
  );
}
