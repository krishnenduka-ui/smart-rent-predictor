import { createSlice } from "@reduxjs/toolkit";
import {
  bookProperty,
  getMyBookings,
  getAllBookings,
  confirmBooking
} from "../thunks/bookingThunks";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // BOOK PROPERTY
      .addCase(bookProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookProperty.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(bookProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET MY BOOKINGS
      .addCase(getMyBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Get All Bookings
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })

      .addCase(getAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // CONFIRM BOOKING
      .addCase(confirmBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmBooking.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default bookingSlice.reducer;