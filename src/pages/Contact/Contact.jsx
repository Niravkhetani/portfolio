import {Box, Button, FormControl, Grid, Input, TextField, Typography} from "@mui/material";
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

            <div className="contact-form">
              <Box component="form">
                <Typography
                  variant="h3"
                  style={{display: "-webkit-box", marginLeft: "1.5rem !important", marginBottom: "1rem !important"}}
                >
                  Email Me 📩
                </Typography>
                <TextField className="outlined-border" placeholder="Your Email" />
                <TextField className="outlined-border" placeholder="Your Name" />
                <TextField className="outlined-border" placeholder="Subject" />
                <TextField className="outlined-border" placeholder="Message" minRows={4} multiline={true} />
                <Button variant="contact-us">Send</Button>
              </Box>
            </div>
          </div>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </div>
  );
};

export default Contact;
