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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        My Bookings
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <img
                src={booking.property.image}
                alt={booking.property.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold">
                  {booking.property.title}
                </h2>

                <p className="text-gray-500">
                  {booking.property.location}
                </p>

                <p className="text-emerald-600 font-bold mt-2">
                  ₹ {booking.property.price}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Booked On:
                  {" "}
                  {new Date(
                    booking.createdAt
                  ).toLocaleDateString()}
                </p>
                <p className="mt-2">
                  Status:
                  {booking.status === "Pending" ? (
                    <span className="ml-2 text-yellow-600 font-semibold">
                      Waiting for Confirmation
                    </span>
                  ) : (
                    <span className="ml-2 text-green-600 font-semibold">
                      Confirmed
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MyBookings;