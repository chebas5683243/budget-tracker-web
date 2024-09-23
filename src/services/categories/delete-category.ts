import { useAuthAxios } from "@/hooks/use-auth-axios";
import { Category } from "@/types/categories";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

type DeleteCategoryMutation = UseMutationOptions<
  void,
  unknown,
  { categoryId: string },
  void
>;

export function useDeleteCategory(
  options?: Omit<DeleteCategoryMutation, "mutationFn">,
) {
  const { createAuthApi } = useAuthAxios();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ categoryId }) => {
      const apiInstance = await createAuthApi();
      await apiInstance.delete(`/categories/${categoryId}`);
    },
    onSuccess: (data, { categoryId }) => {
      queryClient.setQueryData<Category[]>(["categories"], (oldCategories) =>
        oldCategories?.filter((cat) => cat.id !== categoryId),
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    ...options,
  });

  return mutation;
}
