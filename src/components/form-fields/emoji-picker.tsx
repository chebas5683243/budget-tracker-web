import { useState } from "react";

import { Button } from "../ui/button";
import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { CircleOff } from "lucide-react";

interface EmojiPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function EmojiPicker({ value, onChange }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  function onEmojiSelect(emoji: any) {
    setIsOpen(false);
    onChange(emoji.native);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className="font-normal w-full flex flex-col h-28 justify-around text-muted-foreground py-2"
          >
            {value ? (
              <span className="text-5xl">{value}</span>
            ) : (
              <CircleOff className="size-12 shrink-0" />
            )}
            <span className="text-xs">
              Click to {value ? "change" : "select"}
            </span>
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Picker data={data} onEmojiSelect={onEmojiSelect} />
      </PopoverContent>
    </Popover>
  );
}
