import React from 'react';
import './styles/header.css';
import { Grid, Link, Paper } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { colors } from '../../theme/colors';
import NiravLogo from '../../assets/Logo/NiravLogo.png';

const Header = ({ githubLink, linkedinLink }) => {
  const headerPageList = [
    { name: 'about', label: 'About', link: '#about' },
    { name: 'Experience', label: 'Experience', link: '#experience' },
    { name: 'Education', label: 'Education', link: '#education' },
    { name: 'contacts', label: 'Contacts', link: '#contacts' },
  ];

  return (
    <Paper className='header-container' variant='header'>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4} lg={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={NiravLogo}
            alt='logo'
            style={{
              height: '35px',
              width: '100%',
              objectFit: 'cover',
              mixBlendMode: 'color-dodge',
            }}
            class='logo-img'
          />
        </Grid>
        <Grid item md={4} lg={4} className='nav-menu-wrapper'>
          {headerPageList.map((item, headerIdx) => {
            return (
              <Link variant='header-navbar' key={headerIdx} href={item.link}>
                {item.label}
              </Link>
            );
          })}
        </Grid>

        <Grid item xs={6} md={4} lg={4} className='header-navbar-icons'>
          <a href={linkedinLink}>
            <LinkedInIcon
              sx={{
                color: 'white',
                height: '55px',
                width: '37px',
                marginLeft: '1rem !important',
                marginRight: '1rem !important',
                '&:hover': { color: colors.primary__lighter, cursor: 'pointer' },
              }}
            />
          </a>
          <a href={githubLink}>
            <GitHubIcon
              sx={{
                color: 'white',
                height: '37px',
                width: '37px',
                marginRight: '2rem !important',
                '&:hover': { color: colors.primary__lighter, cursor: 'pointer' },
              }}
            />
          </a>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
