import React from "react";
import Hero from "../components/user-components/homePage-components/Hero";
import TopRated from "../components/user-components/homePage-components/TopRated";
import Testimonials from "../components/user-components/homePage-components/Testimonials";
import WhyChooseUs from "../components/user-components/homePage-components/WhyChoseUs";
import About from "../components/user-components/homePage-components/About";

const Homepage = () => {
  return (
    <div>
      <Hero />
      <TopRated />
      <About />
      <Testimonials />
      <WhyChooseUs />
    </div>
  );
};

export default Homepage;
