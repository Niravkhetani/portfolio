import React from "react";
import "./styles/card-header.css";
import {Typography} from "@mui/material";

const ExperienceCardHeader = ({cardHeaderImg, cardHeaderImgStyle, title, subTitle, duration}) => {
  return (
    <div className="card-header-wrapper">
      <div className="card-header-container">
        <div style={{display: "flex", gap: "12px"}}>
          <img src={cardHeaderImg} alt="" style={{...cardHeaderImgStyle}} />
          <div>
            <Typography variant="experienceCardTitle">{title}</Typography>
            <br />
            <Typography variant="experienceCardSubtitle">{subTitle}</Typography>
            <br />
            <Typography variant="experienceCardDuration">{duration}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCardHeader;
