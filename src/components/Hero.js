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
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          p: 2,
          flexWrap: 'wrap',
          justifyContent: { sm: 'center' },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: 0,
        }}
        square
        elevation={18}
      >
        {children}
      </Paper>
    </>
  );
}

export default Hero;
