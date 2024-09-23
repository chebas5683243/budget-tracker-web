import { useAuthAxios } from "@/hooks/use-auth-axios";
import { Category } from "@/types/categories";

import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

type CategoriesQuery = UseQueryOptions<
  Category[],
  unknown,
  Category[],
  QueryKey
>;

export function useGetCategories(
  options?: Omit<CategoriesQuery, "queryKey" | "queryFn">,
) {
  const { createAuthApi } = useAuthAxios();

  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const apiInstance = await createAuthApi();
      const response = await apiInstance.get<Category[]>("/categories");
      return response.data;
    },
    ...options,
  });

  return query;
}
