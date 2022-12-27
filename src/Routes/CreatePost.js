import React, { useReducer, useRef, useEffect, useState } from 'react';
import {
  TextField,
  Typography,
  Button,
  Box,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
} from '@mui/material';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import FileUpload from '@mui/icons-material/DriveFolderUploadOutlined';
import Selected from '@mui/icons-material/CheckBoxRounded';
import authAxios from '../axios/authAxios';
import { useNavigate } from 'react-router-dom';
import { initialState, reducer } from '../reducers/createPostReducer';
import ErrorIcon from '@mui/icons-material/Error';
import NewSnackbar from './Login/NewSnackbar';
function CreatePost() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [openSnack, setOpenSnack] = useState(false);
  const headRef = useRef();
  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!state.universalError) {
      const formData = new FormData();
      formData.append('PostHeading', state.heading);
      formData.append('Content', state.content);
      formData.append('Category', state.category);
      formData.append('profile', ev.target['profile'].files[0]);
      try {
        const response = await authAxios.post('/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response?.status === 201) {
          dispatch('FORM_UPLOAD_SUCCESS');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    if (state.universalError != false) setOpenSnack(true);
  }, [state]);
  return (
    <>
      <NewSnackbar
        msg={state.universalError}
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
        severity="error"
      />
      <Paper
        component="form"
        elevation={6}
        sx={{
          width: { xs: '100%', md: '550px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 3,
          padding: 3,
          boxShadow: 1,
        }}
        onSubmit={handleSubmit}
      >
        <Box>
          {state.isFormUploading && <LinearProgress color="secondary" />}
        </Box>
        <Box>
          <Typography
            textAlign={'center'}
            variant="subtitle1"
            sx={{ fontFamily: 'Dosis' }}
          >
            CREATE A POST
          </Typography>
        </Box>
        <Box>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="select-label">Category</InputLabel>
            <Select
              label="Category"
              value={state.category}
              onChange={(e) =>
                dispatch({
                  type: 'CATEGORY_CHANGED',
                  payload: e.target.value,
                })
              }
              required
            >
              <MenuItem value="Arts">Arts</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="Geopolitics">Geopolitics</MenuItem>
              <MenuItem value="Trade">Trade</MenuItem>
              <MenuItem value="News">News</MenuItem>
              <MenuItem value="Computer">Computer</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <TextField
            onChange={(ev) =>
              dispatch({
                type: 'HEADING_CHANGED',
                payload: ev.target.value,
              })
            }
            variant="outlined"
            label="POST HEADING"
            color={state.headingErrorText ? 'error' : 'primary'}
            type="text"
            size="small"
            helperText={state.headingErrorText}
            inputRef={headRef}
            value={state.heading}
            sx={{ width: '100%' }}
          ></TextField>
        </Box>
        <Box>
          <TextField
            onChange={(ev) =>
              dispatch({ type: 'CONTENT_CHANGED', payload: ev.target.value })
            }
            required
            value={state.content}
            variant="outlined"
            label="POST CONTENT"
            color="primary"
            type="text"
            multiline
            rows={10}
            sx={{ width: '100%' }}
          ></TextField>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            aria-label="upload picture"
            component="label"
            color={state.fileSizeError ? 'error' : 'inherit'}
            endIcon={
              state.isFileSelected ? (
                state.fileSizeError ? (
                  <ErrorIcon color="error" />
                ) : (
                  <Selected color="success" />
                )
              ) : (
                <FileUpload />
              )
            }
          >
            <input
              onChange={(ev) =>
                dispatch({ type: 'FILE_CHANGED', payload: ev.target })
              }
              hidden
              name="profile"
              accept="image/*"
              type="file"
              required
            />
            Photo
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            endIcon={<PublishRoundedIcon />}
            disabled={state.isFormUploading && true}
            onClick={() => {
              dispatch({ type: 'FORM_UPLOAD_CLICK', headRef });
            }}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </>
  );
}

export default CreatePost;
