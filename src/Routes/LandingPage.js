import React, { useEffect } from 'react';
import noAuthAxios from '../axios/noAuthAxios';
import PostCard from '../components/PostCard';
import { useGlobalContext } from '../context';

function LandingPage() {
  const { posts, setPosts } = useGlobalContext();
  async function fetchData() {
    try {
      const result = await noAuthAxios.get('/landing');
      if (result?.status === 200) {
        setPosts(result.data);
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
    </>
  );
}

export default LandingPage;
