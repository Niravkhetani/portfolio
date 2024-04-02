import React from "react";
import Header from "../components/Header/Header";
import About from "../components/About/About";
import FadeSection from "../shared/FadeSection/FadeSection";
import Experience from "../components/Expereince/Experience";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="body-wrapper">
        <About />
        {/* <FadeSection> */}
        <Experience />
        {/* </FadeSection> */}
      </div>
    </div>
  );
};

export default Home;
