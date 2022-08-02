import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './PostCard';

function Posts() {
  // const { main, sub } = useParams();
  // const data = await fetch(`localhost:5000/Posts/${main}/${sub}`);
  // console.log(data);
  return <PostCard />;
}

export default Posts;
