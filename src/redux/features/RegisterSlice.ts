import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store";

interface RegisterDataManager {
  username: string;
  password: string;
  email: string;
  company: string;
}
interface RegisterDataFreelancer {
  username: string;
  password: string;
  email: string;
  jobTitle: string;
  academicLevel: string;
  location: string;
}

interface RegisterState {
  loading: boolean;
  error: string | null;
}

export const registerMg: any = createAsyncThunk(
  "register/registerManager",
  async (registerData: RegisterDataManager) => {
    try {
      const response: AxiosResponse<any> = await axios.post(
        "http://localhost:5000/api/v1/auth/registermg",
        registerData,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const registerFr: any = createAsyncThunk(
  "register/registerFreelancer",
  async (registerData: RegisterDataFreelancer) => {
    try {
      const response: AxiosResponse<any> = await axios.post(
        "http://localhost:5000/api/v1/auth/registeremp",
        registerData,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: RegisterState = {
  loading: false,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerMg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerMg.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerMg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(registerFr.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerFr.fulfilled, (state) => {
        state.loading = false;
        console.log(state);
      })
      .addCase(registerFr.rejected, (state, action) => {
        state.loading = false;
        console.log(action);

        state.error = action.error.message || "Registration failed";
      });
  },
});

export default registerSlice.reducer;

export const selectRegister = (state: RootState) => state.register;
