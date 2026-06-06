import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {getSingleProperty,
      updateProperty,
      } from "../redux/thunks/propertyThunks";

import { useParams, useNavigate } from "react-router-dom";

const EditProperty = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleProperty, loading } = useSelector(
    (state) => state.properties
  );

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
  });

  useEffect(() => {
    dispatch(getSingleProperty(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProperty) {
      setFormData(singleProperty);
    }
  }, [singleProperty]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateProperty({
        id,
        propertyData: formData,
      })
    );

    navigate("/adminDashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center px-4">

      
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-100">

        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Edit Property
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Update property details below
        </p>

        
        <form onSubmit={handleSubmit} className="space-y-5">

          
          <input
            type="text"
            name="title"
            placeholder="Property Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          
          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              value={formData.bedrooms || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
            />

            <input
              type="number"
              name="bathrooms"
              placeholder="Bathrooms"
              value={formData.bathrooms || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          
          <input
            type="text"
            name="propertyType"
            placeholder="Property Type"
            value={formData.propertyType || ""}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Updating..." : "Update Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;