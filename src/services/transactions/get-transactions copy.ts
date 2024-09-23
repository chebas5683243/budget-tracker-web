import { useMemo } from "react";

import { useAuthAxios } from "@/hooks/use-auth-axios";
import type { CategoryOverviewItem } from "@/types/reports";

import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

type CategoryOverviewReportQuery = UseQueryOptions<
  CategoryOverviewItem[],
  unknown,
  CategoryOverviewItem[],
  QueryKey
>;

export function useGetCategoryOverviewReport(
  params: { startDate: number; endDate: number },
  options?: Omit<CategoryOverviewReportQuery, "queryKey" | "queryFn">,
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
    queryKey: ["reports", "categories-overview", params],
    queryFn: async () => {
      const apiInstance = await createAuthApi();
      const response = await apiInstance.get<CategoryOverviewItem[]>(
        `/reports/categories-overview?${queryString}`,
      );
      return response.data;
    },
    ...options,
  });

  return query;
}
