import React from 'react';
import { Box, Toolbar, Paper, Container } from '@mui/material';
import { drawerWidth } from './MyDrawer';
function Hero({ children }) {
  return (
    <>
      <Toolbar />
      <Paper
        component="main"
        sx={{
          height: 100,
          ml: { sm: `${drawerWidth}px` },
        }}
        square
        elevation={16}
      >
        {children}
      </Paper>
    </>
  );
}

export default Hero;
