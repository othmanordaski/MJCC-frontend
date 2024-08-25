import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { queryClient } from "./lib/react-query";
import { QueryClientProvider } from "react-query";
// import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Actualites from "./pages/Actualites";
import SignUp from "./components/SignUp";
import EmailVerification from "./components/EmailVerification";
import { AuthProvider } from "./context/AuthContext";
import { ArticleProvider } from "./context/ArticalsContext";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  return (
    <ArticleProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ToastContainer />
            {/* <Toaster position="top-center" reverseOrder={false} /> */}
            <Header />
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="/actualites" element={<Actualites />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </AuthProvider>
    </ArticleProvider>
  );
};

export default App;
