import React from "react";
import "./styles/card-header.css";
import {Typography} from "@mui/material";

const ExperienceCardHeader = ({cardHeaderImg, cardHeaderImgStyle}) => {
  return (
    <div className="card-header-wrapper">
      <div className="card-header-container">
        <div style={{display: "flex", gap: "12px"}}>
          <img src={cardHeaderImg} alt="" style={{...cardHeaderImgStyle}} />
          <div>
            <Typography variant="experienceCardTitle">Full Stack Software Developer IEFP Internship</Typography>
            <br />
            <Typography variant="experienceCardSubtitle">Natixis in Portugal</Typography>
            <br />
            <Typography variant="experienceCardDuration">Mar 2020 - Jan 2021</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCardHeader;
