import React from 'react';
import { Typography, CardContent } from '@mui/material';
function MiddleContent({ Content }) {
  return (
    <CardContent>
      <Typography
        variant="body2"
        sx={{
          textAlign: 'start',
          fontFamily: 'Dosis',
          fontSize: { md: '1.2rem' },
        }}
      >
        {`${Content.substring(0, 150).trim()}...`}
      </Typography>
    </CardContent>
  );
}

export default MiddleContent;
