import React from 'react';
import { Typography, CardContent } from '@mui/material';
function MiddleContent({ Content }) {
  return (
    <CardContent>
      <Typography
        variant="body1"
        sx={{
          textAlign: 'start',
        }}
      >
        {`${Content.substring(0, 150).trim()}...`}
      </Typography>
    </CardContent>
  );
}

export default MiddleContent;
