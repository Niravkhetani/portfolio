import {Grid, Typography} from "@mui/material";
import React from "react";
import TimeLine from "../../components/TimeLine/TimeLine";
import ExperienceCard from "../../components/ExperienceCard/ExperienceCard";

const Education = () => {
  return (
    <div className="education-wrapper">
      <Grid container xs={12}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <div className="experience-title-wrapper">
            <Typography variant="experienceHeader">Education</Typography>
            <Typography className="experience-description" variant="experienceCardDescription">
              My educational journey has been a constant exploration of self-knowledge and personal growth. Each
              institution and course I have been through has contributed not only to my academic development, but also
              to my deeper understanding of the world around me. Below are the specific details of my academic
              background.
            </Typography>
          </div>
          <TimeLine
            Content={
              <ExperienceCard
                cardSubtitle={"Master's Degree, Software Engineering"}
                cardTitle={"ISEP - Instituto Superior de Engenharia do Porto"}
                cardDuration={"Oct 2022 - at the moment"}
              />
            }
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
};

export default Education;
