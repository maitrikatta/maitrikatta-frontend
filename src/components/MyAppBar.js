import { useEffect, useRef } from 'react';
import {
  AppBar,
  IconButton,
  Box,
  Toolbar,
  Typography,
  Button,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useGlobalContext } from '../context';
import { drawerWidth } from './MyDrawer';
import { useNavigate } from 'react-router-dom';
function MyAppBar() {
  const { handleDrawerToggle, darkMode, setAppBarHeight } = useGlobalContext();
  const navigate = useNavigate();
  const myColor = !darkMode && 'white';
  const appBar = useRef();
  useEffect(() => {
    setAppBarHeight(appBar.current.offsetHeight);
  }, []);

  function logoutUser() {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  }

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
            cursor: 'pointer',
            '&.MuiTypography-root::selection': {
              backgroundColor: 'yellow',
              color: 'blue',
            },
          }}
          variant="h6"
          onClick={() => navigate('/')}
        >
          Maitrikatta
        </Typography>
        <Box
          sx={{
            display: 'flex',
            marginLeft: 'auto',
            gap: 1,
          }}
        >
          <Tooltip title="logout">
            <IconButton onClick={() => logoutUser()}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default MyAppBar;
