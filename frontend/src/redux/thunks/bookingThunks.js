// bookingThunks.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

export const bookProperty = createAsyncThunk(
  "booking/bookProperty",
  async (propertyId, thunkAPI) => {
    try {
      const res = await api.post(`/booking/${propertyId}`);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message
      );
    }
  }
);


export const getMyBookings = createAsyncThunk(
  "booking/getMyBookings",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/booking/mybookings");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getAllBookings = createAsyncThunk(
  "booking/getAllBookings",
  async(_,thunkAPI)=>{
    try {
      const res = await api.get("/booking/allbookings")
      return res.data
      
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message)
      
    }
  }
)


export const confirmBooking = createAsyncThunk(
  "booking/confirmBooking",
  async (bookingId, thunkAPI) => {
    try {
      const res = await api.put(
        `/booking/confirm/${bookingId}`
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);