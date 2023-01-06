import React, { useEffect, useRef } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  red,
  green,
  yellow,
  pink,
  purple,
  indigo,
  cyan,
  teal,
  lime,
  blueGrey,
} from '@mui/material/colors';
import { Avatar, IconButton, CardHeader } from '@mui/material';
import setImageBlob from '../../lib/setImageBlob';
function TheHeader({ userName, profilePath, ellipse, PostHeading }) {
  const imgRef = useRef(null);
  const [color, setAvatarColor] = React.useState(green);
  const makeColor = () => {
    const arr = [
      red,
      green,
      yellow,
      pink,
      purple,
      indigo,
      cyan,
      teal,
      lime,
      blueGrey,
    ];
    const i = Math.floor(Math.random() * 10);
    setAvatarColor(arr[i]);
  };
  function getImage() {
    const route = 'images/public/profile';
    // will not work, because ref target is div
    setImageBlob({ route, targetRef: imgRef, imgKey: profilePath });
  }
  useEffect(() => {
    makeColor();
  }, []);
  useEffect(() => {
    // if (profilePath) getImage();
  }, [profilePath]);
  return (
    <CardHeader
      avatar={<Avatar ref={imgRef}></Avatar>}
      action={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
      title={`${PostHeading.substring(0, 70).trim()}${ellipse}`}
      subheader={`${userName}`}
      sx={{
        '& .MuiCard-root': {
          backgroundColor: '#002B5B',
        },
        '& .MuiCardHeader-title': {
          fontFamily: 'Euclid',
        },
        '& .MuiAvatar-circular': {
          // border: '2px solid green',
          // width: '50px',
          // height: '50px',
          // backgroundColor: color[500],
        },
      }}
    ></CardHeader>
  );
}

export default TheHeader;
