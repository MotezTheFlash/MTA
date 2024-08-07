import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store";
import Cookies from "js-cookie";
interface UserData {
  email: string;
  phone: string;
  location: string;
  username: string;
}

interface UserState {
  loading: boolean;
  error: string | null;
  userInfos: any;
}
export const updateUser: any = createAsyncThunk(
  "update/updateUser",
  async (userData: FormData, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.put(
        "http://localhost:5000/api/v1/users",
        userData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      response.status === 200 && thunkAPI.dispatch(getUserDetails());
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

const initialState: UserState = {
  loading: false,
  error: null,
  userInfos: {},
};

const userSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "updating user failed";
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

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
