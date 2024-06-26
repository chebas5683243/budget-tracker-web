"use client";

import { CategoryPicker } from "../form-fields/category-picker";
import { DatePicker } from "../form-fields/date-picker";
import { Button } from "../ui/button";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { CreateTransactionModalProps, useModal } from "@/hooks/use-modal-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  description: z.string().optional(),
  amount: z.number().min(1, "Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  transactionDate: z.date(),
});

type FormData = z.infer<typeof FormSchema>;

export function CreateTransactionModal() {
  const { isOpen, type, data, onClose } = useModal();

  const isModalOpen = isOpen && type === "createTransaction";

  const modalData = data as CreateTransactionModalProps["data"];

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
      amount: 0,
    },
  });

  function onOpenChange(open: boolean) {
    if (open) return;
    onClose();
    form.reset();
  }

  function onSubmit(formData: FormData) {
    console.log(formData);
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-[450px]">
        <DialogHeader>
          <DialogTitle>
            Create a new{" "}
            <span
              className={
                modalData?.type === "income"
                  ? "text-emerald-500"
                  : "text-red-500"
              }
            >
              {modalData?.type}
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
                    value={field.value}
                    onChange={(categoryId) =>
                      form.setValue("category", categoryId)
                    }
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
                    onChange={(date) => form.setValue("transactionDate", date)}
                    value={field.value}
                  />
                  <FormDescription>Select a date for this</FormDescription>
                </FormItem>
              )}
            />
            <div className="flex gap-2 self-end">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
