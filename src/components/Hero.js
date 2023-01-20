import { useEffect, useState, useRef } from 'react';
import { Toolbar, Box } from '@mui/material';
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
      <Box
        component="main"
        ref={myRef}
        sx={{
          display: 'flex',
          minHeight: `calc(${windowHeight - appBarHeight}px)`,
          // minHeight: '100vh',

          flexDirection: 'row',
          gap: 2,
          padding: { xs: 2, md: 4 },
          flexWrap: 'wrap',
          justifyContent: { xs: 'center' },
          alignItems: 'start',
          alignContent: 'start',
          ml: { sm: `${drawerWidth}px` },
          boxShadow: 0,
          boxSizing: 'border-box',
          position: 'relative',
        }}
        square={'true'}
        elevation={18}
      >
        {children}
      </Box>
    </>
  );
}

export default Hero;
