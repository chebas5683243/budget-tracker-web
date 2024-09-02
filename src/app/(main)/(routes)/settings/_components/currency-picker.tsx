"use client";

import { useState } from "react";

import { useToast } from "@/components/hooks/use-toast";
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
import { useGetSettings } from "@/services/settings/getSettings";
import { useUpdateSettings } from "@/services/settings/updateSettings";
import { Currency } from "@/types/settings";

import { CheckIcon } from "lucide-react";

const currencies = [
  { label: "Dollar", symbol: "$", value: Currency.USD },
  { label: "Euro", symbol: "€", value: Currency.EUR },
  { label: "Nuevo Sol", symbol: "S/.", value: Currency.PEN },
  { label: "Pound", symbol: "£", value: Currency.GBP },
  { label: "Yen", symbol: "¥", value: Currency.JPY },
  { label: "Rupee", symbol: "₹", value: Currency.INR },
  { label: "Yuan", symbol: "¥", value: Currency.CNY },
  { label: "Won", symbol: "₩", value: Currency.KRW },
  { label: "Real", symbol: "R$", value: Currency.BRL },
  { label: "Peso", symbol: "$", value: Currency.MXN },
];

export function CurrencyPicker() {
  const { data: settings } = useGetSettings();
  const { toast } = useToast();

  const mutation = useUpdateSettings();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isPickerDisabled = loading || !settings;

  const selectedCurrency = currencies.find(
    (c) => c.value === settings?.currency,
  );

  async function onSelectCurrency(value: Currency) {
    try {
      toast({
        description: "Updating currency",
        variant: "loading",
      });
      setLoading(true);
      setIsOpen(false);
      await mutation.mutateAsync({ currency: value });
      toast({
        description: "Currency updated successuflly 🎉",
        variant: "success",
      });
    } catch (e) {
      toast({
        description: "Couldn't update currency. Try later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
              className="flex gap-2 justify-start font-normal pl-3 w-full"
              disabled={isPickerDisabled}
            >
              <span className="w-5 inline-flex justify-center">
                {selectedCurrency?.symbol}
              </span>
              <span>-</span>
              <span>{selectedCurrency?.label}</span>
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
                      value={currency.value}
                      key={currency.value}
                      onSelect={() => onSelectCurrency(currency.value)}
                    >
                      <div className="flex gap-2">
                        <span className="w-5 inline-flex justify-center">
                          {currency.symbol}
                        </span>
                        <span>-</span>
                        <span>{currency.label}</span>
                      </div>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          currency.value === selectedCurrency?.value
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
