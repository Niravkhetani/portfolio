import {Card, CardHeader} from "@mui/material";
import React from "react";
import "./styles/experience-card.css";
import ExperienceCardHeader from "./components/ExperienceCardHeader/ExperienceCardHeader";
import ExperienceCardBody from "./components/ExperienceCardBody/ExperienceCardBody";

const ExperienceCard = ({cardTitle}) => {
  return (
    <Card className="experience-card">
      <CardHeader
        title={
          <ExperienceCardHeader
            title={cardTitle}
            cardHeaderImg={"https://www.itjobs.pt/empresa/natixis-portugal/logo/social"}
            cardHeaderImgStyle={{height: "57px", borderRadius: "10px"}}
          />
        }
      />
      <ExperienceCardBody />
    </Card>
  );
};

export default ExperienceCard;
