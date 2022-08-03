import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './PostCard';
import customAxios from '../axios/authAxios';
function Posts() {
  const [posts, setPosts] = useState([]);
  const { main, sub } = useParams();
  let url = '/posts/?type=' + sub;
  const fetchData = async () => {
    try {
      const { data } = await customAxios.get(url);
      setPosts(data);
    } catch (error) {
      console.log(error.response.data.msg);
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
