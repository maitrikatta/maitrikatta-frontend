import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import { red } from '@mui/material/colors';
import customAxios from '../axios/authAxios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { getAutoHeightDuration } from '@mui/material/styles/createTransitions';
function PostCard({
  createdBy,
  PostHeading,
  _id: postId,
  Content,
  picturePath,
}) {
  const [profilePath, setProfilePath] = useState('');
  const [userName, setUserName] = useState('');
  const ellipse = PostHeading.length > 30 ? '...' : '';
  async function fetchUser() {
    const response = await customAxios(`/profile/${createdBy}`);
    const { data } = await customAxios(`/profile/login/${createdBy}`);
    setUserName(data?.name);

    if (response.data) {
      const { profilePath } = response.data;
      setProfilePath(profilePath);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Card
      elevation={24}
      sx={{
        flexBasis: { xs: 280, sm: 390 },
        flexGrow: { xs: 1, sm: 0 },
        boxShadow: '2',
      }}
    >
      <Box
        sx={{
          color: 'white',
          backgroundColor: '#062C30',
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} src={profilePath}>
              Y
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={`${PostHeading.substring(0, 50).trim()}${ellipse}`}
          subheader={`${userName}`}
          sx={{
            '& .MuiCard-root': {
              backgroundColor: '#002B5B',
            },
            '& .MuiCardHeader-title': {
              fontFamily: 'Comic-ink',
            },
            '& .MuiCardHeader-subheader': {
              fontFamily: 'monospace',
              color: 'white',
            },
            '& .MuiAvatar-circular': {
              border: '2px solid #FB3640',
              width: '50px',
              height: '50px',
            },
          }}
        ></CardHeader>
      </Box>
      <CardMedia
        component="img"
        height="194"
        image={picturePath}
        alt="Image Not Found"
      />
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            fontSize: '1.1rem',
            textAlign: 'start',
            fontFamily: 'NewsPaper',
            fontWeight: 'bold',
            letterSpacing: '1px',
            ':first-letter': {
              color: '#FA7070',
              fontSize: '1.5rem',
            },
          }}
        >
          {`${Content.substring(0, 150).trim()}...`}
          {` `}
          <Link
            to={`/expand/${postId}`}
            style={{
              margin: 'auto',
              textDecoration: 'none',
              color: 'gray',
            }}
          >
            Read More
          </Link>
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton>
          <BookmarkBorderIcon />
        </IconButton>
        <IconButton>
          <ShareIcon fontSize="medium" />
        </IconButton>

        <Link
          to={`/expand/${postId}`}
          style={{
            marginLeft: 'auto',
            textDecoration: 'none',
            color: 'gray',
          }}
        >
          <Button variant="link">Read More</Button>
        </Link>
      </CardActions> */}
    </Card>
  );
}

export default PostCard;
