import React, { useState, useRef } from 'react';
import noAuthAxios from '../axios/noAuthAxios';
import { useNavigate } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import register from '../style/register.module.css';
import {
  TextField,
  InputAdornment,
  Button,
  Icon,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
function Register() {
  const [axiosError, setAxiosError] = useState(false);
  const navigate = useNavigate();
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

  return (
    <Box component="section" className={register.wrapper}>
      <Box
        component="form"
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        action="#"
        onSubmit={(e) => validate(e)}
      >
        <Paper
          elevation={16}
          square
          sx={{
            width: { xs: '85%', sm: '450px', md: '500px' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '20px',
            textAlign: 'center',
            p: 3,
          }}
        >
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
            <p className={register.heading}>maitrikatta</p>
          </div>

          <div className={register.snippet}>
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
          </div>
          <div className={register.snippet}>
            <TextField
              onChange={(e) => setForm({ ...form, password: e.target.value })}
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
          </div>
          <div className={register.snippet}>
            <Button color="primary" type="submit" variant="contained">
              Register
            </Button>
          </div>
          <div className={register.snippet}>
            <p className={register.sign}>
              Have an account <a href="login">Log-In</a>
            </p>
          </div>
        </Paper>
      </Box>
    </Box>
  );
}

export default Register;
