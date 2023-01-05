import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom';
import loginGIF from '../../assets/img/loginIconGif.gif';
function LoginDialog({ children, dialogOpen, handleDialogClose }) {
  const navigate = useNavigate();
  return (
    <Dialog open={dialogOpen} sx={{ fontFamily: 'Dosis' }}>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar src={loginGIF}></Avatar>
        Please Login
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleDialogClose()}
          variant="normal"
          size="small"
        >
          close
        </Button>
        <Button
          color="success"
          variant="contained"
          size="small"
          endIcon={<LockOpenIcon />}
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginDialog;
