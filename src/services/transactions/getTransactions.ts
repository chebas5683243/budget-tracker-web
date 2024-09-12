import { useAuthAxios } from "@/hooks/use-auth-axios";
import { Transaction } from "@/types/transactions";

import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

type TransactionsQuery = UseQueryOptions<
  Transaction[],
  unknown,
  Transaction[],
  QueryKey
>;

export function useGetTransactions(
  options?: Omit<TransactionsQuery, "queryKey" | "queryFn">,
) {
  const { createAuthApi } = useAuthAxios();

  const query = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const apiInstance = await createAuthApi();
      const response = await apiInstance.get<Transaction[]>("/transactions");
      return response.data;
    },
    ...options,
  });

  return query;
}
