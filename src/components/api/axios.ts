import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_API;

export async function api(url: string, data?: any, method?: "GET" | "POST") {
  return await axios({
    method: method || "GET",
    baseURL: baseUrl,
    url: url,
    data: data,
  });
}
