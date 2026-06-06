import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

export const fetchCompare = createAsyncThunk(
  "compare/fetchCompare",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/compare");

      return res.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error ||
        "Failed to fetch compare list"
      );
    }
  }
);


export const addCompare = createAsyncThunk(
  "compare/addCompare",
  async (propertyId, thunkAPI) => {
    try {
      await api.post(`/compare/${propertyId}`);

      thunkAPI.dispatch(fetchCompare());

      return propertyId;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error ||
        "Failed to add compare"
      );
    }
  }
);

export const removeCompare = createAsyncThunk(
  "compare/removeCompare",
  async (propertyId, thunkAPI) => {
    try {
      await api.delete(`/compare/${propertyId}`);

      thunkAPI.dispatch(fetchCompare());

      return propertyId;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error ||
        "Failed to remove compare"
      );
    }
  }
);


export const fetchCompareProperties = createAsyncThunk(
  "compare/fetchCompareProperties",
  async (ids, thunkAPI) => {
    try {

      const response = await api.post(
        "/compare/compare-properties",
        { ids }
      );

      return response.data.properties;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.error ||
        "Failed to fetch compare properties"
      );
    }
  }
);