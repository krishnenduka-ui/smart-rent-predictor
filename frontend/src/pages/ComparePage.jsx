import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchCompare,
  removeCompare,
  fetchCompareProperties,
} from "../redux/thunks/compareThunks";

const ComparePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    compareIds,
    compareProperties,
    loading,
    error,
  } = useSelector((state) => state.compare);

  // Loading saved compare list
  useEffect(() => {
    dispatch(fetchCompare());
  }, []);
  

  // Fetch compare properties

  useEffect(() => {
    if (compareIds.length >= 2) {
      dispatch(fetchCompareProperties(compareIds));
    }
  }, [dispatch, compareIds]);


  if (compareIds.length < 2) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-4 text-center">

        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          Compare Properties
        </h1>

        <p className="text-gray-500 text-lg">
          Select at least 2 properties to start comparison
        </p>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 py-10 px-4">

      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">

        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">
            Compare Properties
          </h1>

          <p className="text-gray-500 mt-1">
            Side-by-side property comparison
          </p>
        </div>
        <button
          onClick={() => navigate("/userDashboard")}
          className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Back
        </button>

      </div>
      

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-500 text-lg">
          {error}
        </div>
      )}

     
      {!loading && compareProperties.length > 0 && (
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          {compareProperties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition overflow-hidden"
            >

              {/* IMAGE */}
              <div className="relative">

                <img
                  src={
                    property.images?.[0] ||
                    property.image ||
                    "https://via.placeholder.com/600x400"
                  }
                  alt={property.title}
                  className="w-full h-72 object-cover"
                />

                
                <button
                  onClick={() =>
                    dispatch(removeCompare(property._id))
                  }
                  className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-800 transition"
                >
                  Remove
                </button>

              </div>

             
              <div className="p-6">

                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {property.title}
                </h2>

                <p className="text-gray-500 mb-4">
                  {property.location}
                </p>

                <p className="text-2xl font-extrabold text-emerald-600 mb-5">
                  ₹ {property.price}
                </p>

                
                <div className="space-y-3 text-sm">

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500 font-medium">
                      Area
                    </span>

                    <span className="text-gray-800 font-semibold">
                      {property.area}
                    </span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500 font-medium">
                      Bedrooms
                    </span>

                    <span className="text-gray-800 font-semibold">
                      {property.bedrooms}
                    </span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500 font-medium">
                      Bathrooms
                    </span>

                    <span className="text-gray-800 font-semibold">
                      {property.bathrooms}
                    </span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500 font-medium">
                      Property Type
                    </span>

                    <span className="text-gray-800 font-semibold">
                      {property.propertyType}
                    </span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500 font-medium">
                      Rating
                    </span>

                    <span className="text-gray-800 font-semibold">
                      {property.rating || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">
                      Popularity
                    </span>

                    <span className="text-gray-800 font-semibold">
                      {property.popularity || "N/A"}
                    </span>
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComparePage;