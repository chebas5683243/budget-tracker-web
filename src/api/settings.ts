import { Api } from "../config/api";

export async function getSettings(api: Api) {
  const response = await api.get("/settings");
  return response.data;
}
