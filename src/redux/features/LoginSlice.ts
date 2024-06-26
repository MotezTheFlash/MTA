import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store";
import Cookies from "js-cookie";
interface LoginData {
  email: string;
  password: string;
}

interface LoginState {
  loading: boolean;
  error: string | null;
  userInfos: any;
}
export const loginUser: any = createAsyncThunk(
  "login/LoginUser",
  async (loginData: LoginData) => {
    try {
      const response: AxiosResponse<any> = await axios.post(
        "http://localhost:5000/api/v1/auth/login",

        loginData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getUserDetails: any = createAsyncThunk(
  "getMe/GetUser",
  async () => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        "http://localhost:5000/api/v1/auth/userinfo",
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: LoginState = {
  loading: false,
  error: null,
  userInfos: {},
};

const loginSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "login failed";
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfos = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "cannot get user infos";
      });
  },
});

export default loginSlice.reducer;
export const selectLogin = (state: RootState) => state.login;
