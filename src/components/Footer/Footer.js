import {Grid, Link} from "@mui/material";
import React from "react";
import "./styles/footer.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {colors} from "../../theme/colors";

const Footer = ({ githubLink, linkedinLink }) => {
  const footerPageList = [
    { name: 'about', label: 'About', link: '#about' },
    { name: 'Experience', label: 'Experience', link: '#experience' },
    { name: 'Education', label: 'Education', link: '#Education' },
    { name: 'contacts', label: 'Contacts', link: '#contacts' },
  ];
  return (
    <div style={{ height: '7rem' }}>
      <Grid container>
        <Grid xs={4} item />
        <Grid xs={4} item>
          <div className='footer-link-wrapper'>
            {footerPageList.map((item, idx) => (
              <Link variant='header-navbar' href={item.link}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className='footer-icon-wrapper'>
            <a href={githubLink}>
              <GitHubIcon
                variant='outlined'
                color={'secondary'}
                style={{ width: '1.8em', height: '1.8em' }}
                sx={{ '&:hover': { color: colors.primary__lighter, cursor: 'pointer' } }}
              />
            </a>
            <a href={linkedinLink}>
              <LinkedInIcon
                variant='outlined'
                color={'secondary'}
                style={{ width: '1.8em', height: '1.8em' }}
                sx={{ '&:hover': { color: colors.primary__lighter, cursor: 'pointer' } }}
              />
            </a>
          </div>
        </Grid>
        <Grid xs={4} item />
      </Grid>
    </div>
  );
};

export default Footer;
