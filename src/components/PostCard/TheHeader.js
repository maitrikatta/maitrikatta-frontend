import React, { useEffect, useRef } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { Avatar, IconButton, CardHeader } from '@mui/material';
import setImageBlob from '../../lib/setImageBlob';
function TheHeader({ userName, profilePath, ellipse, PostHeading }) {
  const imgRef = useRef(null);
  function getImage() {
    const route = 'images/public/profile';
    // will not work, because ref target is div
    setImageBlob({ route, targetRef: imgRef, imgKey: profilePath });
  }
  useEffect(() => {
    // if (profilePath) getImage();
  }, [profilePath]);
  return (
    <CardHeader
      avatar={
        <Avatar ref={imgRef} sx={{ bgcolor: red[500] }}>
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
  );
}

export default TheHeader;
