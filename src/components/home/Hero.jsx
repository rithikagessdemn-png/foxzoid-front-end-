import React from "react";
import heroBg from "../../assets/images/hero-bg.png";

const Hero = () => {
  return (
    <section className="relative w-full h-full overflow-hidden">
      {/* Overlay */}

      <div className="relative inset-0 flex items-center justify-center">
        <img
          src={heroBg}
          alt="Hero Background"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
    </section>
  );
};

export default Hero;
