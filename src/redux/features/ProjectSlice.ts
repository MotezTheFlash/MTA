import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store";
import Cookies from "js-cookie";

interface ProjectState {
  loading: boolean;
  error: string | null;
  projects: any[];
  allProjects: any[];
}
interface ProjectsData {
  projectName: string;
  price: number;
  photo?: string;
  type?: string;
  details?: string;
  status: string;
  program: any;
}
export const addProject: any = createAsyncThunk(
  "create/addProject",
  async (projectData: ProjectsData, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.post(
        "http://localhost:5000/api/v1/projects",
        projectData,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      response.status === 201 && thunkAPI.dispatch(getProjects());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getProjects: any = createAsyncThunk(
  "get/getProjects",
  async (params: { status?: string }) => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        "http://localhost:5000/api/v1/projects",
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          params: params,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteProject: any = createAsyncThunk(
  "delete/deleteProject",
  async (projectId: string, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.delete(
        `http://localhost:5000/api/v1/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      response.status === 200 && thunkAPI.dispatch(getProjects());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editProject: any = createAsyncThunk(
  "edit/editProject",
  async (
    payload: { projectId: string; updatedDetails: ProjectsData },
    thunkAPI: any
  ) => {
    try {
      const response: AxiosResponse<any> = await axios.put(
        `http://localhost:5000/api/v1/projects/${payload.projectId}`,
        payload.updatedDetails,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      response.status === 200 && thunkAPI.dispatch(getProjects());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: ProjectState = {
  loading: false,
  error: null,
  projects: [],
  allProjects: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.projects;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "delete failed";
      });
  },
});

export default projectSlice.reducer;

export const selectProject = (state: RootState) => state.project;
