import { Paper, Box, Tabs, Tab, CircularProgress } from '@mui/material';
import OutlinedPost from '@mui/icons-material/LocalPostOfficeOutlined';
import OutlinedDelete from '@mui/icons-material/AutoDeleteOutlined';
import OutlinedBookmark from '@mui/icons-material/BookmarkBorderOutlined';
import authAxios from '../axios/authAxios';
import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import LoginDialog from '../components/Dialog/LoginDialog';
function Feed() {
  const [state, setState] = useState({
    activeItem: 0,
    loading: true,
    postList: [],
  });
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleChange = (ev, activeItem) => {
    setState({ ...state, activeItem });
  };

  async function fetchData() {
    try {
      const res = await authAxios.get('/posts/own');
      if (res?.data?.length > 0) {
        let newPosts = res.data;
        setState({ ...state, postList: newPosts, loading: false });
      } else {
        setState({ ...state, loading: false });
        alert('You havent posted any thing yet');
      }
    } catch (error) {
      setState({ ...state, loading: false });
      if (error.response.status === 401) setDialogOpen(true);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <LoginDialog
        handleDialogClose={handleDialogClose}
        dialogOpen={dialogOpen}
      >
        Login to see your data and manage it.
      </LoginDialog>
      <Box sx={{ width: '100%' }}>
        <Paper
          elevation={6}
          square={'true'}
          component="nav"
          sx={{
            boxShadow: '0px 0px 2px black',
            width: { sm: '100%', md: '90%', lg: '60%' },
            margin: 'auto',
          }}
        >
          <Tabs
            value={state.activeItem}
            onChange={handleChange}
            area-label="see your activity"
            centered
          >
            <Tab icon={<OutlinedPost />} label="POSTED"></Tab>
            <Tab icon={<OutlinedDelete />} label="DELETD"></Tab>
            <Tab icon={<OutlinedBookmark />} label="SAVED"></Tab>
          </Tabs>
        </Paper>
      </Box>
      {state.loading ? (
        <CircularProgress color="primary" sx={{ marginTop: 8 }} />
      ) : (
        <Posts posts={state.postList} />
      )}
    </>
  );
}
function Posts({ posts }) {
  return (
    <>
      {posts.map((post) => {
        return <PostCard key={post._id} deleteOption={true} {...post} />;
      })}
    </>
  );
}

export default Feed;
