import { CircularProgress, Box } from '@mui/material';
import React, { useEffect } from 'react';
import noAuthAxios from '../axios/noAuthAxios';
import PostCard from '../components/PostCard';
import { useGlobalContext } from '../context';

function LandingPage() {
  const { posts, setPosts, setIsLoadingPosts, isLoadingPosts } =
    useGlobalContext();
  async function fetchData() {
    try {
      setIsLoadingPosts(true);
      const result = await noAuthAxios.get('/landing');
      if (result?.status === 200) {
        setPosts(result.data);
        setIsLoadingPosts(false);
      }
    } catch (error) {
      if (error?.code === 'ERR_NETWORK') {
        alert('Network Error');
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {posts.map((post, index) => {
        const { _id } = post;
        return <PostCard key={_id} {...post} />;
      })}
      <Box component="div" sx={{ textAlign: 'center', width: '100%' }}>
        {isLoadingPosts && (
          <CircularProgress color="primary"></CircularProgress>
        )}
      </Box>
    </>
  );
}

export default LandingPage;
