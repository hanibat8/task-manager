import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import {setAuthToken} from '../api/axiosInstance';

const store = configureStore({
    reducer: rootReducer
});

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

export type AppDispatch = typeof store.dispatch;
export default store;