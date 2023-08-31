import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../../features/auth/otpSlice';
import Toast from '../../features/auth/Toast';
import './auth.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const OTP = () => {
  const [otp_code, setOTP] = useState('');
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const otpStatus = useSelector((state) => state.login.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(verifyUser({ otp_code }));
    } catch (error) {
     alert('error of otp')
    }
  };
 
  useEffect(() => {
    if (otpStatus === 'succeeded') {
      
      navigate('/')
    }
  }, [otpStatus]);

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '140px' }}>
      <Paper elevation={3} sx={{ padding: 2, maxWidth: 400 }}>
        <Typography variant="h6" gutterBottom>
          Verify OTP
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Verify OTP"
            fullWidth
            margin="normal"
            value={otp_code}
            onChange={(e) => setOTP(e.target.value)}
          />

          <div className="login-lindev">
            <Button type="submit" variant="contained" color="primary">
              Verify
            </Button>
          </div>
        </form>
        {otpStatus === 'failed' && <div>OTP verification failed. Please try again.</div>}
      </Paper>
    </Container>
  );
};

export default OTP;
