import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance,{setAuthToken} from '../api/axiosInstance';

interface registerUserData{
    name: string;
    password: string;
    email:string;
}

export const register = createAsyncThunk('signUp', async (userData: registerUserData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/v1/register`,userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
});

interface loginUserData{
    password: string;
    email:string;
}

export const login = createAsyncThunk('login', async (userData: loginUserData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/v1/login`,userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/v1/logout`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
});

interface AuthState {
    user: User | null;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: ErrorObj | null;
}

interface ErrorObj{
    message:string
}
interface User {
    name: string;
    email: string;
}

const initialState: AuthState={
    user: null,
    token: null,
    status: 'idle',
    error: null
}

const userSlice=createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(register.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload.data.user;
            state.token=action.payload.token;
            state.error=null;
            setAuthToken(action.payload.data.token)
            localStorage.setItem('token',action.payload.data.token)
            localStorage.setItem('role',action.payload.data.user.role)
        })
        .addCase(register.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as ErrorObj;
            state.user=null;
        })
        .addCase(login.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(login.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload.data.user;
            state.token=action.payload.data.token;
            state.error=null;
            setAuthToken(action.payload.data.token)
            localStorage.setItem('token',action.payload.data.token)
            localStorage.setItem('role',action.payload.data.user.role)
        })
        .addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as ErrorObj;
            state.user=null;
        })
        .addCase(logout.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = null;
            state.token = null;
            state.error=null;
            setAuthToken(null);
            localStorage.removeItem('token')
            localStorage.removeItem('role')
        })
        .addCase(logout.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as ErrorObj;
        });
  }
})

export default userSlice.reducer;