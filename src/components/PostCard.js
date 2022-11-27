import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import { red } from '@mui/material/colors';
import customAxios from '../axios/authAxios';
import noAuthAxios from '../axios/noAuthAxios';
import { useEffect, useState, useRef } from 'react';
import ShareIcon from '@mui/icons-material/Share';
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
  Tooltip,
} from '@mui/material';
function PostCard({
  createdBy,
  PostHeading,
  _id: postId,
  Content,
  picturePath,
  deleteOption,
}) {
  const [profilePath, setProfilePath] = useState('');
  const [userName, setUserName] = useState('');
  const ellipse = PostHeading.length > 30 ? '...' : '';
  const imgRef = useRef(null);
  async function fetchUser() {
    const response = await customAxios(`/profile/${createdBy}`);
    const { data } = await customAxios(`/profile/login/${createdBy}`);
    setUserName(data?.name);

    if (response.data) {
      const { profilePath } = response.data;
      setProfilePath(profilePath);
    }
  }

  async function handleDeletePost(ev) {
    console.log('it ran');
    try {
      const res = await customAxios.delete(`/posts/${postId}`);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
  async function getImage() {
    const { data: blob } = await noAuthAxios.get(
      `/images/public/posts/${picturePath}`,
      {
        responseType: 'blob',
      }
    );
    if (blob) {
      imgRef.current.src = URL.createObjectURL(blob);
    }
  }
  useEffect(() => {
    getImage();
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
        sx={
          {
            // color: 'white',
            // backgroundColor: '#062C30',
          }
        }
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} src={profilePath}>
              {userName[0]?.toUpperCase()}
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
            },
            '& .MuiAvatar-circular': {
              border: '2px solid #FB3640',
              width: '50px',
              height: '50px',
              // backgroundColor: 'aqua',
            },
          }}
        ></CardHeader>
      </Box>
      <CardMedia
        component="img"
        ref={imgRef}
        height="194"
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
          {/* <Link
            to={`/expand/${postId}`}
            style={{
              margin: 'auto',
              textDecoration: 'none',
              color: 'gray',
            }}
          >
            Read More
          </Link> */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="bookmark">
          <IconButton>
            <BookmarkBorderIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="share">
          <IconButton>
            <ShareIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
        {deleteOption && (
          <Tooltip title="delete">
            <IconButton onClick={(ev) => handleDeletePost()}>
              <DeleteOutlined />
            </IconButton>
          </Tooltip>
        )}
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
      </CardActions>
    </Card>
  );
}

export default PostCard;
