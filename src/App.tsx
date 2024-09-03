import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import components
import Home from "./pages/Home";
import Actualites from "./pages/Actualites";
import SearchPage from "./pages/SearchPage";
import EmailVerification from "./components/EmailVerification";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Copyright from "./components/Copyright";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
// Import contexts
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { ArticleProvider } from "./context/ArticalsContext";

// Define interfaces
interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

// Define constants
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const mainRoutes: RouteConfig[] = [
  { path: "/", element: <Home /> },
  { path: "/actualites", element: <Actualites /> },
  { path: "/actualites/search", element: <SearchPage /> },
];

const standaloneRoutes: RouteConfig[] = [
  { path: "/verify-email", element: <EmailVerification /> },
  { path: "/auth/signup", element: <SignUp /> },
];

// Define components
const Layout: React.FC = () => {
  const { isModalOpen } = useAuthContext();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <NavBar />
      {isModalOpen && <Login />}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Copyright />
    </div>
  );
};

const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<Layout />}>
      {mainRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Route>
    {standaloneRoutes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
);

const App: React.FC = () => {
  return (
    <ArticleProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ToastContainer />
            <AppRoutes />
          </Router>
        </QueryClientProvider>
      </AuthProvider>
    </ArticleProvider>
  );
};

export default App;
