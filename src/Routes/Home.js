import React from 'react';
import { Box } from '@mui/material';
import MyDrawer from '../components/MyDrawer';
import MyAppBar from '../components/MyAppBar';
import Hero from '../components/Hero';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <Box component="section">
      <MyAppBar />
      <MyDrawer />
      <Hero>
        {/* Outlet renders Posts component */}
        <Outlet />
      </Hero>
    </Box>
  );
}

export default Home;
