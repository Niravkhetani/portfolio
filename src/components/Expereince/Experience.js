import {Card, CardHeader, Grid, Paper} from "@mui/material";
import React from "react";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import ExperienceCard from "../ExperienceCard/ExperienceCard";
import "./styles/experience.css";

const Experience = () => {
  return (
    // <Timeline>
    //   <TimelineItem>
    //     <TimelineSeparator>
    //       <TimelineDot variant="outlined" />
    //       <TimelineConnector />
    //     </TimelineSeparator>
    //     <TimelineContent>Eat</TimelineContent>
    //   </TimelineItem>
    //   <TimelineItem>
    //     <TimelineSeparator>
    //       <TimelineDot variant="outlined" />
    //       <TimelineConnector />
    //     </TimelineSeparator>
    //     <TimelineContent>Code</TimelineContent>
    //   </TimelineItem>
    //   <TimelineItem>
    //     <TimelineSeparator>
    //       <TimelineDot variant="outlined" />
    //     </TimelineSeparator>
    //     <TimelineContent>Sleep</TimelineContent>
    //   </TimelineItem>
    // </Timeline>
    <div className="experience-grid-wrapper">
      <div className="experience-grid-container">
        <Grid container>
          <Grid xs={3} item />
          <Grid xs={6} item>
            <ExperienceCard cardTitle="Full Stack Software Developer IEFP Internship" />{" "}
            <ExperienceCard cardTitle="Full Stack Software Developer IEFP Internship" />{" "}
            <ExperienceCard cardTitle="Full Stack Software Developer IEFP Internship" />
          </Grid>
          <Grid xs={3} item />
        </Grid>
      </div>
    </div>
  );
};

export default Experience;
