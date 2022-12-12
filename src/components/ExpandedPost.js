import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Paperclip from '../assets/icons/paperclip';
import { useEffect } from 'react';
import setImageBlob from '../lib/setImageBlob';
export default function Post({
  picturePath: imgKey,
  PostHeading,
  Content,
  Category,
  createdAt,
}) {
  const date = new Date(createdAt);
  const imgRef = React.useRef(null);
  function getImage() {
    const route = 'images/public/posts';
    setImageBlob({ route, targetRef: imgRef, imgKey });
  }
  useEffect(() => {
    getImage();
  }, []);
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
          ref={imgRef}
          component="img"
          alt="Loading Image"
          loading="lazy"
          sx={{
            width: '100%',
            height: '400px',
            objectFit: 'cover',
            objectPosition: '100% 25%',
            pointerEvents: 'none',
          }}
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