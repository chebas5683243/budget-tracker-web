import { useMemo } from "react";

import { useAuthAxios } from "@/hooks/use-auth-axios";
import { HistoryDataRecord, Timeframe } from "@/types/reports";

import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

type HistoryDataQuery = UseQueryOptions<
  HistoryDataRecord[],
  unknown,
  HistoryDataRecord[],
  QueryKey
>;

export function useGetHistoryData(
  params: { timeframe: Timeframe; year: number; month: number },
  options?: Omit<HistoryDataQuery, "queryKey" | "queryFn">,
) {
  const { createAuthApi } = useAuthAxios();

  const { timeframe, year, month } = params;

  const queryString = useMemo(() => {
    const timezoneOffset = new Date().getTimezoneOffset();

    if (timeframe === Timeframe.YEAR) {
      return new URLSearchParams({
        timeframe,
        year: year.toString(),
        timezoneOffset: timezoneOffset.toString(),
      }).toString();
    }

    return new URLSearchParams({
      timeframe,
      year: year.toString(),
      month: month.toString(),
      timezoneOffset: timezoneOffset.toString(),
    }).toString();
  }, [timeframe, year, month]);

  const query = useQuery({
    queryKey: ["reports", "history-data", params],
    queryFn: async () => {
      const apiInstance = await createAuthApi();
      const response = await apiInstance.get<HistoryDataRecord[]>(
        `/reports/history-data?${queryString}`,
      );
      return response.data;
    },
    ...options,
  });

  return query;
}
