import {Card, CardHeader} from "@mui/material";
import React from "react";
import "./styles/experience-card.css";
import ExperienceCardHeader from "./components/ExperienceCardHeader/ExperienceCardHeader";
import ExperienceCardBody from "./components/ExperienceCardBody/ExperienceCardBody";

const ExperienceCard = ({cardHeaderImg, cardTitle, cardSubtitle, cardDuration, cardBody}) => {
  return (
    <Card className="experience-card">
      <CardHeader
        title={
          <ExperienceCardHeader
            title={cardTitle}
            cardHeaderImg={cardHeaderImg}
            cardHeaderImgStyle={{height: "57px", borderRadius: "10px"}}
            subTitle={cardSubtitle}
            duration={cardDuration}
          />
        }
      />
      <ExperienceCardBody skillList={cardBody?.skillList || []} description={cardBody?.description || ""} />
    </Card>
  );
};

export default ExperienceCard;
