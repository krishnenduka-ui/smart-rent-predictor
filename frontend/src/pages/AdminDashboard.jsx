import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { fetchProperties, deleteProperty } from "../redux/thunks/propertyThunks";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { properties, loading } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProperty(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <div className="flex gap-3">
          <Link to="/addProperty">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">
              + Add Property
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-600 text-lg">Loading...</p>
      )}

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties?.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            {/* Image */}
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {property.title}
              </h3>

              <p className="text-gray-500 mb-1">{property.location}</p>

              <p className="text-blue-600 font-bold text-lg mb-4">
                ₹ {property.price}
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                <Link to={`/editProperty/${property._id}`} className="flex-1">
                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(property._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {!loading && properties?.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No properties found
        </p>
      )}
    </div>
  );
};

export default AdminDashboard;