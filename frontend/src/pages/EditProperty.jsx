import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getSingleProperty,
  updateProperty,
} from "../redux/thunks/propertyThunks";

import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditProperty = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleProperty, loading } = useSelector(
    (state) => state.properties
  );

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

  useEffect(() => {
    dispatch(getSingleProperty(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleProperty) {
      setFormData({
        title: singleProperty.title || "",
        description: singleProperty.description || "",
        price: singleProperty.price || "",
        area: singleProperty.area || "",
        location: singleProperty.location || "",
        bedrooms: singleProperty.bedrooms || "",
        bathrooms: singleProperty.bathrooms || "",
        amenities: singleProperty.amenities
          ? singleProperty.amenities.join(", ")
          : "",
        propertyType: singleProperty.propertyType || "",
        neighbourhoods: singleProperty.neighbourhoods
          ? singleProperty.neighbourhoods.join(", ")
          : "",
        featured: singleProperty.featured || false,
      });
    }
  }, [singleProperty]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const propertyData = new FormData();

    Object.keys(formData).forEach((key) => {
      propertyData.append(key, formData[key]);
    });

    if (image) {
      propertyData.append("image", image);
    }

    gallery.forEach((file) => {
      propertyData.append("gallery", file);
    });

    try {
    await dispatch(
      updateProperty({
        id,
        propertyData,
      })
    ).unwrap();

    toast.success("Property updated successfully!");

    setTimeout(() => {
      navigate("/adminDashboard");
    }, 1500);

  } catch (error) {
    toast.error(error || "Failed to update property");
  }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 py-10 px-4">

      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-100">

        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Edit Property
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Update property details
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            name="title"
            placeholder="Property Title"
            value={formData.title}
            onChange={handleChange}
            className="md:col-span-2 px-4 py-3 border border-gray-200 rounded-xl"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-200 rounded-xl"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-200 rounded-xl"
          />

          <input
            type="number"
            name="area"
            placeholder="Area"
            value={formData.area}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-200 rounded-xl"
          />

          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-200 rounded-xl"
          />

          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-200 rounded-xl"
          />

          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-200 rounded-xl"
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
            value={formData.amenities}
            onChange={handleChange}
            className="px-4 py-3 border border-gray-200 rounded-xl"
          />

          <input
            type="text"
            name="neighbourhoods"
            placeholder="Neighbourhood Info"
            value={formData.neighbourhoods}
            onChange={handleChange}
            className="md:col-span-2 px-4 py-3 border border-gray-200 rounded-xl"
          />

          <textarea
            name="description"
            rows="5"
            placeholder="Property description..."
            value={formData.description}
            onChange={handleChange}
            className="md:col-span-2 px-4 py-3 border border-gray-200 rounded-xl"
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Update Cover Image
            </label>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-gray-200 rounded-xl p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Update Gallery Images
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
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 accent-gray-800"
            />

            <label className="text-gray-700 font-medium">
              Featured Property
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Updating..." : "Update Property"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditProperty;