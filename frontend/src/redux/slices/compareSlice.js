import { createSlice } from "@reduxjs/toolkit";
import { fetchCompare,
        addCompare,
        removeCompare,
        fetchCompareProperties } from "../thunks/compareThunks";

const initialState = {
 compareIds : [],
  compareProperties: [],
  loading: false,
  error: null,
};

const compareSlice = createSlice({
  name: "compare",
  initialState,

  reducers: {
    clearCompare: (state) => {
      state.compareIds = [];
      state.compareProperties = [];
    },
  },

  extraReducers: (builder) => {
    builder

      //Fetch compare
      .addCase(fetchCompare.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCompare.fulfilled, (state, action) => {
        state.loading = false;

        state.compareIds = action.payload.map(
          (property) => property._id
        );
      })

      .addCase(fetchCompare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add compare
      .addCase(addCompare.pending, (state) => {
        state.loading = true;
      })

      .addCase(addCompare.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(addCompare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove compare
      .addCase(removeCompare.pending, (state) => {
        state.loading = true;
      })

      .addCase(removeCompare.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(removeCompare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch compare properties
      .addCase(fetchCompareProperties.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchCompareProperties.fulfilled,
        (state, action) => {
          state.loading = false;
          state.compareProperties = action.payload;
        }
      )

      .addCase(
        fetchCompareProperties.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearCompare } = compareSlice.actions;

export default compareSlice.reducer;