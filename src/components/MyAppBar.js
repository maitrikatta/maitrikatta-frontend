import { useEffect, useState, useRef } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useGlobalContext } from '../context';
import { drawerWidth } from './MyDrawer';
function MyAppBar() {
  const { handleDrawerToggle, darkMode, setAppBarHeight } = useGlobalContext();

  const myColor = !darkMode && 'white';
  const appBar = useRef();
  useEffect(() => {
    setAppBarHeight(appBar.current.offsetHeight);
  }, []);
  return (
    <AppBar
      position="fixed"
      ref={appBar}
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
        <Button
          onClick={handleDrawerToggle}
          variant="outlined"
          sx={{
            display: { sm: 'none' },
            color: 'primary.white',
            border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: '10px',
            '&.MuiButton-root': {
              padding: '3px',
              minWidth: 'auto',
            },
            '&.MuiButton-root:hover': {
              border: '1px solid rgba(255,255,255,0.8)',
              backgroundColor: 'rgba(230, 230, 230,0.1)',
            },
          }}
          size="large"
        >
          <MenuIcon size="small" />
        </Button>
        <Typography
          sx={{
            fontFamily: 'space',
            letterSpacing: { sm: '5px', xs: '2px' },
            color: { sm: !darkMode && 'black' },
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
