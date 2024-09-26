import { useAuthAxios } from "@/hooks/use-auth-axios";

import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

type HistoryPeriodsQuery = UseQueryOptions<
  number[],
  unknown,
  number[],
  QueryKey
>;

export function useGetHistoryPeriods(
  options?: Omit<HistoryPeriodsQuery, "queryKey" | "queryFn">,
) {
  const { createAuthApi } = useAuthAxios();

  const query = useQuery({
    queryKey: ["reports", "history-periods"],
    queryFn: async () => {
      const apiInstance = await createAuthApi();
      const response = await apiInstance.get<number[]>(
        "/reports/history-periods",
      );
      return response.data;
    },
    ...options,
  });

  return query;
}
