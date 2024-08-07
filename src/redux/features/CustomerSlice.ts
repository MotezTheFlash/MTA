import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store";
import Cookies from "js-cookie";

interface CustomerState {
  loading: boolean;
  error: string | null;
  customers: any[];
  allCustomers: any[];
}
interface CustomerData {
  username: string;
  location: string;
  email: string;
  phone: string;
  status: string;
  projects: any;
}

export const addCustomer: any = createAsyncThunk(
  "create/createCustomer",
  async (customerData: CustomerData, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.post(
        "http://localhost:5000/api/v1/customers",
        customerData,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      response.status === 201 && thunkAPI.dispatch(getCustomers());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getCustomers: any = createAsyncThunk(
  "get/getCustomers",
  async (params: { status?: string }) => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        "http://localhost:5000/api/v1/customers",
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
export const deleteCustomer: any = createAsyncThunk(
  "delete/deleteCustomer",
  async (devId: string, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.delete(
        `http://localhost:5000/api/v1/customers/${devId}`,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      response.status === 200 && thunkAPI.dispatch(getCustomers());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editCustomer: any = createAsyncThunk(
  "edit/editCustomer",
  async (
    payload: { id: string; updatedDetails: CustomerData },
    thunkAPI: any
  ) => {
    try {
      const response: AxiosResponse<any> = await axios.put(
        `http://localhost:5000/api/v1/customers/${payload.id}`,
        payload.updatedDetails,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      response.status === 200 && thunkAPI.dispatch(getCustomers());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: CustomerState = {
  loading: false,
  error: null,
  customers: [],
  allCustomers: [],
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(getCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.customers;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "delete failed";
      });
  },
});

export default customerSlice.reducer;

export const selectCustomer = (state: RootState) => state.customer;
