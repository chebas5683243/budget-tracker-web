import { useAuthAxios } from "@/hooks/use-auth-axios";
import { Category } from "@/types/categories";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

type CreateCategoryMutation = UseMutationOptions<
  { newCategoryId: string },
  unknown,
  Partial<Category>,
  { newCategoryTempId: string }
>;

export function useCreateCategory(
  options?: Omit<CreateCategoryMutation, "mutationFn">,
) {
  const { createAuthApi } = useAuthAxios();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newCategory) => {
      const apiInstance = await createAuthApi();
      const response = await apiInstance.post<Category>(
        "/categories",
        newCategory,
      );

      return { newCategoryId: response.data.id };
    },
    onMutate: async (newCategory) => {
      const newCategoryTempId = uuidv4();

      await queryClient.cancelQueries({ queryKey: ["categories"] });

      queryClient.setQueryData<Category[]>(["categories"], (oldCategories) => {
        return [
          ...oldCategories!,
          { id: newCategoryTempId, ...newCategory } as Category,
        ];
      });

      return { newCategoryTempId };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData<Category[]>(["categories"], (oldCategories) =>
        oldCategories?.filter((cat) => cat.id !== context?.newCategoryTempId),
      );
    },
    onSuccess: (data, _, context) => {
      queryClient.setQueryData<Category[]>(["categories"], (oldCategories) =>
        oldCategories?.map((cat) =>
          cat.id === context.newCategoryTempId
            ? { ...cat, id: data.newCategoryId }
            : cat,
        ),
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    ...options,
  });

  return mutation;
}
