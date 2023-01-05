import React, { useState } from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
function MySnackbar({ msg, severity }) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Snackbar
      open={open}
      message={msg}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      action={action}
      // TransitionComponent={transition}
      autoHideDuration={6000}
      onClose={handleClose}
      key={msg + Math.random()}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
}

export default MySnackbar;
