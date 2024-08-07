import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store";
import Cookies from "js-cookie";

interface ProgramState {
  loading: boolean;
  error: string | null;
  programs: any[];
  allPrograms: any[];
}
interface ProgramsData {
  programName: string;
  totalAmount: number;
  photo?: string;
  type?: string;
  details?: string;
  status: string;
  developer: any;
}
export const addProgram: any = createAsyncThunk(
  "create/addProgram",
  async (programData: ProgramsData, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.post(
        "http://localhost:5000/api/v1/programs",
        programData,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      response.status === 201 && thunkAPI.dispatch(getPrograms());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getPrograms: any = createAsyncThunk(
  "get/getPrograms",
  async (params: { status?: string }) => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        "http://localhost:5000/api/v1/programs",
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
export const deleteProg: any = createAsyncThunk(
  "delete/deleteProg",
  async (progId: string, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.delete(
        `http://localhost:5000/api/v1/programs/${progId}`,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      response.status === 200 && thunkAPI.dispatch(getPrograms());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editProg: any = createAsyncThunk(
  "edit/editProg",
  async (
    payload: { id: string; updatedDetails: ProgramsData },
    thunkAPI: any
  ) => {
    try {
      const response: AxiosResponse<any> = await axios.put(
        `http://localhost:5000/api/v1/programs/${payload.id}`,
        payload.updatedDetails,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      response.status === 200 && thunkAPI.dispatch(getPrograms());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: ProgramState = {
  loading: false,
  error: null,
  programs: [],
  allPrograms: [],
};

const progSlice = createSlice({
  name: "program",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProgram.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(getPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.programs = action.payload.programs;
      })
      .addCase(getPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(deleteProg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProg.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteProg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "delete failed";
      });
  },
});

export default progSlice.reducer;

export const selectProgram = (state: RootState) => state.program;
