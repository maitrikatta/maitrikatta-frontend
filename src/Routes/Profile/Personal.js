import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import defaultProfile from '../../assets/img/profile.jpg';

const MyIconButton = styled(IconButton)({
  color: 'primary.white',
  border: '1px solid gray',
  '&.MuiButton-root': {
    padding: '3px',
    minWidth: 'auto',
  },
  '&.MuiButton-root:hover': {
    border: '1px solid rgba(255,255,255,0.8)',
    backgroundColor: 'rgba(230, 230, 230,0.1)',
  },
});
function Personal({ personalData }) {
  const { imgRef, profile, setProfile } = personalData;
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyItems: 'center',
        padding: 2,
        gap: 3,
        justifyContent: { xs: 'center', md: 'start' },
        flexWrap: { xs: 'wrap', md: 'nowrap' },
        fontFamily: 'Dosis',
      }}
    >
      <Box aria-label="profile picture">
        {/* profile picture */}
        <Box
          component="div"
          sx={{
            width: { xs: '100px', sm: '150px' },
            height: { xs: '100px', sm: '150px' },
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img ref={imgRef} src={defaultProfile} alt="" />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'center', md: 'start' },
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography noWrap={true} variant="p" sx={{ fontSize: '1.3rem' }}>
          {profile.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <MyIconButton
            aria-label="upload picture"
            component="label"
            sx={{
              color: profile.isFileSelected ? '#008140' : 'secondary',
            }}
          >
            <input
              onChange={() =>
                setProfile((prevState) => {
                  return { ...prevState, setIsFileSelected: true };
                })
              }
              name="profile"
              required
              hidden
              accept="image/*"
              type="file"
            />
            <PhotoCamera />
          </MyIconButton>
          <MyIconButton
          // onClick={() => {
          //   setDisable(!disable);
          // }}
          >
            <ModeEditOutlineOutlinedIcon />
          </MyIconButton>
          <MyIconButton>
            <SettingsOutlinedIcon />
          </MyIconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
          }}
        >
          <Typography variant="body2">7 Posts</Typography>
          <Typography variant="body2">120 Followers</Typography>
          <Typography variant="body2">125 Following</Typography>
        </Box>
        <Box>
          <Typography
            component="p"
            variant="p"
            sx={{
              fontSize: '1rem',
              textAlign: { xs: 'center', sm: 'start' },
            }}
          >
            {profile.bio}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Personal;
