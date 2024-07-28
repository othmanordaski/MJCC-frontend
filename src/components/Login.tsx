import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../hooks/useAuth";
import Modal from "@mui/material/Modal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";

const loginSchema = z.object({
  email: z.string().email("invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
type loginFormData = z.infer<typeof loginSchema>;
interface LoginProps {
  open: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const navigte = useNavigate();
  const setToken = (token: string) => {
    Cookies.set("access_token", JSON.stringify(token), {
      path: "/",
      sameSite: "lax",
    });
  };
  const { login } = useAuth();
  const onSubmit = async (data: loginFormData) => {
    try {
      const response = await login(data);
      setToken(response.data.access_token);
      navigte("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="login-modal"
        aria-describedby="login-form"
        className="flex items-center justify-center "
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 "
        >
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-start">
              <img
                className="h-14 w-auto"
                src="https://mjcc.gov.ma/wp-content/uploads/2021/12/mjcc_black.svg"
                alt="MJCC Logo"
              />
              <div
                className="hover:bg-gray-200 p-2 rounded-full"
                onClick={onClose}
              >
                <TfiClose />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-base font-semibold">
                Email
              </label>
              <input
                {...register("email")}
                aria-label="email"
                type="email"
                placeholder="your email"
                className=" border border-gray-400 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500  focus:ring-offset-1 focus:border-transparent"
              />
              {errors.email && (
                <p className=" text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-base font-semibold">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="your password"
                className=" border border-gray-400 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500  focus:ring-offset-1 focus:border-transparent"
              />
              {errors.password && (
                <p className=" text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="button"
              className="text-orange-500 text-sm text-right hover:underline"
            >
              Mot de passe oublié ?
            </button>
            <button
              className="p-2 bg-orange-500 rounded-lg text-white px-3 py-2 "
              type="submit"
            >
              {isSubmitting ? (
                <div className="flex justify-center items-center text-white">
                  <CircularProgress sx={{ color: "white" }} size={24} />
                </div>
              ) : (
                "se connecter"
              )}
            </button>
            <div className="flex justify-center items-center gap-2">
              <p className="text-sm text-center">Pas encore de compte ?</p>
              <button
                type="button"
                className="text-base text-orange-500 hover:underline"
                onClick={() => {
                  navigte("/auth/signup");
                }}
              >
                S'inscrire
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Login;
