import {Card, CardHeader, Grid, Paper} from "@mui/material";
import React from "react";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

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
    <Grid container>
      <Card sx={{background: "yellow"}}>
        <CardHeader title={"Full Stack Software Developer IEFP Internship"} subheader="Natixis in Portugal" />
      </Card>
    </Grid>
  );
};

export default Experience;
