

import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import {loginUser} from '../../features/auth/loginSlice'
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../../features/auth/Toast';
import './auth.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.login.status);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState('success');
  const [toastMessage, setToastMessage] = useState('');

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', email, password);

    try {
      await dispatch(loginUser({ email, password }));
      setToastSeverity('success');
      setToastMessage('Login successful');
      setToastOpen(true);

      // Redirect to Register page
      navigate('/otp');
    } catch (error) {
      setToastSeverity('error');
      setToastMessage('Login failed');
      setToastOpen(true);
    }
  };

  useEffect(() => {
    if (loginStatus === 'succeeded') {
      setToastSeverity('success');
      setToastMessage('Login successful');
      setToastOpen(true);
    }
  }, [loginStatus]);

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '140px' }}>
         <Paper elevation={3} sx={{ padding: 2, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
     <div className='login-lindev'>
     <div>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        </div>
   
        <div><Link to={'/register'} className='link-data'>Register</Link></div>
     </div>
      </form>
      {loginStatus === 'failed' && <div>Login failed. Please try again.</div>}
      <Toast open={toastOpen} onClose={handleToastClose} severity={toastSeverity} message={toastMessage} />
    </Paper>
    </Container>
 
  );
};

export default Login;
