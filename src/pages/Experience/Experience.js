import {Card, CardHeader, Grid, Paper, Typography} from "@mui/material";
import React from "react";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import ExperienceCard from "../../components/ExperienceCard/ExperienceCard";
import "./styles/experience.css";
import TimeLine from "../../components/TimeLine/TimeLine";

const Experience = () => {
  const skillList = [
    "Java",
    "Spring",
    "Framework",
    "Docker",
    "RabbitMQ",
    "GCP",
    "MongoDB",
    "TypeScript",
    "React.js",
    "Jira",
  ];
  let cardDescription =
    "As a Junior Full Stack Developer, I worked on projects involving technologies such as Java, Spring Boot, React, RabbitMQ, Docker and GCP. Implementations were delivered efficiently using GitLab for continuous integration and continuous delivery (CI/CD), while we built microservices with Java and microfrontends with React. In addition to actively contributing to the code, I played some important roles in defining problem solutions and maintained solid communication with internal and external teams.";
  return (
    <div className="experience-grid-wrapper">
      <div className="experience-grid-container">
        <Grid container>
          <Grid xs={3} item />
          <Grid xs={6} item>
            <div className="experience-title-wrapper">
              <Typography variant="experienceHeader">Experience</Typography>
              <Typography className="experience-description" variant="experienceCardDescription">
                My professional journey has been an exciting saga of challenges and valuable learnings. Below are
                details of my professional experience, where each opportunity has shaped my perspective and honed my
                skills.
              </Typography>
            </div>
            <TimeLine
              Content={
                <ExperienceCard
                  cardTitle="Full Stack Software Developer IEFP Internship"
                  cardSubtitle="Natixis in Portugal"
                  cardDuration="Mar 2022 - Aug 2023"
                  cardBody={{skillList, description: cardDescription}}
                />
              }
            />{" "}
            <TimeLine
              Content={
                <ExperienceCard
                  cardTitle="Full Stack Software Developer IEFP Internship"
                  cardSubtitle="Natixis in Portugal"
                  cardDuration="Mar 2022 - Aug 2023"
                  cardBody={{skillList, description: cardDescription}}
                />
              }
            />{" "}
            <TimeLine
              Content={
                <ExperienceCard
                  cardTitle="Full Stack Software Developer IEFP Internship"
                  cardSubtitle="Natixis in Portugal"
                  cardDuration="Mar 2022 - Aug 2023"
                  cardBody={{skillList, description: cardDescription}}
                />
              }
            />
          </Grid>
          <Grid xs={3} item />
        </Grid>
      </div>
    </div>
  );
};

export default Experience;
