import React from 'react';
import { Box } from '@mui/material';
import MyDrawer from '../components/MyDrawer';
import MyAppBar from '../components/MyAppBar';
import Hero from '../components/Hero';
import { Outlet } from 'react-router-dom';

/* this file contains or meets all major UI component 
of app. */
function Home() {
  return (
    <Box component="section">
      <MyAppBar />
      <MyDrawer />
      <Hero>
        <Outlet />
      </Hero>
    </Box>
  );
}

export default Home;
