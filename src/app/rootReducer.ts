import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import projectsreducer from '../features/projectsSlice';
import usersSlice from '../features/usersSlice';

const rootReducer = combineReducers({
  user: userReducer,
  projects: projectsreducer,
  users:usersSlice
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
