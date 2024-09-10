import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { EmojiPicker } from "../form-fields/emoji-picker";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { EditCategoryModalProps, useModal } from "@/hooks/use-modal-store";
import { CategoryType } from "@/types/categories";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.string().min(1, "Icon is required"),
  type: z.nativeEnum(CategoryType),
});

type FormData = z.infer<typeof FormSchema>;

export function EditCategoryModal() {
  const pathname = usePathname();

  const { isOpen, onOpen, type, data, onClose: onCloseModal } = useModal();

  const isModalOpen = isOpen && type === "editCategory";

  const modalData = data as EditCategoryModalProps["data"];

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  const { reset: resetForm } = form;

  function onOpenChange(open: boolean) {
    if (open) return;
    onClose();
  }

  function onClose() {
    resetForm();

    if (pathname === "/") {
      onOpen({
        modalType: "createTransaction",
        data: { type: modalData?.type! },
      });
      return;
    }

    onCloseModal();
  }

  function onSubmit() {
    resetForm();
    onOpen({
      modalType: "createTransaction",
      data: { type: modalData?.type!, category: "2" },
    });
  }

  useEffect(() => {
    if (modalData?.type && modalData.icon && modalData.name) {
      resetForm({
        name: modalData.name,
        icon: modalData.icon,
        type: modalData.type,
      });
    }
  }, [resetForm, modalData?.type, modalData?.icon, modalData?.name]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-[450px]">
        <DialogHeader>
          <DialogTitle>
            Create{" "}
            <span
              className={
                modalData?.type === CategoryType.INCOME
                  ? "text-emerald-500"
                  : "text-red-500"
              }
            >
              {modalData?.type}
            </span>{" "}
            category
          </DialogTitle>
          <DialogDescription>
            Categories are used to group your transactions
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Category" />
                  </FormControl>
                  <FormDescription>
                    This is how your category will appear in the app
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <EmojiPicker
                    value={field.value}
                    onChange={(emoji) => form.setValue("icon", emoji)}
                  />
                  <FormDescription>Make this category unique!</FormDescription>
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
