"use client";

import { useState } from "react";

import {
  CreateTransactionModalProps,
  EditTransactionModalProps,
  useModal,
} from "../../hooks/use-modal-store";
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useGetCategories } from "@/services/categories/get-categories";
import { CategoryType } from "@/types/categories";
import { Transaction } from "@/types/transactions";

import { CheckIcon, ChevronsUpDown, PlusSquare } from "lucide-react";

interface CategoryPickerProps {
  value: string;
  onChange: (value: string) => void;
  trannsactionType: CategoryType;
  currModal:
    | CreateTransactionModalProps["modalType"]
    | EditTransactionModalProps["modalType"];
  transactionData?: Transaction;
}

export function CategoryPicker({
  value,
  onChange,
  trannsactionType,
  currModal,
  transactionData,
}: CategoryPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen } = useModal();

  const { data: categories, isLoading } = useGetCategories();

  const categoriesToRender = categories
    ?.filter((category) => category.type === trannsactionType)
    .toSorted((cat1, cat2) => cat1.name.localeCompare(cat2.name));

  function onCreateCategory() {
    setIsOpen(false);

    let parentModal;

    if (currModal === "editTransaction") {
      parentModal = {
        modalType: currModal,
        data: transactionData,
      };
    } else {
      parentModal = {
        modalType: currModal,
      };
    }

    onOpen({
      modalType: "createCategory",
      data: {
        type: trannsactionType,
        parentModal,
      },
    });
  }

  function onSelectCategory(categoryId: string) {
    onChange(categoryId);
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between font-normal pl-3",
              !value && "text-muted-foreground",
            )}
            disabled={isLoading}
          >
            <span>
              {value
                ? categoriesToRender?.find((cat) => cat.id === value)?.name
                : "Select category"}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary gap-2 text-sm font-normal justify-start"
            onClick={onCreateCategory}
          >
            <PlusSquare className="size-4" />
            Create new
          </Button>
          <Separator />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categoriesToRender?.map((cat) => (
                <CommandItem
                  value={cat.name}
                  key={cat.id}
                  onSelect={() => onSelectCategory(cat.id)}
                >
                  {cat.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      cat.id === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
