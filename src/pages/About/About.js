import {Button, Grid, Paper, Typography} from "@mui/material";
import React from "react";
import "./styles/about.css";
import {colors} from "../../theme/colors";
import {TypeAnimation} from "react-type-animation";
import {Image} from "@mui/icons-material";

const About = ({aboutDescription, cvUrl}) => {
  const DownloadCV = () => {
    const pdfUrl = cvUrl || "https://drive.google.com/file/d/1u-iAqA0-5DrZFBvEKoMFnU1P7XoGSg6-/view?usp=sharing";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "NiravKhetaniSoftwareDeveloper.pdf"; // specify the filename
    document.body.appendChild(link);
    link.target = "_blank";
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Paper variant="about-bio-info" id="about">
      <Grid container>
        <Grid item xs={12} md={6} lg={6} order={{xs: 2, md: 1, lg: 1}}>
          <Typography variant="greetingHeader" className="about-greeting-header">
            Hi, I am
            <br />
            Nirav Khetani 🤙🏻
          </Typography>
          <div className="roles-wrapper">
            <Typography variant="roles">I am a</Typography>
            <div style={{color: colors.primary__lighter}}>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed once, initially
                  "Software Developer",
                  1000,
                  "Backend Developer",
                  1000,
                  "Programmer",
                  1000,
                  "Student",
                  1000,
                ]}
                speed={50}
                style={{fontSize: "2em"}}
                repeat={Infinity}
              />
            </div>
          </div>

          {/* <Typography variant="roles">I am a </Typography> */}
          <Typography variant="h4" sx={{color: colors.secondary, marginBottom: "42px !important"}}>
            {aboutDescription ||
              "I have strong organizational skills and demonstrate responsibility, proactivity, dynamism and resilience in my work. I have a great ability to adapt to new challenges. I like to analyze problems and evaluate different solutions. I believe that organization is very important in order to achieve personal and professional goals efficiently."}
          </Typography>
          <Button variant="filled" onClick={DownloadCV}>
            Check CV
          </Button>
        </Grid>
        <Grid item xs={12} md={6} lg={6} order={{xs: 1, md: 2, lg: 2}} className="profile-pic-grid-wrapper">
          <div>
            {/* <img
              src="https://pedrorfpacheco.github.io/portfolio/static/media/PerfilPedroPacheco.0d7ddda3a293dcf979ac.jpg"
              alt="profile-pic"
              className="profile-image"
            ></img> */}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default About;
