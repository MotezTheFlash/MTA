import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store";
import Cookies from "js-cookie";

interface DevState {
  loading: boolean;
  error: string | null;
  devs: any[];
  allDevs: any[];
}
interface DeveloperData {
  username: string;
  location: string;
  email: string;
  phone: string;
  status: string;
}
export const addDeveloper: any = createAsyncThunk(
  "create/createDeveloper",
  async (developerData: DeveloperData, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.post(
        "http://localhost:5000/api/v1/developers",
        developerData,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      response.status === 201 && thunkAPI.dispatch(getDevelopers());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getDevelopers: any = createAsyncThunk(
  "get/getDevelopers",
  async (params: { status?: string }) => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        "http://localhost:5000/api/v1/developers",
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

export const deleteDev: any = createAsyncThunk(
  "delete/deleteDev",
  async (devId: string, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.delete(
        `http://localhost:5000/api/v1/developers/${devId}`,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      response.status === 200 && thunkAPI.dispatch(getDevelopers());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editDev: any = createAsyncThunk(
  "edit/editDev",
  async (
    payload: { id: string; updatedDetails: DeveloperData },
    thunkAPI: any
  ) => {
    try {
      const response: AxiosResponse<any> = await axios.put(
        `http://localhost:5000/api/v1/developers/${payload.id}`,
        payload.updatedDetails,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      response.status === 200 && thunkAPI.dispatch(getDevelopers());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: DevState = {
  loading: false,
  error: null,
  devs: [],
  allDevs: [],
};

const devSlice = createSlice({
  name: "developer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDeveloper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDeveloper.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addDeveloper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(getDevelopers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDevelopers.fulfilled, (state, action) => {
        state.loading = false;
        state.devs = action.payload.developers;
      })
      .addCase(getDevelopers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(deleteDev.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDev.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteDev.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "delete failed";
      })
      .addCase(editDev.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editDev.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editDev.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "delete failed";
      });
  },
});

export default devSlice.reducer;

export const selectDev = (state: RootState) => state.developer;
