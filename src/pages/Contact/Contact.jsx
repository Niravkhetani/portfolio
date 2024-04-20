import {Box, Button, FormControl, Grid, Input, TextField, Typography} from "@mui/material";
import React, {useCallback, useState} from "react";
import "./styles/ContactUs.css";
import {NODE_SERVER_URL} from "../../utils/const";
import axios from "axios";

const Contact = ({BccEmail}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const onChangeHandler = useCallback((e, name) => {
    switch (name) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "subject":
        setSubject(e.target.value);
        break;
      case "message":
        setMessage(e.target.value);
        break;
      default:
        break;
    }
  }, []);
  const onSubmit = async () => {
    if (name && email && subject && message) {
      try {
        const options = {
          url: `${NODE_SERVER_URL}/${BccEmail}`,
          method: "GET",
          body: {name: name, email: email, subject: subject, message: message},
        };
        await axios(options);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } catch (err) {
        console.log("error: ", err);
      }
    }
    console.log("submit", name, email, subject, message);
  };
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
                <TextField
                  className="outlined-border"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => onChangeHandler(e, "email")}
                />
                <TextField
                  className="outlined-border"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => onChangeHandler(e, "name")}
                />
                <TextField
                  className="outlined-border"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => onChangeHandler(e, "subject")}
                />
                <TextField
                  className="outlined-border"
                  placeholder="Message"
                  minRows={4}
                  multiline={true}
                  value={message}
                  onChange={(e) => onChangeHandler(e, "message")}
                />
                <Button variant="contact-us" onClick={() => onSubmit()}>
                  Send
                </Button>
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
