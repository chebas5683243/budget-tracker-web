"use client";

import { useEffect, useState } from "react";

import { CreateCategoryModal } from "../modals/create-category-modal";
import { CreateTransactionModal } from "../modals/create-transaction-modal";
import { DeleteCategoryModal } from "../modals/delete-category-modal";
import { EditCategoryModal } from "../modals/edit-category-modal";
import { EditTransactionModal } from "../modals/edit-transaction-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateCategoryModal />
      <EditCategoryModal />
      <DeleteCategoryModal />
      <CreateTransactionModal />
      <EditTransactionModal />
    </>
  );
}
