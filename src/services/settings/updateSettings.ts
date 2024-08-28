import { useAuthAxios } from "@/hooks/use-auth-axios";
import { Settings } from "@/types/settings";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

type SettingsMutation = UseMutationOptions<
  void,
  unknown,
  Partial<Settings>,
  { previousSettings: Settings | undefined }
>;

export function useUpdateSettings(
  options?: Omit<SettingsMutation, "mutationFn">,
) {
  const { createAuthApi } = useAuthAxios();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newSettings) => {
      const apiInstance = await createAuthApi();
      await apiInstance.patch<Settings>("/settings", newSettings);
    },
    onMutate: async (newSettings) => {
      await queryClient.cancelQueries({ queryKey: ["settings"] });

      const previousSettings = queryClient.getQueryData<Settings>(["settings"]);

      queryClient.setQueryData(["settings"], (oldSettings: Settings) => ({
        ...oldSettings,
        ...newSettings,
      }));

      return { previousSettings };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["settings"], context?.previousSettings);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    ...options,
  });

  return mutation;
}
