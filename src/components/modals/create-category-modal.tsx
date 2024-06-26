import { usePathname } from "next/navigation";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "../ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CreateCategoryModalProps, useModal } from "@/hooks/use-modal-store";

export function CreateCategoryModal() {
  const pathname = usePathname();

  const { isOpen, onOpen, type, data } = useModal();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const isModalOpen = isOpen && type === "createCategory";

  const modalData = data as CreateCategoryModalProps["data"];

  function handleOnOpenChange(open: boolean) {
    if (open) return;

    if (pathname === "/") {
      onOpen({
        modalType: "createTransaction",
        data: {
          type: modalData?.type!,
        },
      });
    }
  }

  if (isDesktop) {
    return (
      <Dialog open={isModalOpen} onOpenChange={handleOnOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cat {modalData?.type}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isModalOpen} onOpenChange={handleOnOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Cat {modalData?.type}</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
