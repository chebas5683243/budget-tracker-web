"use client";

import { useToast } from "../hooks/use-toast";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { DeleteCategoryModalProps, useModal } from "@/hooks/use-modal-store";
import { useDeleteCategory } from "@/services/categories/deleteCategory";

export function DeleteCategoryModal() {
  const { isOpen, type, data, onClose: onCloseModal } = useModal();

  const mutation = useDeleteCategory();

  const { toast } = useToast();

  const isModalOpen = isOpen && type === "deleteCategory";

  const modalData = data as DeleteCategoryModalProps["data"];

  function onOpenChange(open: boolean) {
    if (open) return;
    onClose();
  }

  function onClose() {
    onCloseModal();
  }

  async function onSubmit() {
    try {
      toast({
        description: "Deleting category",
        variant: "loading",
      });

      await mutation.mutateAsync({
        categoryId: modalData?.categoryId!,
      });

      toast({
        description: "Category deleted successuflly 🎉",
        variant: "success",
      });
    } catch (e: any) {
      const { title, description } = getErrorMessage(e);

      toast({
        title,
        description,
        variant: "destructive",
      });
    } finally {
      onClose();
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col sm:w-[500px]" hideCloseIcon>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            category
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 self-end">
          <Button
            type="button"
            variant="outline"
            disabled={mutation.isPending}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={mutation.isPending}
            onClick={onSubmit}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getErrorMessage(e: any) {
  const statusCode = e?.response?.status;
  if (statusCode === 409) {
    return {
      title: "Category is being used by transactions",
      description: "Delete or change the category in transactions.",
    };
  }

  return {
    description: "Couldn't delete category. Try later.",
  };
}
