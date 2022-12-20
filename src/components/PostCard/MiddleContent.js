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
          fontFamily: 'Dosis',
          fontWeight: 'bold',
          letterSpacing: '1px',
        }}
      >
        {`${Content.substring(0, 150).trim()}...`}
      </Typography>
    </CardContent>
  );
}

export default MiddleContent;
