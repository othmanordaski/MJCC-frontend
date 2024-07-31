import React from "react";
import { useState } from "react";
import { authApi, LoginCredentials, RegisterCredentials } from "../api/auth";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

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
      return response;
    } catch (err) {
      setError("register failed . Please try again.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  const forgotPassword = async (email: string) => {
    try {
      const response = await authApi.forgetPasswordApi(email);
      return response;
    } catch (err) {
      setError("Forgot password failed. Please try again.");
      throw err;
    }
  };
  return {
    login,
    signup,
    forgotPassword,
    isLoading,
    error,
    loginOpen,
    handleLoginOpen,
    handleLoginClose,
  };
};
