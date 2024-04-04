import {Grid, Link} from "@mui/material";
import React from "react";
import "./styles/footer.css";

const Footer = () => {
  const footerPageList = [
    {name: "about", label: "About", link: "#about"},
    {name: "Experience", label: "Experience", link: "#experience"},
    {name: "Education", label: "Education", link: "#Education"},
    {name: "contacts", label: "Contacts", link: "#contacts"},
  ];
  return (
    <div>
      <Grid container>
        <Grid xs={4} item />
        <Grid xs={4} item>
          <div className="footer-link-wrapper">
            {footerPageList.map((item, idx) => (
              <Link variant="header-navbar" href={item.link}>
                {item.label}
              </Link>
            ))}
          </div>
        </Grid>
        <Grid xs={4} item />
      </Grid>
    </div>
  );
};

export default Footer;
