"use client";

import { api, Api } from "@/config/api";

import { useAuth } from "@clerk/nextjs";
import {
  QueryFunctionContext,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import type { GetToken } from "@clerk/types";

const createAuthApi = async (tokenGetter: GetToken) => {
  const token = await tokenGetter({
    template: "custom-jwt",
  });
  console.log(token);
  if (!token) throw new Error("User is not signed in");
  api.defaults.headers.common.Authorization = `Bearer ${token}` ?? "";
  return api;
};

type AuthQueryFunction<
  T = unknown,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = any,
> = (
  api: Api,
  context: QueryFunctionContext<TQueryKey, TPageParam>,
) => T | Promise<T>;

export function useAuthQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({
  authQueryFn,
  ...options
}: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
  authQueryFn: AuthQueryFunction<TQueryFnData, TQueryKey, unknown>;
}): UseQueryResult<TData, TError> {
  const { getToken } = useAuth();

  return useQuery({
    ...options,
    queryFn: async (args: any) => {
      const apiInstance = await createAuthApi(getToken);
      return authQueryFn(apiInstance, args);
    },
  });
}
