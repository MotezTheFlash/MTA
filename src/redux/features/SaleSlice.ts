import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store";
import Cookies from "js-cookie";

interface SaleState {
  loading: boolean;
  error: string | null;
  sales: any[];
  allSales: any[];
}
interface SalesData {
  date: string;
  commission: number;
  VAT: string;
  status: string;
  project: any;
  customer: any;
}

export const addSale: any = createAsyncThunk(
  "create/addSale",
  async (saleData: SalesData, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.post(
        "http://localhost:5000/api/v1/sales",
        saleData,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      response.status === 201 && thunkAPI.dispatch(getSales());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getSales: any = createAsyncThunk(
  "get/getSales",
  async (params: { status?: string }) => {
    try {
      const response: AxiosResponse<any> = await axios.get(
        "http://localhost:5000/api/v1/sales",
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
export const deleteSale: any = createAsyncThunk(
  "delete/deleteSale",
  async (saleId: string, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.delete(
        `http://localhost:5000/api/v1/sales/${saleId}`,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      response.status === 200 && thunkAPI.dispatch(getSales());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editSale: any = createAsyncThunk(
  "edit/editSale",
  async (
    payload: { saleId: string; updatedDetails: SalesData },
    thunkAPI: any
  ) => {
    try {
      const response: AxiosResponse<any> = await axios.put(
        `http://localhost:5000/api/v1/sales/${payload.saleId}`,
        payload.updatedDetails,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      response.status === 200 && thunkAPI.dispatch(getSales());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: SaleState = {
  loading: false,
  error: null,
  sales: [],
  allSales: [],
};

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSale.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(getSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSales.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload.sales;
      })
      .addCase(getSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(deleteSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSale.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "delete failed";
      });
  },
});

export default saleSlice.reducer;

export const selectSale = (state: RootState) => state.sale;
