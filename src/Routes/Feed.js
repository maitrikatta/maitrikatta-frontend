import { Paper, Box, Tabs, Tab, CircularProgress } from '@mui/material';
import OutlinedPost from '@mui/icons-material/LocalPostOfficeOutlined';
import OutlinedDelete from '@mui/icons-material/AutoDeleteOutlined';
import OutlinedBookmark from '@mui/icons-material/BookmarkBorderOutlined';
import authAxios from '../axios/authAxios';
import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';

function Feed() {
  const [state, setState] = useState({
    activeItem: 0,
    loading: true,
    postList: [],
  });

  const handleChange = (ev, activeItem) => {
    setState({ ...state, activeItem });
  };

  async function fetchData() {
    try {
      const res = await authAxios.get('/posts/own');
      if (res?.data?.length > 0) {
        let newPosts = res.data;
        setState({ ...state, postList: newPosts, loading: false });
      }
    } catch (error) {
      if (error.code === 'ERR_BAD_REQUEST') {
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper
          elevation={6}
          square
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
        <CircularProgress sx={{ marginTop: 8 }} />
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
