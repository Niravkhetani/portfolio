import {Typography} from "@mui/material";
import React from "react";
import "./styles/ExperienceCardBody.css";

const ExperienceCardBody = () => {
  return (
    <div className="experience-card-body-wrapper">
      <Typography variant="experienceCardDescription">
        As a Junior Full Stack Developer, I worked on projects involving technologies such as Java, Spring Boot, React,
        RabbitMQ, Docker and GCP. Implementations were delivered efficiently using GitLab for continuous integration and
        continuous delivery (CI/CD), while we built microservices with Java and microfrontends with React. In addition
        to actively contributing to the code, I played some important roles in defining problem solutions and maintained
        solid communication with internal and external teams.
      </Typography>
      {/* <div className="skills-container">
        <Typography variant="experienceCardDuration">Skills</Typography>
      </div> */}
    </div>
  );
};

export default ExperienceCardBody;
