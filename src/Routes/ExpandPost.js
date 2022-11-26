import React from 'react';
import { useParams } from 'react-router-dom';
import authAxios from '../axios/authAxios';
import { Box, Typography, Paper, Divider } from '@mui/material';
import Paperclip from '../assets/icons/paperclip';
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
        maxWidth: { sm: '100%', md: '700px' },
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        boxShadow: '0px 0px 2px black',
      }}
    >
      {post ? <Post {...post} /> : <h3>Loading...</h3>}
    </Paper>
  );
}

function Post({ picturePath, PostHeading, Content, Category, createdAt }) {
  const date = new Date(createdAt);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'center',
          gap: 2,
          //   width: '100%',
        }}
      >
        <Box
          component="header"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Typography
              sx={{
                fontFamily: 'Comic-ink',
                letterSpacing: '2px',
                fontSize: '18px',
                backgroundColor: '#495C83',
                color: 'white',
                padding: '0px 5px',
              }}
              variant="h6"
            >
              category: {Category}
            </Typography>
            <Box
              component="span"
              sx={{
                // transform: 'rotate(100deg)',
                position: 'absolute',
                left: -7,
                top: -7,
              }}
            >
              <Paperclip
                style={{ width: '5px' }}
                size="small"
                color="#FEB139"
              />
            </Box>
          </Box>
          <Typography
            sx={{
              color: '#ee5454',
              fontFamily: 'Comic-ink',
            }}
          >
            {date.toDateString()}
          </Typography>
        </Box>
        <Divider
          sx={{
            width: '100%',
          }}
        />
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
          fontFamily: 'Avenger',
          backgroundColor: '#25316D',
          color: 'yellow',
          padding: '5px 10px',
          boxSizing: 'border-box',
          WebkitTextStrokeWidth: '1px',
          WebkitTextStrokeColor: 'black',
        }}
        variant="h5"
      >
        {PostHeading}
      </Typography>
      <Divider />
      <Typography
        sx={{
          fontSize: 24,
          fontFamily: 'Homemade',
          textAlign: 'start',
        }}
        variant="p"
      >
        {Content}
      </Typography>
    </>
  );
}

export default ExpandPost;
