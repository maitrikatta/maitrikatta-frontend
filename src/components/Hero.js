import { useEffect, useState, useRef } from 'react';
import { Toolbar, Paper } from '@mui/material';
import { drawerWidth } from './MyDrawer';
import { useGlobalContext } from '../context';
import observeLastDiv from '../lib/infinte-scroll';
import useFetchData from '../lib/fetch-more-posts';

function Hero({ children }) {
  const [windowHeight, setWindowHeight] = useState(500);
  const { appBarHeight, posts, setPageNo, pageNo } = useGlobalContext();
  const myRef = useRef();
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  useEffect(() => {
    if (posts.length > 0) {
      observeLastDiv(myRef.current.lastChild).then((res) => {
        if (res === 'LOAD MORE') {
          // posts length not multiple of 10 must indicate end.
          if (!(posts.length % 10)) setPageNo(posts.length / 10 + 1);
        }
      });
    }
    // restart the common state, when user navigates
    return () => {
      setPageNo(1);
    };
  }, [posts]);
  useEffect(() => {
    console.log('Page:', pageNo);
  }, [pageNo]);
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
