import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useGlobalContext } from '../context';
import { drawerWidth } from './MyDrawer';
function MyAppBar() {
  const { handleDrawerToggle, darkMode } = useGlobalContext();
  const myColor = !darkMode && '#3A3845';
  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: { xs: 'primary', sm: myColor },
      }}
    >
      <Toolbar
        sx={{
          gap: 2,
        }}
      >
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            display: { sm: 'none' },
            color: 'primary.icons',
          }}
          size="large"
        >
          <MenuIcon size="small" />
        </IconButton>
        <Typography
          sx={{
            fontFamily: 'space',
            letterSpacing: { sm: '5px', xs: '2px' },
          }}
          variant="h6"
        >
          Maitrikatta
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
