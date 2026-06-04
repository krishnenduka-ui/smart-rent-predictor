import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProperty } from "../redux/thunks/propertyThunks";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const dispatch = useDispatch();
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

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const propertyData = new FormData();

    Object.keys(formData).forEach((key) => {
      propertyData.append(key, formData[key]);
    });

    propertyData.append("image", image);

    for (let i = 0; i < gallery.length; i++) {
      propertyData.append("gallery", gallery[i]);
    }

    dispatch(addProperty(propertyData));

    navigate("/adminDashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Add Property
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Property Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Luxury Villa"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Kochi"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="25000"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Area */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Area (sqft)
            </label>
            <input
              type="number"
              name="area"
              placeholder="1200"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Bedrooms
            </label>
            <input
              type="number"
              name="bedrooms"
              placeholder="3"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bathrooms */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              placeholder="2"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Property Type
            </label>
            <select
              name="propertyType"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
            </select>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Amenities
            </label>
            <input
              type="text"
              name="amenities"
              placeholder="WiFi, Parking, Pool"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Neighbourhoods */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Neighbourhoods
            </label>
            <input
              type="text"
              name="neighbourhoods"
              placeholder="Near Metro Station"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows="5"
              placeholder="Write property description..."
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Cover Image
            </label>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
            />
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Gallery Images
            </label>

            <input
              type="file"
              multiple
              onChange={(e) => setGallery(e.target.files)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
            />
          </div>

          {/* Featured */}
          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              onChange={handleChange}
              className="w-5 h-5"
            />

            <label className="text-gray-700 font-medium">
              Featured Property
            </label>
          </div>

          {/* Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;