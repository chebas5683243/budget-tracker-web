import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { Transaction } from "@/types/transactions";

import { EllipsisIcon, Pencil, Trash } from "lucide-react";

interface TransactionActionsProps {
  transaction: Transaction;
}

export function TransactionActions({ transaction }: TransactionActionsProps) {
  const openModal = useModal((state) => state.onOpen);

  function onEdit() {
    openModal({
      modalType: "editTransaction",
      data: transaction,
    });
  }

  function onDelete() {
    openModal({
      modalType: "deleteTransaction",
      data: {
        transactionId: transaction.id,
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2">
          <EllipsisIcon className="size-6 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex gap-2" onClick={onEdit}>
            <Pencil className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2 text-red-400 focus:bg-red-400/20 focus:text-red-400"
            onClick={onDelete}
          >
            <Trash className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
