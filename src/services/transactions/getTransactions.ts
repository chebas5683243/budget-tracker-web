import { useMemo } from "react";

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
  params: { startDate: number; endDate: number },
  options?: Omit<TransactionsQuery, "queryKey" | "queryFn">,
) {
  const { createAuthApi } = useAuthAxios();

  const { startDate, endDate } = params;

  const queryString = useMemo(
    () =>
      new URLSearchParams({
        startDate: startDate.toString(),
        endDate: endDate.toString(),
      }).toString(),
    [startDate, endDate],
  );

  const query = useQuery({
    queryKey: ["transactions", queryString],
    queryFn: async () => {
      const apiInstance = await createAuthApi();
      const response = await apiInstance.get<Transaction[]>(
        `/transactions?${queryString}`,
      );
      return response.data;
    },
    ...options,
  });

  return query;
}
