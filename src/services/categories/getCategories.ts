import { useAuthAxios } from "@/hooks/use-auth-axios";
import { Settings } from "@/types/settings";

import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

type CategoriesQuery = UseQueryOptions<Settings, unknown, Settings, QueryKey>;

export function useGetCategories(
  options?: Omit<CategoriesQuery, "queryKey" | "queryFn">,
) {
  const { createAuthApi } = useAuthAxios();

  const query = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const apiInstance = await createAuthApi();
      const response = await apiInstance.get<Settings>("/settings");
      return response.data;
    },
    ...options,
  });

  return query;
}
