import { useAuthAxios } from "@/hooks/use-auth-axios";
import { Settings } from "@/types/settings";

import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

type SettingsQuery<TData> = UseQueryOptions<Settings, unknown, TData, QueryKey>;

export function useGetSettings<TData = Settings>(
  options?: Omit<SettingsQuery<TData>, "queryKey" | "queryFn">,
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
