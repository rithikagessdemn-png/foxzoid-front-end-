import React from "react";
import Hero from "../components/home/Hero";
import BioData from "../components/home/BioData";
import FeaturedGame from "../components/home/FeaturedGame";
// import VerticalAd from "../components/ad/VerticalAd";
import GameDetails from "../components/home/GameDetails";

const Home = () => {
  return (
    <div className="overflow-hidden h-min-screen">
      <Hero />
      {/* <VerticalAd /> */}
      <BioData />
      <FeaturedGame />
      <GameDetails />
    </div>
  );
};

export default Home;