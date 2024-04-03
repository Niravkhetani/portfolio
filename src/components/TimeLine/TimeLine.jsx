import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@mui/lab";
import React from "react";
import "./styles/timeline.css";

const TimeLine = ({Content}) => {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>{Content}</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default TimeLine;
