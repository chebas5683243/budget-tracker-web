"use client";

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

import { CheckIcon, ChevronsUpDown } from "lucide-react";

interface CategoryPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const categories = [
  { id: "1", label: "English" },
  { id: "2", label: "French" },
  { id: "3", label: "German" },
  { id: "4", label: "Spanish" },
  { id: "5", label: "Portuguese" },
  { id: "6", label: "Russian" },
  { id: "7", label: "Japanese" },
  { id: "8", label: "Korean" },
  { id: "9", label: "Chinese" },
] as const;

export function CategoryPicker({ value, onChange }: CategoryPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between font-normal pl-3",
              !value && "text-muted-foreground",
            )}
          >
            {value
              ? categories.find((language) => language.id === value)?.label
              : "Select category"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {categories.map((language) => (
                <CommandItem
                  value={language.label}
                  key={language.id}
                  onSelect={() => {
                    onChange(language.id);
                  }}
                >
                  {language.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      language.id === value ? "opacity-100" : "opacity-0",
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
