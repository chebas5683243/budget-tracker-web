import { useAuthAxios } from "@/hooks/use-auth-axios";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

type DeleteTransactionMutation = UseMutationOptions<
  void,
  unknown,
  { transactionId: string },
  void
>;

export function useDeleteTransaction(
  options?: Omit<DeleteTransactionMutation, "mutationFn">,
) {
  const { createAuthApi } = useAuthAxios();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ transactionId }) => {
      const apiInstance = await createAuthApi();
      await apiInstance.delete(`/transactions/${transactionId}`);
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
