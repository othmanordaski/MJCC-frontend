import React from "react";
import HeroSection from "../components/HeroSection";
import NewsDashboard from "../components/Actualites";
import NewsLetter from "../components/NewsLetter";

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <NewsDashboard />
      <NewsLetter />
    </>
  );
};

export default Home;
