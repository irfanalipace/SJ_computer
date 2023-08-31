
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const registerUser = createAsyncThunk('api/registerUser', async (userData) => {
  try {
    const response = await api.registerUser(userData);
    return response.data;
  } catch (error) {
    throw error.response.data; 
  }
});

  const registerSlice = createSlice({
    name: 'register',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.fulfilled, (state, action) => {
          state.registrationStatus = 'succeeded';
          toast.success('Registration successful!');
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.registrationStatus = 'failed';
          if (action.payload && action.payload.errors) {
            const errors = action.payload.errors;
            Object.keys(errors).forEach((field) => {
              const errorMessage = errors[field][0];
         
            });
          } else {
            toast.error('Registration failed.');
          }
        });
    },
  });
  
  
  export default registerSlice;
  