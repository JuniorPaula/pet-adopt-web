import Cookies from "js-cookie";
import { api } from "./axios-service";

type Credential = {
  email: string
  password: string
}

export const loginUser = async (credentials: Credential) => {
  const response = await api.post(`/api/login`, credentials);
  const { token, user } = response.data.data;

  if (token) {
    Cookies.set("authToken", token);
  }

  return { token, user };
};
