export type Role = "admin" | "user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
}

export interface LoginResponseData {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}