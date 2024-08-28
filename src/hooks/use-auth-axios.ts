import { api } from "@/config/api";

import { useAuth } from "@clerk/nextjs";

export function useAuthAxios() {
  const { getToken } = useAuth();

  async function createAuthApi() {
    const token = await getToken({
      template: "custom-jwt",
    });

    if (!token) throw new Error("User is not signed in");

    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return api;
  }

  return { createAuthApi };
}
