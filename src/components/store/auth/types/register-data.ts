export type RegisterDataType = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export type UserRole = "user" | "admin";

export type RegisterResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
      role: UserRole;
    };
    token: string;
    refreshToken: string;
  };
};