import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authAxios from '../axios/authAxios';
import defaultProfile from '../assets/img/profile.jpg';
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
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState('Your Name');
  const [bio, setBio] = useState('Describe your self in few words');
  const [college, setCollege] = useState('Where you study or studied');
  const [profilePath, setProfilePath] = useState(defaultProfile);
  const [disable, setDisable] = useState(true);
  const [isFileSelected, setIsFileSelected] = useState(false);
  async function sendData(event) {
    event.preventDefault();
    const formData = new FormData();
    console.log();
    formData.append('bioStatus', event.target['bio'].value);
    formData.append('profile', event.target['profile'].files[0]);
    formData.append('college', event.target['college'].value);
    const { data } = await authAxios.post('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (data) {
      const { bioStatus, college, profilePath } = data;
      setBio(bioStatus);
      setCollege(college);
      setProfilePath(profilePath);
      setDisable(true);
    }
  }
  async function fetchData() {
    try {
      const {
        data: { login_info, personal_info },
      } = await authAxios.get('/profile');
      setName(login_info.name);

      // if personal info is set

      if (personal_info) {
        const { bioStatus, college, profilePath } = personal_info;
        setBio(bioStatus);
        setCollege(college);
        setProfilePath(profilePath);
        setDisable(true);
      } else {
        // set edit true
        setDisable(false);
      }
    } catch (error) {
      if (error?.response?.status === 401)
        navigate('/login', { replace: true });
    }
  }
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Paper
      elevation={6}
      sx={{
        width: { xs: '100%', sm: '100%', lg: '50%' },
        boxShadow: 1,
      }}
    >
      <form
        action="#"
        method="post"
        onSubmit={(event) => {
          sendData(event);
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
                position: 'relative',
              }}
            >
              <img src={profilePath} alt="" />
              <IconButton
                aria-label="upload picture"
                component="label"
                sx={{
                  color: isFileSelected ? '#008140' : 'secondary',
                  position: 'absolute',
                  bottom: -4,
                }}
              >
                <input
                  onChange={() => setIsFileSelected(true)}
                  name="profile"
                  required
                  hidden
                  accept="image/*"
                  type="file"
                />
                <PhotoCamera />
              </IconButton>
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
                {name}
              </Typography>
              <Button
                size="small"
                sx={{ color: 'primary.brand' }}
                variant="outlined"
                // onClick={() => {
                //   setDisable(!disable);
                // }}
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
                {bio}
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
            disabled={true}
            value={name}
            label="name"
            size="small"
          ></TextField>
          <TextField
            disabled={disable}
            onChange={(ev) => {
              setCollege(ev.target.value);
            }}
            value={college}
            required
            name="college"
            label="college"
            size="small"
          ></TextField>
          <TextField
            label="Your Bio"
            required
            disabled={disable}
            onChange={(ev) => setBio(ev.target.value)}
            name="bio"
            value={bio}
            // multiline
            maxRows={1}
          ></TextField>
          <Box>
            <Button type="submit" disabled={disable} variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}

export default Profile;
