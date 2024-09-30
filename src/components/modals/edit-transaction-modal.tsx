"use client";

import { useEffect } from "react";

import { CategoryPicker } from "../form-fields/category-picker";
import { DatePicker } from "../form-fields/date-picker";
import { useToast } from "../hooks/use-toast";
import { Button } from "../ui/button";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { EditTransactionModalProps, useModal } from "@/hooks/use-modal-store";
import { useUpdateTransaction } from "@/services/transactions/update-transaction";
import { CategoryType } from "@/types/categories";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  description: z.string().optional(),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  transactionDate: z.number(),
});

type FormData = z.infer<typeof FormSchema>;

export function EditTransactionModal() {
  const { isOpen, type, data, onClose: onCloseModal } = useModal();

  const mutation = useUpdateTransaction();

  const { toast } = useToast();

  const isModalOpen = isOpen && type === "editTransaction";

  const modalData = data as EditTransactionModalProps["data"];

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
      amount: 0,
      category: undefined,
      transactionDate: undefined,
    },
  });

  const { reset: resetForm } = form;

  function onOpenChange(open: boolean) {
    if (open) return;
    onClose();
  }

  function resetFieldValues() {
    resetForm({
      description: "",
      amount: 0,
      category: undefined,
      transactionDate: new Date().getTime(),
    });
  }

  function onClose() {
    resetFieldValues();
    onCloseModal();
  }

  async function onSubmit() {
    try {
      toast({
        description: "Updating category",
        variant: "loading",
      });

      await mutation.mutateAsync({
        id: modalData?.id!,
        amount: Number(form.getValues("amount")),
        category: {
          id: form.getValues("category"),
        },
        description: form.getValues("description"),
        transactionDate: form.getValues("transactionDate"),
      });

      toast({
        description: "Category updated successuflly 🎉",
        variant: "success",
      });

      onClose();
    } catch (e) {
      toast({
        description: "Couldn't update category. Try later.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    if (modalData?.amount && modalData.category && modalData.transactionDate) {
      resetForm({
        amount: modalData.amount,
        category: modalData.newCategoryId ?? modalData.category.id,
        transactionDate: modalData.transactionDate,
        description: modalData.description,
      });
    }
  }, [resetForm, modalData]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-[450px]">
        <DialogHeader>
          <DialogTitle>
            Edit{" "}
            <span
              className={
                modalData?.category?.type === CategoryType.INCOME
                  ? "text-emerald-500"
                  : "text-red-500"
              }
            >
              {modalData?.category?.type}
            </span>{" "}
            transaction
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description{" "}
                    <span className="text-xs text-muted-foreground">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Transaction description</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormDescription>Transaction amount</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Category</FormLabel>
                  <CategoryPicker
                    trannsactionType={modalData?.category?.type!}
                    value={field.value}
                    onChange={(categoryId) =>
                      form.setValue("category", categoryId)
                    }
                    currModal="editTransaction"
                    transactionData={modalData}
                  />
                  <FormDescription>
                    Select a category for this transaction
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Transaction date</FormLabel>
                  <DatePicker
                    onChange={(date) =>
                      form.setValue("transactionDate", date.getTime())
                    }
                    value={new Date(field.value)}
                  />
                  <FormDescription>Select a date for this</FormDescription>
                </FormItem>
              )}
            />
            <div className="flex gap-2 self-end">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
