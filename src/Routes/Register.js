import React, { useState, useEffect, useRef } from 'react';
import noAuthAxios from '../axios/noAuthAxios';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Typography,
  InputAdornment,
  Button,
  Paper,
  Box,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useGlobalContext } from '../context';
import MySnackbar from '../Routes/Login/MySnackbar';
import { ReactComponent as WhiteLogo } from '../assets/img/white-logo.svg';
import { ReactComponent as BlackLogo } from '../assets/img/black-logo.svg';
function Register() {
  const [axiosError, setAxiosError] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useGlobalContext();
  //removes bug: window scrolling on mobile
  const [windowHeight, setWindowHeight] = useState(800);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    nameErr: null,
    emailErr: null,
    passwordErr: null,
  });
  const [hide, setHide] = useState(true);
  const nameRef = useRef('');
  const passRef = useRef('');
  const sendData = async () => {
    try {
      const response = await noAuthAxios.post('/auth/register', { ...form });
      if (response.status === 201) {
        localStorage.setItem('token', 'Bearer ' + response.data.token);
        navigate('/Education/Science', { replace: true });
      }
    } catch (error) {
      if (error.response.status === 400) {
        setAxiosError(error.response.data.msg);
      }
    }
  };
  const validate = function (ev) {
    ev.preventDefault();
    const { name, password } = form;
    let isSpace = /[\s]/gi;

    // validating name
    if (name.match(/([^\s\w]|\d)/g)?.length >= 1) {
      setError((prevState) => {
        return { ...prevState, nameErr: 'numbers and symbols are not allowed' };
      });
      nameRef.current.focus();
      return;
    }
    if (name.length > 18) {
      setError((prevState) => {
        return { ...prevState, nameErr: 'Name cannot exceed length 18' };
      });
      nameRef.current.focus();
      return;
    } else if (name.match(isSpace)?.length > 1) {
      setError((prevState) => {
        return { ...prevState, nameErr: 'first and last name allowed only!' };
      });
      nameRef.current.focus();
      return;
    } else {
      setError((prevState) => {
        return { ...prevState, nameErr: null };
      });
    }

    // validating password

    if (password.match(isSpace)?.length >= 1) {
      setError((prevState) => {
        return { ...prevState, passwordErr: 'Spaces are not allowed' };
      });
      passRef.current.focus();
      return;
    }

    if (password.length < 8) {
      setError((prevState) => {
        return { ...prevState, passwordErr: 'length must be more than 7 char' };
      });
      passRef.current.focus();
      return;
    }
    if (password.length > 12) {
      setError((prevState) => {
        return {
          ...prevState,
          passwordErr: 'length must be less than 13 char',
        };
      });
      passRef.current.focus();
      return;
    }
    setError((prevState) => {
      return { ...prevState, passwordErr: null };
    });

    sendData();
  };
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  return (
    <Paper
      component="section"
      elevation={0}
      square
      sx={{
        width: '100%',
        height: windowHeight,
        backgroundSize: 'cover',
        display: 'flex',
        paddingTop: { xs: 4 },
        flexDirection: 'column',
        justifyContent: { md: 'space-evenly' },
        alignItems: 'center',
      }}
    >
      {axiosError && <MySnackbar msg={axiosError} severity="error" />}
      <Box component="form" action="#" onSubmit={(e) => validate(e)}>
        <Paper
          elevation={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: '20px',
            borderRadius: 2,
            textAlign: 'center',
            p: 4,
          }}
        >
          <Box>{darkMode ? <WhiteLogo /> : <BlackLogo />}</Box>
          <Box>
            <TextField
              onChange={(e) =>
                setForm({ ...form, name: e.target.value.trim() })
              }
              variant="outlined"
              label="name"
              placeholder="ex. John Doe"
              color={error.nameErr ? 'error' : 'primary'}
              autoFocus
              size="small"
              type="text"
              helperText={error.nameErr}
              required
              inputRef={nameRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <TextField
              onChange={(e) => {
                setForm({ ...form, email: e.target.value.trim() });
                setAxiosError(false);
              }}
              variant="outlined"
              label="email"
              placeholder="enter your email"
              size="small"
              type="email"
              color="primary"
              autoComplete="on"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <TextField
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setAxiosError(false);
              }}
              variant="outlined"
              label="password"
              color={error.passwordErr ? 'error' : 'primary'}
              required
              placeholder="create new password"
              size="small"
              type={hide ? 'password' : 'text'}
              helperText={error.passwordErr}
              inputRef={passRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    {hide ? (
                      <VisibilityOutlinedIcon onClick={() => setHide(!hide)} />
                    ) : (
                      <VisibilityOff onClick={() => setHide(!hide)} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <Button
              sx={{ width: '100%' }}
              color="success"
              type="submit"
              variant="contained"
            >
              Register
            </Button>
          </Box>
          <div>
            <Typography sx={{ textAlign: 'center', fontFamily: 'Dosis' }}>
              Have an account{' '}
              <Box
                component="a"
                sx={{ color: 'primary.main', textDecoration: 'none' }}
                href="login"
              >
                Log-In
              </Box>
            </Typography>
          </div>
        </Paper>
      </Box>
    </Paper>
  );
}

export default Register;
