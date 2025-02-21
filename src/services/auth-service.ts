import Cookies from "js-cookie";
import { createApi } from "./axios-service";

type Credential = {
  email: string
  password: string
}

export const loginUser = async (credentials: Credential) => {
  const api = await createApi();
  const response = await api.post(`/api/login`, credentials);
  const { token, user } = response.data.data;

  if (token) {
    Cookies.set("authToken", token);
  }

  return { token, user };
};
