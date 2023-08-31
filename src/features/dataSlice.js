import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

export const fetchItems = createAsyncThunk('data/fetchItems', async () => {
  
  const response = await api.getItems(); 

  return response.data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export default dataSlice.reducer;