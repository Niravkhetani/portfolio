import {Grid, Typography} from "@mui/material";
import React from "react";
import "./styles/ContactUs.css";

const Contact = () => {
  return (
    <div className="contact-us-wrapper">
      <Grid container xs={12}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <div className="experience-title-wrapper">
            <Typography variant="experienceHeader">Contact</Typography>
            <Typography className="experience-description" variant="experienceCardDescription">
              Don't hesitate to contact me if you have any questions or if there are any opportunities you'd like to
              discuss!
            </Typography>
          </div>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </div>
  );
};

export default Contact;
