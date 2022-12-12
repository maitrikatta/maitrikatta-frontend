import React from 'react';
import { Typography, CardContent } from '@mui/material';
function MiddleContent({ Content }) {
  return (
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
  );
}

export default MiddleContent;
