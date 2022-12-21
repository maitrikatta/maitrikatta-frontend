import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import authAxios from '../axios/authAxios';
import setImageBlob from '../lib/setImageBlob';
import { Paper, Divider } from '@mui/material';
import Personal from './Profile/Personal';
import About from './Profile/About';
const initialState = {
  name: 'Your Name',
  bio: 'Describe your self in few words',
  imgKey: null,
  college: 'Where you study or studied',
  disable: true,
  isFileSelected: false,
};

function Profile() {
  const navigate = useNavigate();
  const imgRef = useRef(null);

  const [profile, setProfile] = useState(initialState);

  // when
  async function sendData(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('bioStatus', event.target['bio'].value);
    formData.append('profile', event.target['profile'].files[0]);
    formData.append('college', event.target['college'].value);

    const { data } = await authAxios.post('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // this sets state after fetching data
    if (data) {
      const { bioStatus: bio, college, profilePath: imgKey } = data;

      setProfile((prevState) => {
        return {
          ...prevState,
          bio,
          college,
          imgKey,
          disable: true,
        };
      });
    }
  }
  function getImage() {
    const route = 'images/public/profile';
    let imgKey = profile.imgKey;
    setImageBlob({ route, targetRef: imgRef, imgKey });
  }
  async function fetchData() {
    try {
      const {
        data: { login_info, personal_info },
      } = await authAxios.get('/profile');

      setProfile((prevState) => {
        return { ...prevState, name: login_info.name };
      });

      // if personal info is set
      if (personal_info) {
        const { bioStatus: bio, college, profilePath: imgKey } = personal_info;
        setProfile((prevState) => {
          return {
            ...prevState,
            bio,
            college,
            imgKey,
            disable: true,
          };
        });
      } else {
        // let edit the form
        setProfile((prevState) => {
          return { ...prevState, disable: false };
        });
      }
    } catch (error) {
      if (error?.response?.status === 401)
        navigate('/login', { replace: true });
    }
  }
  useEffect(() => {
    // load profile details
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (profile.imgKey != null) getImage();
  }, [profile.imgKey]);
  return (
    <Paper
      elevation={6}
      sx={{
        width: { xs: '100%', md: '450px', lg: '50%' },
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
        <Personal personalData={{ imgRef, profile, setProfile }} />
        <Divider />
        <About personalData={{ profile, setProfile }} />
      </form>
    </Paper>
  );
}

export default Profile;
