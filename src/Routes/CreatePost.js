import React, { useState } from 'react';
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
} from '@mui/material';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import FileUpload from '@mui/icons-material/DriveFolderUploadOutlined';
import Selected from '@mui/icons-material/CheckBoxRounded';
import UploadedIcon from '@mui/icons-material/CloudDoneRounded';
import authAxios from '../axios/authAxios';
import { useNavigate } from 'react-router-dom';
function CreatePost() {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const navigate = useNavigate();
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [category, setCategory] = useState('');
  async function handleSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append('PostHeading', heading);
    formData.append('Content', content);
    formData.append('Category', category);
    formData.append('profile', ev.target['profile'].files[0]);
    try {
      const response = await authAxios.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response?.status === 201) setIsUploaded(true);
      setTimeout(() => {
        navigate('/Education/Arts');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
  return (
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
        <Typography
          textAlign={'center'}
          color="primary"
          variant="h6"
          sx={{ fontFamily: 'roboto-light' }}
        >
          CREATE A POST
        </Typography>
      </Box>
      <Box>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="select-label">Category</InputLabel>
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          onChange={(ev) => setHeading(ev.target.value)}
          required
          variant="outlined"
          label="POST HEADING"
          color="primary"
          type="text"
          size="small"
          sx={{ width: '100%' }}
        ></TextField>
      </Box>
      <Box>
        <TextField
          onChange={(event) => setContent(event.target.value)}
          required
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
          color="inherit"
          endIcon={
            isFileSelected ? <Selected color="success" /> : <FileUpload />
          }
        >
          <input
            onChange={() => setIsFileSelected(true)}
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
          endIcon={isUploaded ? <UploadedIcon /> : <PublishRoundedIcon />}
        >
          {isUploaded ? 'Done' : 'Send'}
        </Button>
      </Box>
    </Paper>
  );
}

export default CreatePost;
