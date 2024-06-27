"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { CheckIcon } from "lucide-react";

const currencies = [
  { label: "Dollar", symbol: "$" },
  { label: "Euro", symbol: "€" },
  { label: "Pound", symbol: "£" },
  { label: "Yen", symbol: "¥" },
  { label: "Rupee", symbol: "₹" },
  { label: "Yuan", symbol: "¥" },
  { label: "Won", symbol: "₩" },
  { label: "Real", symbol: "R$" },
  { label: "Peso", symbol: "$" },
];

export function CurrencyPicker() {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedCurrencyName, setSelectedCurrencyName] = useState("Dollar");

  const selectedCurrency = currencies.find(
    (c) => c.label === selectedCurrencyName,
  );

  function onSelectCurrency(currencyName: string) {
    setSelectedCurrencyName(currencyName);
    setIsOpen(false);
  }

  return (
    <Card className="p-6">
      <CardTitle className="mb-2">Currency</CardTitle>
      <CardDescription>
        Set your default currency for transactions
      </CardDescription>
      <CardContent className="p-0 mt-6">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="justify-between font-normal pl-3 w-full"
            >
              {selectedCurrency?.symbol} {selectedCurrency?.label}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-52 p-0" side="bottom" align="start">
            <Command>
              <CommandInput placeholder="Search category..." className="h-9" />
              <Separator />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {currencies.map((currency) => (
                    <CommandItem
                      value={currency.label}
                      key={currency.label}
                      onSelect={() => onSelectCurrency(currency.label)}
                    >
                      <div className="flex gap-2">
                        <span>{currency.symbol}</span>
                        <span>{currency.label}</span>
                      </div>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          currency.label === selectedCurrency?.label
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}
