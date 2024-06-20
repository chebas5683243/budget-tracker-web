import { create } from "zustand";

interface ModalStoreBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CreateIncomeCategoryModalProps extends ModalStoreBaseProps {
  type: "createIncomeCategory";
  data: {
    type: "income";
  };
  onOpen: (
    type: "createIncomeCategory",
    data: CreateIncomeCategoryModalProps["data"],
  ) => void;
}

interface CreateExpenseCategoryModalProps extends ModalStoreBaseProps {
  type: "createExpenseCategory";
  data: {
    type: "expense";
  };
  onOpen: (
    type: "createExpenseCategory",
    data: CreateExpenseCategoryModalProps["data"],
  ) => void;
}

interface EmptyModalProps extends ModalStoreBaseProps {
  type: null;
  data: {};
  onOpen: (type: any, data: {}) => void;
}

type Props =
  | EmptyModalProps
  | CreateIncomeCategoryModalProps
  | CreateExpenseCategoryModalProps;

export const useModal = create<Props>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, data, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false }),
}));
