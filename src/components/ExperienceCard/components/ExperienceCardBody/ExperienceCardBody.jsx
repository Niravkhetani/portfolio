import {Typography} from "@mui/material";
import React from "react";
import "./styles/ExperienceCardBody.css";

const ExperienceCardBody = ({skillList, description}) => {
  return (
    <div className="experience-card-body-wrapper">
      <Typography className="card-description" variant="experienceCardDescription">
        {description}
      </Typography>

      <div className="skill-set-wrapper">
        {skillList.length > 0 && (
          <React.Fragment>
            <Typography variant="experienceCardSkillLabel">Skills: </Typography>
            <div>
              <ul className="skill-list-ul">
                {skillList?.map((item, idx) => (
                  <li className="skill-list-item">
                    <Typography variant="experienceCardDescription">{item}</Typography>
                  </li>
                ))}
              </ul>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ExperienceCardBody;
