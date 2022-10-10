import { useEffect, useState, useRef } from 'react';
import { Toolbar, Paper, CircularProgress } from '@mui/material';
import { drawerWidth } from './MyDrawer';
import { useGlobalContext } from '../context';
import useFetchData from '../lib/fetch-more-posts';
function Hero({ children }) {
  const [windowHeight, setWindowHeight] = useState(500);
  const { appBarHeight } = useGlobalContext();
  const myRef = useRef();
  useFetchData('/landing', myRef);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  return (
    <>
      <Toolbar />
      <Paper
        component="main"
        ref={myRef}
        sx={{
          display: 'flex',
          minHeight: `calc(${windowHeight - appBarHeight}px)`,
          // minHeight: '100vh',

          flexDirection: 'row',
          gap: 2,
          p: 2,
          flexWrap: 'wrap',
          justifyContent: { xs: 'center' },
          alignItems: 'start',
          alignContent: 'start',
          ml: { sm: `${drawerWidth}px` },
          boxShadow: 0,
          position: 'relative',
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
