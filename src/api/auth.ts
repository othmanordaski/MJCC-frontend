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
    return await axiosInstance.post("/login", credentials);
  },
  register: async (credentials: RegisterCredentials) => {
    return await axiosInstance.post("/signup", credentials);
  },
  logout: () => {
    axiosInstance.post("/logout");
  },
};
