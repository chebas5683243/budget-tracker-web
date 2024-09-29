import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface YearSelectorProps {
  years: number[];
  value: number;
  onValueChange: (year: number) => void;
}

export function YearSelector({
  years,
  value,
  onValueChange,
}: YearSelectorProps) {
  return (
    <Select
      value={value.toString()}
      onValueChange={(year) => onValueChange(Number(year))}
    >
      <SelectTrigger className="flex-1 max-w-[180px] basis-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
