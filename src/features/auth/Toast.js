import React from 'react';
 import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
const Toast = ({ open, onClose, severity, message }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Toast;
