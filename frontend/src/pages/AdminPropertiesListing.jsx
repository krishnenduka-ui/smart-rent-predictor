import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchProperties,
  deleteProperty,
} from "../redux/thunks/propertyThunks";

const AdminPropertiesListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { properties, loading } = useSelector(
    (state) => state.properties
  );

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchProperties());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteProperty(id));
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">


      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Welcome Admin {user?.username}
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your property listings
          </p>
        </div>

        
      </div>


      {loading && (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* GRID */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pb-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

        {properties?.map((property) => (
          <div
            key={property._id}
            onClick={() => navigate(`/property/${property._id}`)}
            className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition overflow-hidden group cursor-pointer"
          >

            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>


            <div className="p-6">

              <h3 className="text-xl font-bold text-gray-800">
                {property.title}
              </h3>

              <p className="text-gray-500 mt-1">
                {property.location}
              </p>

              <p className="text-2xl font-extrabold text-emerald-600 mt-3">
                ₹ {property.price}
              </p>


              <div className="flex gap-3 mt-5">

                <Link
                  to={`/editProperty/${property._id}`}
                  className="flex-1"
                >
                  <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-xl font-semibold transition">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(property._id);
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-semibold transition"
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>


      {!loading && properties?.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No properties found
        </div>
      )}
    </div>
  );
};

export default AdminPropertiesListing;