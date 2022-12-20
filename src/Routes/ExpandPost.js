import React from 'react';
import { useParams } from 'react-router-dom';
import authAxios from '../axios/authAxios';
import { Paper } from '@mui/material';
import ExpandedPost from '../components/ExpandedPost';
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
      // elevation={6}
      sx={{
        maxWidth: { sm: '100%', md: '700px' },
        padding: { xs: 2, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        // borderRadius: 2,
        boxShadow: '0px 0px 2px black',
      }}
    >
      {post ? <ExpandedPost {...post} /> : <h3>Loading...</h3>}
    </Paper>
  );
}

export default ExpandPost;
