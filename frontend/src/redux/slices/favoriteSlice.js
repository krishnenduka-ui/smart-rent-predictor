import { createSlice } from "@reduxjs/toolkit";

import {
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "../thunks/favoriteThunks";

const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoriteSlice = createSlice({
  name: "favorites",

  initialState,

  reducers: {
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH FAVORITES

      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchFavorites.fulfilled,
        (state, action) => {
          state.loading = false;
          state.favorites = action.payload;
        }
      )

      .addCase(
        fetchFavorites.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // ADD FAVORITE

      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
      })

      .addCase(addFavorite.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(
        addFavorite.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // REMOVE FAVORITE

      .addCase(removeFavorite.pending, (state) => {
        state.loading = true;
      })

      .addCase(removeFavorite.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(
        removeFavorite.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearFavorites } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;