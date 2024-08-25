import React from "react";
// import Header from "../components/Header";
// import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import HeroSection from "../components/HeroSection";
import NewsDashboard from "../components/Actualites";
import NewsLetter from "../components/NewsLetter";
import { useAuthContext } from "../context/AuthContext";
import Login from "../components/Login";

const Home: React.FC = () => {
  const { isModalOpen } = useAuthContext();
  return (
    <>
      {isModalOpen && <Login />}
      <HeroSection />
      <NewsDashboard />
      <NewsLetter />
      <Footer />
      <Copyright />
    </>
  );
};

export default Home;
