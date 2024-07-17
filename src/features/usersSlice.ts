import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

export const fetchUsers = createAsyncThunk('users/getUsers', async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/v1/admin/user`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
});

interface userData{
    name: string;
    email:string;
    role:string
}

export const createUser = createAsyncThunk('users/createUser', async (userData: userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/v1/admin/user`,userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const fetchUserById = createAsyncThunk('users/fetchProjectByUser', async (userId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`v1/admin/user/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
});

const initialState={
    users: [],
    status: 'idle',
    error: null
}

const usersSlice=createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = action.payload.data.data;
            state.error=null;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            state.users=[]
        })
        .addCase(createUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.error=null;
        })
        .addCase(createUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(fetchUserById.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchUserById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.error=null;
        })
        .addCase(fetchUserById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
  }
})

export default usersSlice.reducer;