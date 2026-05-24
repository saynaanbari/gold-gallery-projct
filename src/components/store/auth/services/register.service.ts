import api from "@/api/axios";
import { RegisterDataType, RegisterResponse } from "../types/register-data";

export async function registerService(
  data: RegisterDataType,
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/auth/register", data);
  return response.data;
}