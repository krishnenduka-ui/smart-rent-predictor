import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBookings,
  confirmBooking,
  cancelBooking,
} from "../redux/thunks/bookingThunks";

const AdminBookingsList = () => {
  const dispatch = useDispatch();

  const { bookings, loading } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const handleConfirm = async (bookingId) => {
    try {
      await dispatch(confirmBooking(bookingId)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await dispatch(cancelBooking(bookingId)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Booking Details
        </h1>
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Booking Details
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Property</th>
              <th className="p-3">Location</th>
              <th className="p-3">Price</th>
              <th className="p-3">Booking Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">
                    {booking.user?.username}
                  </td>

                  <td className="p-3">
                    {booking.user?.email}
                  </td>

                  <td className="p-3">
                    {booking.property?.title}
                  </td>

                  <td className="p-3">
                    {booking.property?.location}
                  </td>

                  <td className="p-3">
                    ₹{booking.property?.price}
                  </td>

                  <td className="p-3">
                    {new Date(
                      booking.createdAt
                    ).toLocaleDateString()}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    {booking.status === "Pending" && (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                        🟡 Pending
                      </span>
                    )}

                    {booking.status === "Confirmed" && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        🟢 Confirmed
                      </span>
                    )}

                    {booking.status === "Cancelled" && (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        🔴 Cancelled
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3">
                    {booking.status === "Pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleConfirm(booking._id)
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Confirm
                        </button>

                        <button
                          onClick={() =>
                            handleCancel(booking._id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No Actions
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center p-6 text-gray-500"
                >
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookingsList;