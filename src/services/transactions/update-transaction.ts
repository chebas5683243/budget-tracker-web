import { useAuthAxios } from "@/hooks/use-auth-axios";
import { Transaction } from "@/types/transactions";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

type UpdateTransactionRequest = Pick<Transaction, "id" | "description"> &
  Partial<Pick<Transaction, "amount" | "transactionDate">> & {
    category?: Pick<Transaction["category"], "id">;
  };

type UpdateTransactionMutation = UseMutationOptions<
  void,
  unknown,
  UpdateTransactionRequest,
  { oldTransaction: Transaction }
>;

export function useUpdateTransaction(
  options?: Omit<UpdateTransactionMutation, "mutationFn">,
) {
  const { createAuthApi } = useAuthAxios();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (updatedTransaction) => {
      const apiInstance = await createAuthApi();
      await apiInstance.patch(
        `/transactions/${updatedTransaction.id}`,
        updatedTransaction,
      );
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({
        queryKey: ["reports", "history-data"],
      });
      queryClient.invalidateQueries({
        queryKey: ["reports", "categories-overview"],
      });
    },
    ...options,
  });

  return mutation;
}
