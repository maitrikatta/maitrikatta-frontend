import React from 'react';
import { useParams } from 'react-router-dom';
import authAxios from '../axios/authAxios';
import { Box, Typography, Paper } from '@mui/material';
function ExpandPost() {
  const { postId } = useParams();
  const [post, setPost] = React.useState(null);
  async function fetchPost() {
    try {
      const response = await authAxios.get(`/posts/${postId}`);
      if (response?.status === 200) {
        setPost(response.data);
      }
    } catch (error) {
      if (error?.response?.status === 401) alert('Plase login first');
    }
  }
  React.useEffect(() => {
    fetchPost();
  }, []);
  return (
    <Paper
      component="article"
      elevation={6}
      sx={{
        width: { sm: '100%', md: '50%' },
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {post ? <Post {...post} /> : <h3>Loading...</h3>}
    </Paper>
  );
}

function Post({ picturePath, PostHeading, Content }) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'center',
          //   width: '100%',
        }}
      >
        <Box
          component="img"
          src={picturePath}
          alt={PostHeading}
          sx={{ maxWidth: '100%', pointerEvents: 'none' }}
        ></Box>
      </Box>
      <Typography
        sx={{
          left: 10,
          top: 10,
          fontFamily: 'roboto-light',
        }}
        variant="h5"
      >
        {PostHeading}
      </Typography>
      <Typography
        sx={{
          fontSize: 24,
          fontFamily: 'roboto-thin',
          textAlign: 'justify',
        }}
        variant="p"
      >
        {Content}
      </Typography>
    </>
  );
}

export default ExpandPost;
