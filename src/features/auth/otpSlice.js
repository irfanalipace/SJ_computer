
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import axios from 'axios';
import { toast } from 'react-toastify';

// Async thunk to log in user

export const verifyUser = createAsyncThunk('verify-otp/verifyUser', async (userData) => {
  try {
      // Get the token from localStorage
      const token = localStorage.getItem('authToken');
      console.log(token, 'token data from otp');

      // Configure headers for this specific request
      const config = {

          headers: {
              Authorization: `Bearer ${token}`,
          },
      };

      const response = await api.verifyUser(userData, config);
     
      return response.data;
  } catch (error) {
      
      alert('wrong otp')
      throw error;
  }
});


const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

const verifySlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export const { verifyStart, verifySuccess, verifyFailure} = verifySlice.actions;

export default verifySlice.reducer;
