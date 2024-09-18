import { TableBody, TableCell, TableRow } from "@/components/ui/table";

interface TableRowSkeletonProps {
  nColumns: number;
}

export function TableRowSkeleton({ nColumns }: TableRowSkeletonProps) {
  return (
    <TableBody>
      <TableRow>
        {Array.from({ length: nColumns }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TableCell key={index}>
            <div className="bg-muted h-6 w-full rounded-md animate-pulse" />
          </TableCell>
        ))}
      </TableRow>
    </TableBody>
  );
}
