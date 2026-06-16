import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBookings } from "../redux/thunks/bookingThunks";

const MyBookings = () => {
  const dispatch = useDispatch();

  const { bookings, loading } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">
          My Bookings
        </h1>

        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <p className="text-gray-500">
            No bookings found
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={booking.property?.image}
                alt={booking.property?.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold">
                  {booking.property?.title}
                </h2>

                <p className="text-gray-500 mt-1">
                  {booking.property?.location}
                </p>

                <p className="text-emerald-600 font-bold mt-2">
                  ₹ {booking.property?.price}
                </p>

                <p className="text-sm text-gray-500 mt-3">
                  Booked On:{" "}
                  {new Date(
                    booking.createdAt
                  ).toLocaleDateString()}
                </p>

                <div className="mt-3">
                  <span className="font-medium">
                    Status:
                  </span>

                  {booking.status === "Pending" && (
                    <span className="ml-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                      🟡 Waiting for Confirmation
                    </span>
                  )}

                  {booking.status === "Confirmed" && (
                    <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      🟢 Confirmed
                    </span>
                  )}

                  {booking.status === "Cancelled" && (
                    <span className="ml-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      🔴 Cancelled
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MyBookings;