import api from "@/api/axios";
import { LoginRequest, LoginResponse } from "../types/login-data";

export async function loginService(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
}
