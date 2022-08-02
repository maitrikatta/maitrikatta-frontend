import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import { red } from '@mui/material/colors';
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
function PostCard({
  createdBy,
  PostHeading,
  Comments,
  Content,
  picturePath,
  Likes,
}) {
  console.log(createdBy);
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
          <Avatar sx={{ bgcolor: red[500] }} src={picturePath}>
            Y
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={PostHeading}
        subheader="Yogesh kakde"
      ></CardHeader>
      <CardMedia
        component="img"
        height="194"
        image={picturePath}
        alt="Image Not Found"
      />
      <CardContent>
        <Typography variant="body2" sx={{ textAlign: 'justify' }}>
          {Content}
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
