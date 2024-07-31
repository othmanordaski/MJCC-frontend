import axiosInstance from "./axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    return await axiosInstance.post("auth/login", credentials);
  },
  register: async (credentials: RegisterCredentials) => {
    return await axiosInstance.post("auth/signup", credentials);
  },
  verifyToken: async (token: string) => {
    return await axiosInstance.get("auth/verify", {
      params: { token },
    });
  },
  forgetPasswordApi: async (email: string) => {
    return await axiosInstance.post("reset-password/request", { email });
  },
};
