import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { queryClient } from "./lib/react-query";
import { QueryClientProvider } from "react-query";

import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import SignUp from "./components/SignUp";
import EmailVerification from "./components/EmailVerification";
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<EmailVerification />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
