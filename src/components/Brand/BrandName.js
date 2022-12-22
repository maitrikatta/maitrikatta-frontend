import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Custom = styled(Typography)({
  fontFamily: 'space',
  letterSpacing: '8px',
  fontSize: '1.2rem',
  color: '#1363df',
});
function BrandName() {
  return <Custom variant="p">maitrikatta</Custom>;
}

export default BrandName;
