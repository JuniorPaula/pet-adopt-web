import axios from "axios";
import Cookies from "js-cookie";
import { cookies } from "next/headers";

export const createApi = async () => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  const s_cookie = await cookies();
  let token = s_cookie.get("authToken")?.value;

  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        token = Cookies.get("authToken");
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
};