import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

// Schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Types
type LoginFormData = z.infer<typeof loginSchema>;
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Component
const Login: React.FC = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { login, forgotPassword } = useAuth();
  const { isModalOpen, closeModal, loginAuth } = useAuthContext();
  console.log("test", isModalOpen);
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { isSubmitting: isLoginSubmitting, errors: loginErrors },
    reset: resetLoginForm,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: forgotPasswordRegister,
    handleSubmit: handleForgotPasswordSubmit,
    formState: {
      isSubmitting: isForgotPasswordSubmitting,
      errors: forgotPasswordErrors,
    },
    reset: resetForgotPasswordForm,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const setToken = (token: string) => {
    Cookies.set("auth_token", JSON.stringify(token), {
      path: "/",
      sameSite: "lax",
    });
  };

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      setToken(response.data.access_token);
      toast.success("Connexion effectuée avec succès.", {
        autoClose: 2000,
        progress: undefined,
      });
      closeModal();
      resetLoginForm();
      loginAuth();
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response.status === 401) {
        toast.error("Email ou mot de passe incorrect", { progress: undefined });
      } else {
        toast.error("Une erreur s'est produite, veuillez réessayer", {
          progress: undefined,
        });
      }
    }
  };

  const onForgotPasswordSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await forgotPassword(data.email);
      if (response.status !== 200) {
        toast.error("Une erreur s'est produite, veuillez réessayer", {
          progress: undefined,
        });
      } else {
        toast.success(
          "Un email de réinitialisation de mot de passe vous a été envoyé.",
          { progress: undefined }
        );
      }

      setIsForgotPassword(false);
      resetForgotPasswordForm();
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Une erreur s'est produite, veuillez réessayer", {
        progress: undefined,
      });
    }
  };

  const handleClose = () => {
    closeModal();
    setIsForgotPassword(false);
    resetLoginForm();
    resetForgotPasswordForm();
  };

  const renderInput = (
    name: "email" | "password",
    register: any,
    errors: any,
    type: string,
    placeholder: string
  ) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="border border-gray-400 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 focus:border-transparent"
      />
      {errors[name] && (
        <p className="text-sm text-red-500 mt-1">{errors[name].message}</p>
      )}
    </div>
  );

  const renderForm = () => (
    <form
      onSubmit={
        isForgotPassword
          ? handleForgotPasswordSubmit(onForgotPasswordSubmit)
          : handleLoginSubmit(onLoginSubmit)
      }
      className="w-full max-w-md bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
    >
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-start">
          <img
            className="h-14 w-auto"
            src="https://mjcc.gov.ma/wp-content/uploads/2021/12/mjcc_black.svg"
            alt="MJCC Logo"
          />
          <div
            className="hover:bg-gray-200 p-2 rounded-full cursor-pointer"
            onClick={handleClose}
          >
            <TfiClose />
          </div>
        </div>

        {renderInput(
          "email",
          isForgotPassword ? forgotPasswordRegister : loginRegister,
          isForgotPassword ? forgotPasswordErrors : loginErrors,
          "email",
          "Your email"
        )}

        {!isForgotPassword &&
          renderInput(
            "password",
            loginRegister,
            loginErrors,
            "password",
            "Your password"
          )}

        {!isForgotPassword && (
          <button
            type="button"
            className="text-orange-500 text-sm text-right hover:underline"
            onClick={() => setIsForgotPassword(true)}
          >
            Mot de passe oublié ?
          </button>
        )}

        <button
          className="p-2 bg-orange-500 rounded-lg text-white px-3 py-2"
          type="submit"
        >
          {(
            isForgotPassword ? isForgotPasswordSubmitting : isLoginSubmitting
          ) ? (
            <div className="flex justify-center items-center text-white">
              <CircularProgress sx={{ color: "white" }} size={24} />
            </div>
          ) : isForgotPassword ? (
            "Réinitialiser le mot de passe"
          ) : (
            "Se connecter"
          )}
        </button>

        {isForgotPassword ? (
          <button
            type="button"
            className="text-orange-500 text-sm text-center hover:underline"
            onClick={() => setIsForgotPassword(false)}
          >
            Retour à la connexion
          </button>
        ) : (
          <div className="flex justify-center items-center gap-2">
            <p className="text-sm text-center">Pas encore de compte ?</p>
            <button
              type="button"
              className="text-base text-orange-500 hover:underline"
              onClick={() => navigate("/auth/signup")}
            >
              S'inscrire
            </button>
          </div>
        )}
      </div>
    </form>
  );

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="login-modal"
      aria-describedby="login-form"
      className="flex items-center justify-center"
    >
      {renderForm()}
    </Modal>
  );
};

export default Login;
