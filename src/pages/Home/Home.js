import React, {useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import About from "../About/About";
import FadeSection from "../../shared/FadeSection/FadeSection";
import Experience from "../Experience/Experience";
import Education from "../Education/Education";
import Contact from "../Contact/Contact";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import {GSHEET_API_URL} from "../../utils/const";

const Home = () => {
  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedInLink] = useState("");
  const [about, setAbout] = useState("");
  const [experienceTimeLineHeader, setExperienceTimeLineHeader] = useState("");
  const [BccEmail, setBccEmail] = useState("");
  const [ExperienceInfo, setExperienceInfo] = useState([]);
  const [cvUrl, setCVUrl] = useState("");
  const [educationTitleHeader, setEducationTitleHeader] = useState("");
  const [educationInfo, setEducationInfo] = useState([]);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const options = {
          url: GSHEET_API_URL,
          method: "GET",
        };
        const response = await axios(options);
        console.log(response, "response");
        if (response.data.data.length > 0) {
          setGithubLink(response.data.data[0].Github);
          setLinkedInLink(response.data.data[0].Linkedin);
          setAbout(response.data.data[0].About);
          setExperienceTimeLineHeader(response.data.data[0].ExperienceTimeLineTitle);
          setBccEmail(response.data.data[0].Email);
          setCVUrl(response.data.data[0].cvUrl);
          setExperienceInfo(JSON.parse(response.data.data[0].Experience || "[]"));
          setEducationTitleHeader(response.data.data[0].EducationTitle);
          setEducationInfo(JSON.parse(response.data.data[0].Education));
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchResponse();
  }, []);
  return (
    <>
      <Header githubLink={githubLink} linkedinLink={linkedinLink} />
      <div className="body-wrapper">
        <About aboutDescription={about} cvUrl={cvUrl} />
        <FadeSection>
          <Experience experienceTimeLineHeader={experienceTimeLineHeader} ExperienceInfo={ExperienceInfo} />
          <Education educationTitleHeader={educationTitleHeader} educationInfo={educationInfo} />
          <Contact BccEmail={BccEmail} />
          <Footer />
        </FadeSection>
      </div>
    </>
  );
};

export default Home;
