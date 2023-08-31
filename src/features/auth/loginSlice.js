import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';


export const loginUser = createAsyncThunk('login/loginUser', async (userData) => {

try {
  const response = await api.loginUser(userData);
  const token = response.data?.data?.access_token;
 

  localStorage.setItem('authToken', token);

  return response.data;
} catch (error) {
  throw error;
}
});

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = loginSlice.actions;

export default loginSlice.reducer;
