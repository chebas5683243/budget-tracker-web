import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Timeframe } from "@/types/reports";

interface TimeframeSelectorProps {
  value: Timeframe;
  onValueChange: (value: Timeframe) => void;
}

export function TimeframeSelector({
  value,
  onValueChange,
}: TimeframeSelectorProps) {
  return (
    <ToggleGroup
      className=""
      type="single"
      value={value}
      onValueChange={onValueChange}
    >
      <ToggleGroupItem value={Timeframe.YEAR} className="capitalize">
        {Timeframe.YEAR}
      </ToggleGroupItem>
      <ToggleGroupItem value={Timeframe.MONTH} className="capitalize">
        {Timeframe.MONTH}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
