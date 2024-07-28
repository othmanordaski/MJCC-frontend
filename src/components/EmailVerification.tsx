import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { authApi } from "../api/auth";

const verifyEmail = async (token: string) => {
  const { data } = await authApi.verifyToken(token)
  return data;
};

const EmailVerification: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const { data, isLoading, isError, error } = useQuery(
    ["verifyEmail", token],
    () => verifyEmail(token!),
    {
      enabled: !!token,
      retry: false,
      onSuccess: () => {
        setTimeout(() => navigate("/"), 3000);
      },
      onError: (err: any) => {
        console.error(err);},
    }
  );

  useEffect(() => {
    if (!token) {
      toast.error("Invalid verification link");
      navigate("/");
    }
  }, [token, navigate]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 120,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={isLoading ? "loading" : isError ? "error" : "success"}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          {isLoading && (
            <div className="text-center">
              <Loader className="w-16 h-16 text-blue-500 animate-spin mx-auto" />
              <p className="mt-4 text-xl font-semibold text-gray-700">
                Verifying your email...
              </p>
            </div>
          )}
          {isError && (
            <div className="text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
              <p className="mt-4 text-xl font-semibold text-gray-700">
                Verification failed
              </p>
              <p className="mt-2 text-gray-500">
                {(error as any).response?.data?.message ||
                  "Please try again later."}
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Go to Homepage
              </button>
            </div>
          )}
          {data && (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <p className="mt-4 text-xl font-semibold text-gray-700">
                Email verified successfully!
              </p>
              <p className="mt-2 text-gray-500">
                You'll be redirected to login shortly.
              </p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <motion.div
                  className="bg-green-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EmailVerification;
