import { useAuthAxios } from "@/hooks/use-auth-axios";
import { Category } from "@/types/categories";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

type UpdateCategoryMutation = UseMutationOptions<
  void,
  unknown,
  Partial<Category>,
  { oldCategory: Category | undefined }
>;

export function useUpdateCategory(
  options?: Omit<UpdateCategoryMutation, "mutationFn">,
) {
  const { createAuthApi } = useAuthAxios();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (updatedCategory) => {
      const apiInstance = await createAuthApi();
      await apiInstance.patch(
        `/categories/${updatedCategory.id}`,
        updatedCategory,
      );
    },
    onMutate: async (updatedCategory) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });

      const previousCategories = queryClient.getQueryData<Category[]>([
        "categories",
      ]);

      const oldCategory = previousCategories?.find(
        (cat) => cat.id === updatedCategory.id,
      );

      queryClient.setQueryData<Category[]>(["categories"], (oldCategories) =>
        oldCategories?.map((cat) =>
          cat.id === updatedCategory.id ? { ...cat, ...updatedCategory } : cat,
        ),
      );

      return { oldCategory };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData<Category[]>(["categories"], (oldCategories) =>
        oldCategories?.map((cat) =>
          cat.id === context?.oldCategory?.id
            ? { ...cat, ...context.oldCategory }
            : cat,
        ),
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({
        queryKey: ["reports", "categories-overview"],
      });
    },
    ...options,
  });

  return mutation;
}
