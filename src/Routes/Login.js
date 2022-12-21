import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import noAuthAxios from '../axios/noAuthAxios';
import { useEffect } from 'react';
import Logo from '../components/Logo';
import LogoWhite from '../components/LogoWhite';
import MySnackbar from './Login/MySnackbar';
import { useGlobalContext } from '../context';
function Login() {
  const navigate = useNavigate();
  const { darkMode } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [windowHeight, setWindowHeight] = useState(800);
  const [axiosError, setAxiosError] = useState(false);
  const [error, setError] = useState({
    emailErr: null,
    passwordErr: null,
  });
  const [hide, setHide] = useState(true);
  const passRef = useRef('');
  const emailRef = useRef('');
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  //send credentials

  const sendLoginForm = async ({ email, password }) => {
    try {
      const response = await noAuthAxios.post('/auth/login', {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', 'Bearer ' + token);
      navigate('/profile', { replace: true });
    } catch (error) {
      if (error.response.status === 401) {
        setAxiosError((prevState) => {
          return 'Invalid credentials..';
        });
      }
    }
  };

  // validation

  const validate = function (ev) {
    ev.preventDefault();
    const { email, password } = form;

    //validate email

    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      console.log('invalid email');
      emailRef.current.focus();
      setError((prevState) => {
        return {
          ...prevState,
          emailErr: 'Invalid email address',
        };
      });
      return;
    } else {
      setError((prevState) => {
        return {
          ...prevState,
          emailErr: null,
        };
      });
    }
    if (password.length < 8 || password.length > 12) {
      // validating password
      setError((prevState) => {
        return {
          ...prevState,
          passwordErr: 'range must be between 7 and 12',
        };
      });
      passRef.current.focus();
      return;
    }
    setError((prevState) => {
      return { ...prevState, passwordErr: null };
    });
    sendLoginForm({ ...form });
  };

  return (
    <Paper
      component="main"
      elevation={16}
      square
      sx={{
        display: 'flex',
        // paddingTop: '5%',
        width: '100%',
        alignItems: 'start',
        justifyContent: 'start',
        height: windowHeight,
        boxSizing: 'border-box',
      }}
    >
      {axiosError && <MySnackbar msg={axiosError} severity="error" />}
      <Paper
        elevation={10}
        sx={{
          width: { xs: '90%', sm: '400px' },
          margin: '10% auto',
          // height: '450px',
          paddingTop: 2,
          paddingBottom: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Dosis',
          boxShadow: '0 0 2px black',
        }}
      >
        {darkMode ? (
          <LogoWhite width="80" height="80" />
        ) : (
          <Logo width="80" height="80" />
        )}
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'start',
            gap: '25px',
            padding: '20px',
          }}
          action="#"
          onSubmit={(e) => validate(e)}
        >
          <div>
            <TextField
              onChange={(e) => {
                setForm({ ...form, email: e.target.value.trim() });
                setAxiosError(false);
              }}
              variant="outlined"
              label="email"
              placeholder="enter your email"
              size="medium"
              helperText={error.emailErr}
              type="email"
              inputRef={emailRef}
              color={error.emailErr ? 'error' : 'primary'}
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <TextField
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setAxiosError(false);
              }}
              variant="outlined"
              label="password"
              color={error.passwordErr ? 'error' : 'primary'}
              placeholder="create new password"
              size="medium"
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
          </div>
          <div>
            <Button
              size="medium"
              type="submit"
              color="success"
              variant="contained"
              sx={{
                width: '100%',
                boxShadow: '0 0 2px black',
              }}
            >
              Login
            </Button>
          </div>
          <div>
            <Typography sx={{ textAlign: 'center', fontFamily: 'Dosis' }}>
              Don't have an account{'  '}
              <Box
                component="a"
                sx={{ color: 'primary.main', textDecoration: 'none' }}
                href="register"
              >
                Register
              </Box>
            </Typography>
          </div>
        </Box>
      </Paper>
    </Paper>
  );
}

export default Login;
