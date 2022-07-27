import React from 'react';
import { useParams } from 'react-router-dom';

function Posts() {
  const { main, sub } = useParams();
  //   const data = await fetch(`localhost:5000/${main}/${sub}`);
  //   console.log(data);
  return <div></div>;
}

export default Posts;
