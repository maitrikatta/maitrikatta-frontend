import React, { useEffect, useRef, useState } from 'react';
import customAxios from '../axios/authAxios';
import {
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  Divider,
} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
function Profile() {
  const [data, setData] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState(
    'Provide bio info about your self. or A simple quote'
  );
  const [college, setCollege] = useState('Where you study or studied');
  async function fetchProfile() {
    try {
      const { data } = await customAxios.get('/profile');
      setData(data);
      setName(data.username);
      setBio(data.bioStatus);
      setCollege(data.college);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <Paper
      elevation={6}
      sx={{
        width: { xs: '100%', sm: '100%', lg: '50%' },
        boxShadow: 1,
      }}
    >
      <Box
        component="header"
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyItems: 'center',
          padding: 2,
          gap: 3,
          justifyContent: 'center',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
        }}
      >
        <Box aria-label="profile picture">
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
            <img src={data.profilePath} alt="" style={{ flex: 'none' }} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap-reverse',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: { xs: 'center', sm: 'start' },
            }}
          >
            <Typography
              noWrap={true}
              variant="h5"
              sx={{ fontFamily: 'roboto-thin' }}
            >
              {data.username}
            </Typography>
            <Button
              size="small"
              sx={{ color: 'primary.brand' }}
              variant="outlined"
            >
              Edit Profile
            </Button>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: { xs: 'center', sm: 'start' },
            }}
          >
            <Typography variant="body2" sx={{ fontFamily: 'roboto-light' }}>
              7 Posts
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'roboto-light' }}>
              120 Followers
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'roboto-light' }}>
              125 Following
            </Typography>
          </Box>
          <Box>
            <Typography
              component="p"
              variant="p"
              sx={{
                fontFamily: 'roboto-light',
                fontSize: '0.8rem',
                textAlign: { xs: 'center', sm: 'start' },
              }}
            >
              {data.bioStatus}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box
        component="section"
        sx={{
          m: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 4,
        }}
      >
        <TextField
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          disabled
          label="name"
          size="small"
        ></TextField>
        <TextField
          onChange={(e) => {
            setCollege(e.target.value);
          }}
          value={college}
          disabled
          label="college"
          size="small"
        ></TextField>
        <TextField
          onChange={(e) => {
            setBio(e.target.value);
          }}
          label="Your Bio"
          value={bio}
          disabled
          // multiline
          maxRows={1}
        ></TextField>
        <Box>
          <Button disabled color="primary" variant="outlined">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default Profile;
