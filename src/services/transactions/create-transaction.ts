import { useAuthAxios } from "@/hooks/use-auth-axios";
import { Category } from "@/types/categories";
import { Transaction } from "@/types/transactions";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

type CreateTransactionRequest = Pick<
  Transaction,
  "amount" | "description" | "transactionDate"
> & {
  category: Pick<Category, "id">;
};

type CreateTransactionMutation = UseMutationOptions<
  { newTransactionId: string },
  unknown,
  CreateTransactionRequest,
  { newTransactionTempId: string }
>;

export function useCreateTransaction(
  options?: Omit<CreateTransactionMutation, "mutationFn">,
) {
  const { createAuthApi } = useAuthAxios();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTransaction) => {
      const apiInstance = await createAuthApi();
      const response = await apiInstance.post<Transaction>(
        "/transactions",
        newTransaction,
      );

      return { newTransactionId: response.data.id };
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    ...options,
  });

  return mutation;
}
