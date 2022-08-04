import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './PostCard';
import customAxios from '../axios/authAxios';
import { useNavigate } from 'react-router-dom';
function Posts() {
  const [posts, setPosts] = useState([]);
  const { main, sub } = useParams();
  let navigate = useNavigate();
  let url = '/posts/?type=' + sub;
  const fetchData = async () => {
    try {
      const { data } = await customAxios.get(url);
      setPosts(data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/login', { replace: true });
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);
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
