import React, { useState, useEffect, useSelector } from 'react';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/registerSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './auth.css'
const Register = () => {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorhandle = useSelector((state) => state.register.error);
  console.log(errorhandle,'handleerror')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(userData));
      toast.success('Registration successful!'); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); 
      
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
    
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
     
    }));
 
  };

  useEffect(() => {
   
    return () => {
      toast.dismiss();
    };
  }, []);



  
  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '140px' }}>
      <Paper elevation={3} sx={{ padding: 2, maxWidth: 400, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
          <TextField
            label="Confirm Password"
            fullWidth
            margin="normal"
            type="password"
            name="password_confirmation"
            value={userData.password_confirmation}
            onChange={handleInputChange}
          />
           <div className='login-lindev'>
     <div>
        <Button type="submit" variant="contained" color="primary">
         Register
        </Button>
        </div>
   
        <div><Link to={'/login'} className='link-data'>Login</Link></div>
     </div>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
