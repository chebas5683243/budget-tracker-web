import { TransactionType } from "@/types/transaction";

import { create } from "zustand";

export type CreateTransactionModalProps = {
  modalType: "createTransaction";
  data?: {
    selectedCategory?: string;
    type: TransactionType;
  };
};

export type CreateTransactionCategoryModalProps = {
  modalType: "createCategory";
  data?: {
    test1?: string;
    test2: TransactionType;
  };
};

type ModalProps =
  | CreateTransactionModalProps
  | CreateTransactionCategoryModalProps;
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
