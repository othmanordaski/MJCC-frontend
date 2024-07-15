import { useState } from "react";
import { authApi, LoginCredentials, RegisterCredentials } from "../api/auth";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.login(credentials);
      return response;
    } catch (err) {
      setError("Login failed. Please try again.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const signup = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.register(credentials);
      console.log(response);
    } catch (err) {
      setError("register failed . Please try again.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  return { login, signup, isLoading, error };
};
