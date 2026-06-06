import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const AddProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    area: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    amenities: "",
    propertyType: "",
    neighbourhoods: "",
    featured: false,
  });

  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({...formData,[name]: type === "checkbox" ? checked : value,});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const propertyData = new FormData();

    Object.keys(formData).forEach((key) => {
      propertyData.append(key, formData[key]);
    });

    if (image) propertyData.append("image", image);

    gallery.forEach((file) => {
      propertyData.append("gallery", file);
    });

    try {
      await api.post("/property", propertyData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/adminDashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 py-10 px-4">

      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-100">

        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Add New Property
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Fill in the details below to list a property
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          
          <input
            type="text"
            name="title"
            placeholder="Property Title"
            onChange={handleChange}
            className="md:col-span-2 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500"
          />

          
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500"
          />

          
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500"
          />

          
          <input
            type="number"
            name="area"
            placeholder="Area (sqft)"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500"
          />

          
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500"
          />

          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500"
          />

        
          <select
            name="propertyType"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500"
          >
            <option value="">Select Type</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
          </select>

          
          <input
            type="text"
            name="amenities"
            placeholder="WiFi, Parking, Pool"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500"
          />

          
          <input
            type="text"
            name="neighbourhoods"
            placeholder="Neighbourhood Info"
            onChange={handleChange}
            className="md:col-span-2 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500"
          />

         
          <textarea
            name="description"
            rows="5"
            placeholder="Property description..."
            onChange={handleChange}
            className="md:col-span-2 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500"
          />

          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Image
            </label>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-gray-200 rounded-xl p-2"
            />
          </div>

         
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gallery Images
            </label>

            <input
              type="file"
              multiple
              onChange={(e) => setGallery([...e.target.files])}
              className="w-full border border-gray-200 rounded-xl p-2"
            />
          </div>

          
          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              onChange={handleChange}
              className="w-5 h-5 accent-gray-800"
            />
            <label className="text-gray-700 font-medium">
              Featured Property
            </label>
          </div>

          
          <button
            type="submit"
            className="md:col-span-2 w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Add Property
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProperty;