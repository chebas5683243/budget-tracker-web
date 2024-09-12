import { Card } from "@/components/ui/card";

export function CategoryItemSkeleton() {
  return (
    <Card className="relative group flex h-28">
      <div className="flex flex-col justify-center items-center w-full p-4 gap-2 select-none animate-pulse">
        <div className="size-12 bg-muted rounded-full" />
        <div className="bg-muted h-6 w-28 rounded-md" />
      </div>
    </Card>
  );
}
