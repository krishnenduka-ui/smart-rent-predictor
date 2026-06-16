import { createSlice } from "@reduxjs/toolkit";
import {
  bookProperty,
  getMyBookings,
  getAllBookings,
  confirmBooking,
  cancelBooking
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
      })

      //Cancel Booking

      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
      })

      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;

        const updatedBooking = action.payload.booking;

        state.bookings = state.bookings.map((booking) =>
          booking._id === updatedBooking._id
            ? updatedBooking
            : booking
        );
      })

      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default bookingSlice.reducer;