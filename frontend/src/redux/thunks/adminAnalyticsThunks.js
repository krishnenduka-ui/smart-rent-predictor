import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

export const fetchDashboardSummary = createAsyncThunk(
  "analytics/fetchDashboardSummary",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/adminAnalytics/dashboard-summary");

      return res.data.summary;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch analytics"
      );
    }
  }
);