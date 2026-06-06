import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

// ✅ GET FAVORITES

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/favorites");

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error ||
          "Failed to fetch favorites"
      );
    }
  }
);

// ✅ ADD TO FAVORITES

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (propertyId, thunkAPI) => {
    try {
      await api.post(`/favorites/${propertyId}`);

      thunkAPI.dispatch(fetchFavorites());

      return propertyId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error ||
          "Failed to add favorite"
      );
    }
  }
);

// ✅ REMOVE FAVORITE

export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async (propertyId, thunkAPI) => {
    try {
      await api.delete(`/favorites/${propertyId}`);

      thunkAPI.dispatch(fetchFavorites());

      return propertyId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error ||
          "Failed to remove favorite"
      );
    }
  }
);