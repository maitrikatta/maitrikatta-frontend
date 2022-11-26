import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './PostCard';
import customAxios from '../axios/authAxios';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
function Posts() {
  const { posts, setPosts } = useGlobalContext();
  // const { main, sub } = useParams(); there is main also
  const { sub } = useParams();
  let navigate = useNavigate();
  let url = '/posts/?type=' + sub;
  const fetchData = async () => {
    try {
      const { data } = await customAxios.get(url);
      setPosts(data);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate('/login', { replace: true });
      } else {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {posts.map((post) => {
        const { _id } = post;
        return <PostCard key={_id} {...post} />;
      })}
    </>
  );
}

export default Posts;
