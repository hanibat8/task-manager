import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import {getRoleBasesUrl} from '../utils/apiHelpers';

interface projectData{
    name: string;
    decription: string;
}

interface FetchProjectByIdParams {
    projectById: string;
    role: string;
  }

export const fetchProjectById = createAsyncThunk('projects/fetchProjectsById', async ({projectById, role}: FetchProjectByIdParams, thunkAPI) => {
    try {
      const url=getRoleBasesUrl(`project/${projectById}`,role)
      const response = await axiosInstance.get(url);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (role:string, thunkAPI) => {
    try {
      const url=getRoleBasesUrl(`project/`,role)
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const fetchProjectTasks = createAsyncThunk('projects/fetchProjectTasks', async ({projectById,role}:FetchProjectByIdParams, thunkAPI) => {
  try {
    const url=getRoleBasesUrl(`project/${projectById}/task`,role)
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


export const createProject = createAsyncThunk('projects/createProject', async (projectData : projectData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/v1/admin/project',projectData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateProject = createAsyncThunk('projects/updateProject', async (userData: projectData, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/v1/admin/project`,userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
});

interface AssignProjectParams {
    selectedProject: string;
    user_ids: string[];
  }

export const assignProject = createAsyncThunk('projects/assignProject', async ({selectedProject, user_ids}: AssignProjectParams, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`v1/admin/project/${selectedProject}/assign`,{user_ids});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
});


interface ProjectsState {
    projects: Projects[] | [];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: ErrorObj | null;
}

interface ErrorObj{
    message:string
}
  
interface Projects {
    name: string;
    description: string;
}

const initialState: ProjectsState={
    projects: [],
    status: 'idle',
    error: null
}

const projectsSlice=createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProjects.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProjects.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.projects = action.payload.data.data;
            state.error=null;
        })
        .addCase(fetchProjects.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as ErrorObj;
            state.projects=[]
        })
        .addCase(createProject.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createProject.fulfilled, (state, action) => {
            state.status = 'succeeded';
            // state.user = action.payload;
            state.error=null;
        })
        .addCase(createProject.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as ErrorObj;
        })
        .addCase(updateProject.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateProject.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.error=null;
        })
        .addCase(updateProject.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as ErrorObj;
        })
        .addCase(fetchProjectById.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProjectById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.error=null;
        })
        .addCase(fetchProjectById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as ErrorObj;
        })
        .addCase(fetchProjectTasks.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProjectTasks.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.error=null;
        })
        .addCase(fetchProjectTasks.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload as ErrorObj;
        });
  }
})

export default projectsSlice.reducer;