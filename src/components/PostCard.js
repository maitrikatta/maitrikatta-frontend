import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import img from '../assets/img/jamun.jpg';
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
function PostCard() {
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
        avatar={<Avatar sx={{ bgcolor: red[500] }}>Y</Avatar>}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title="Right way to make Gulab Jamun!"
        subheader="Yogesh kakde"
      ></CardHeader>
      <CardMedia component="img" height="194" image={img} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" sx={{ textAlign: 'justify' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto ipsa
          laudantium minus sed earum obcaecati dolorum a, veniam aliquam
          laudantium minus sed earum obcaecati dolorum a, veniam aliquam
          consequuntur?
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
          see more
        </Button>
      </CardActions>
    </Card>
  );
}

export default PostCard;
