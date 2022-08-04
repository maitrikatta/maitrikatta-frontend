import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import register from '../style/register.module.css';
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Icon,
  Typography,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import noAuthAxios from '../axios/noAuthAxios';
import ErrorIcon from '@mui/icons-material/Error';
function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [axiosError, setAxiosError] = useState();
  const [error, setError] = useState({
    emailErr: null,
    passwordErr: null,
  });
  const [hide, setHide] = useState(true);
  const passRef = useRef('');
  const emailRef = useRef('');
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
    <section className={register.wrapper}>
      <form action="#" onSubmit={(e) => validate(e)} className={register.left}>
        <div className={register.snippet_wrapper}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              alignSelf: 'stretch',
              textAlign: 'center',
              height: '30px',
              '&.MuiBox-root': {
                bgcolor: '#f44336',
              },
              visibility: axiosError ? 'unset' : 'hidden',
            }}
          >
            <Icon sx={{ ml: 1, color: 'white' }}>
              <ErrorIcon />
            </Icon>
            <Typography sx={{ color: 'white' }}>{axiosError}</Typography>
          </Box>
          <div className={register.snippet}>
            <Typography
              sx={{
                fontFamily: 'apollo',
                fontSize: '1.2rem',
                color: 'primary.brand',
                letterSpacing: '2px',
                margin: 'auto',
              }}
            >
              Login
            </Typography>
          </div>

          <div className={register.snippet}>
            <TextField
              onChange={(e) => {
                setForm({ ...form, email: e.target.value.trim() });
                setAxiosError(false);
              }}
              variant="outlined"
              label="email"
              placeholder="enter your email"
              size="small"
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
          <div className={register.snippet}>
            <TextField
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                setAxiosError(false);
              }}
              variant="outlined"
              label="password"
              color={error.passwordErr ? 'error' : 'primary'}
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
          </div>
          <div className={register.snippet}>
            <Button
              size="small"
              color="primary"
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </div>
          <div className={register.snippet}>
            <p className={register.sign}>
              Don't have an account <a href="register">Register</a>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
