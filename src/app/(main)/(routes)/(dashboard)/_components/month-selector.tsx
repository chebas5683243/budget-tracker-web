import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getMonthName } from "@/lib/utils";

interface MonthSelectorProps {
  months: number[];
  value: number;
  onValueChange: (month: number) => void;
}

export function MonthSelector({
  months,
  value,
  onValueChange,
}: MonthSelectorProps) {
  return (
    <Select
      value={value.toString()}
      onValueChange={(month) => onValueChange(Number(month))}
    >
      <SelectTrigger className="flex-1 max-w-[180px] basis-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {months.map((month) => (
          <SelectItem key={month} value={month.toString()}>
            {getMonthName(month)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
