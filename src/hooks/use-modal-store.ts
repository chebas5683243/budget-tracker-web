import type { Category, CategoryType } from "@/types/categories";
import { Transaction } from "@/types/transactions";

import { create } from "zustand";

export type CreateCategoryModalProps = {
  modalType: "createCategory";
  data?: {
    type: CategoryType;
    parentModal?: CreateTransactionModalProps | EditTransactionModalProps;
  };
};

export type EditCategoryModalProps = {
  modalType: "editCategory";
  data?: Category;
};

export type DeleteCategoryModalProps = {
  modalType: "deleteCategory";
  data?: {
    categoryId: string;
  };
};

export type CreateTransactionModalProps = {
  modalType: "createTransaction";
  data?: {
    newCategoryId?: string;
    type: CategoryType;
  };
};

export type EditTransactionModalProps = {
  modalType: "editTransaction";
  data?: Transaction & { newCategoryId?: string };
};

export type DeleteTransactionModalProps = {
  modalType: "deleteTransaction";
  data?: {
    transactionId: string;
  };
};

export type ModalProps =
  | CreateCategoryModalProps
  | EditCategoryModalProps
  | DeleteCategoryModalProps
  | CreateTransactionModalProps
  | EditTransactionModalProps
  | DeleteTransactionModalProps;
export type ModalType = ModalProps["modalType"] | null;
export type ModalData = ModalProps["data"] | null;

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
