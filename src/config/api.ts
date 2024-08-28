import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AWS_APIGATEWAY,
});

export type Api = typeof api;
