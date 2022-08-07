import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import { red } from '@mui/material/colors';
import customAxios from '../axios/authAxios';
import { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
function PostCard({ createdBy, PostHeading, Content, picturePath }) {
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
  }, []);
  return (
    <Card
      elevation={24}
      sx={{
        flexBasis: { xs: 260, sm: 350 },
        flexGrow: { xs: 1, sm: 0 },
        boxShadow: '2',
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
        title={`${PostHeading.substring(0, 30)} ${ellipse}`}
        subheader={userName}
      ></CardHeader>
      <CardMedia
        component="img"
        height="194"
        image={picturePath}
        alt="Image Not Found"
      />
      <CardContent>
        <Typography variant="body2" sx={{ textAlign: 'justify' }}>
          {`${Content.substring(0, 309)}...`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <BookmarkBorderIcon />
        </IconButton>
        <IconButton>
          <ShareIcon fontSize="medium" />
        </IconButton>
        <Button variant="link" sx={{ marginLeft: 'auto' }}>
          See More
        </Button>
      </CardActions>
    </Card>
  );
}

export default PostCard;
