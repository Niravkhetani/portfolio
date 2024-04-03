import React from "react";
import Header from "../../components/Header/Header";
import About from "../About/About";
import FadeSection from "../../shared/FadeSection/FadeSection";
import Experience from "../Experience/Experience";
import Education from "../Education/Education";
import Contact from "../Contact/Contact";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="body-wrapper">
        <About />
        <FadeSection>
          <Experience />
          <Education />
          <Contact />
        </FadeSection>
      </div>
    </div>
  );
};

export default Home;
