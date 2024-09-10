"use client";

import { useEffect, useState } from "react";

import { CreateCategoryModal } from "../modals/create-category-modal";
import { CreateTransactionModal } from "../modals/create-transaction-modal";
import { EditCategoryModal } from "../modals/edit-category-modal";

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
      <CreateTransactionModal />
      <CreateCategoryModal />
      <EditCategoryModal />
    </>
  );
}
