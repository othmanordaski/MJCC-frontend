import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
type loginFormData = z.infer<typeof loginSchema>;
const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const { login } = useAuth();
  const onSubmit = async (data: loginFormData) => {
    try {
      await login(data);
      console.log("Form submitted:", data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-gray-200">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 "
        >
          <div className="flex flex-col gap-5">
            <div className="flex justify-start">
              <img
                className="h-14 w-auto"
                src="https://mjcc.gov.ma/wp-content/uploads/2021/12/mjcc_black.svg"
                alt="MJCC Logo"
              />
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
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
