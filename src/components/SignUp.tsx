import React from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import bgimage from "../assets/SignUp-image-background/bg-image.jpg";

const SignUpSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .refine(
      (val) => !val.startsWith("_") && !val.endsWith("_"),
      "Username cannot start or end with an underscore"
    ),
  email: z
    .string()
    .email("invalid email address")
    .refine(
      (val) =>
        val.toLowerCase().endsWith(".com") ||
        val.toLowerCase().endsWith(".org") ||
        val.toLowerCase().endsWith(".net"),
      "Email must end with .com, .org, or .net"
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

type SignUpFormData = z.infer<typeof SignUpSchema>;

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await signup(data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      // await signupWithGoogle();
    } catch (error) {
      console.error("Google signup failed:", error);
    }
  };

  const handleFacebookSignup = async () => {
    try {
      // await signupWithFacebook();
    } catch (error) {
      console.error("Facebook signup failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="hidden md:block bg-orange-500">
            <img
              className="w-full h-full object-cover"
              src={bgimage}
              alt="bg image signup"
            />
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <img
                className="h-14 w-auto"
                src="https://mjcc.gov.ma/wp-content/uploads/2021/12/mjcc_black.svg"
                alt="MJCC Logo"
              />

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    {...register("username")}
                    type="text"
                    placeholder="Your username"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Your email"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Your password"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                type="submit"
              >
                {isSubmitting ? (
                  <CircularProgress className="text-white" size={24} />
                ) : (
                  "S'inscrire"
                )}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="font-medium text-orange-600 hover:text-orange-500"
                    onClick={() => navigate("/")}
                  >
                    Se connecter
                  </button>
                </p>
              </div>
              <div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-200"
                    onClick={handleGoogleSignup}
                  >
                    <FcGoogle className="text-2xl mr-2" />
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-200"
                    onClick={handleFacebookSignup}
                  >
                    <FaFacebook className="text-2xl mr-2 text-blue-600" />
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
