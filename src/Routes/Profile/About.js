import React from 'react';
import { Box, Button, TextField } from '@mui/material';
function About({ personalData }) {
  const { profile, setProfile } = personalData;
  return (
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
        value={profile.name}
        label="name"
        size="small"
      ></TextField>
      <TextField
        disabled={profile.disable}
        onChange={(ev) => {
          setProfile((prevState) => {
            return { ...prevState, college: ev.target.value };
          });
        }}
        value={profile.college}
        required
        name="college"
        label="college"
        size="small"
      ></TextField>
      <TextField
        label="Your Bio"
        required
        disabled={profile.disable}
        onChange={(ev) =>
          setProfile((prevState) => {
            return { ...prevState, bio: ev.target.value };
          })
        }
        name="bio"
        value={profile.bio}
        // multiline
        maxRows={1}
      ></TextField>
      <Box>
        <Button type="submit" disabled={profile.disable} variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default About;
