import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import img from '../assets/img/jamun.jpg';
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
import React from 'react';
import { useParams } from 'react-router-dom';
import { red } from '@mui/material/colors';
function Posts() {
  const { main, sub } = useParams();
  //   const data = await fetch(`localhost:5000/${main}/${sub}`);
  //   console.log(data);
  return (
    <>
      <Card
        elevation={24}
        sx={{
          flexBasis: { xs: 260, sm: 350 },
          flexGrow: { xs: 1, sm: 0 },
          boxShadow: '2',
        }}
      >
        {/* <CardHeader
          sx={{ '&.MuiTypography-root': { fontSize: '15px' } }}
          title="Yogesh Kakde"
        ></CardHeader> */}
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
          title="Girl friends are hazardous!"
          subheader="Yogesh Kakde"
        ></CardHeader>
        <CardMedia
          component="img"
          height="194"
          image="https://dummyimage.com/900"
          alt="Paella dish"
        />
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
            <ShareIcon />
          </IconButton>
          <Button variant="link" sx={{ marginLeft: 'auto' }}>
            see more
          </Button>
        </CardActions>
      </Card>
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
          title="Girl friends are hazardous!"
          subheader="Yogesh Kakde"
        ></CardHeader>
        <CardMedia
          component="img"
          height="194"
          image="https://dummyimage.com/900"
          alt="Paella dish"
        />
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
            <ShareIcon />
          </IconButton>
          <Button variant="link" sx={{ marginLeft: 'auto' }}>
            see more
          </Button>
        </CardActions>
      </Card>
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
          title="Girl friends are hazardous!"
          subheader="Yogesh Kakde"
        ></CardHeader>
        <CardMedia
          component="img"
          height="194"
          image="https://dummyimage.com/900"
          alt="Paella dish"
        />
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
            <ShareIcon />
          </IconButton>
          <Button variant="link" sx={{ marginLeft: 'auto' }}>
            see more
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default Posts;
