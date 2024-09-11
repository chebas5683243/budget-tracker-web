import type { CategoryType } from "@/types/categories";

import { create } from "zustand";

export type CreateTransactionModalProps = {
  modalType: "createTransaction";
  data?: {
    category?: string;
    type: CategoryType;
  };
};

export type CreateCategoryModalProps = {
  modalType: "createCategory";
  data?: {
    type: CategoryType;
  };
};

export type EditCategoryModalProps = {
  modalType: "editCategory";
  data?: {
    id: string;
    name: string;
    icon: string;
    type: CategoryType;
  };
};

export type DeleteCategoryModalProps = {
  modalType: "deleteCategory";
  data?: {
    categoryId: string;
  };
};

type ModalProps =
  | CreateTransactionModalProps
  | CreateCategoryModalProps
  | EditCategoryModalProps
  | DeleteCategoryModalProps;
type ModalType = ModalProps["modalType"] | null;
type ModalData = ModalProps["data"] | null;

interface ModalStore {
  type: ModalType;
  data: ModalData;
  isOpen: boolean;
  onOpen: (props: ModalProps) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: null,
  isOpen: false,
  onOpen: (props) =>
    set({ type: props.modalType, data: props.data, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false, data: null }),
}));
