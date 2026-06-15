import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings,confirmBooking } from "../redux/thunks/bookingThunks";

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

    alert("Booking confirmed successfully");

    dispatch(getAllBookings());
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Booking Details
            </h1>

            <table className="w-full bg-white shadow rounded-xl">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3">User</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Property</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Date</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
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
                           <td className="p-3">
  {booking.status === "Pending" ? (
    <span className="text-yellow-600 font-semibold">
      Booked - Waiting for Confirmation
    </span>
  ) : (
    <span className="text-green-600 font-semibold">
      Confirmed
    </span>
  )}
</td>

                            <td className="p-3">
                                {booking.status === "Pending" && (
                                    <button
                                        onClick={() => handleConfirm(booking._id)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                    >
                                        Confirm
                                    </button>
                                )}

                                {booking.status === "Confirmed" && (
                                    <span className="text-green-600 font-semibold">
                                        Confirmed
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminBookingsList;