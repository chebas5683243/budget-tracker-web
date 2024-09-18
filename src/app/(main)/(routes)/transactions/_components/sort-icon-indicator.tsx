import { Button } from "@/components/ui/button";

import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

interface SortIconIndicatorProps {
  title: string;
  onClick: () => void;
  isSorted: false | "asc" | "desc";
}

export function SortIconIndicator({
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
