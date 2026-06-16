import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";



const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/property/${id}`);
        setProperty(res.data);

      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg">Loading...</p>
    );
  }

  if (!property) {
    return (
      <p className="text-center mt-10 text-red-500">
        Property not found
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-700 text-white px-4 py-2 rounded"
      >
        ← Back
      </button>

      {/* IMAGE */}
      {property.gallery?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Gallery</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {property.gallery.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`gallery-${index}`}
                className="w-full h-100 object-cover rounded-lg hover:scale-105 transition"
              />
            ))}
          </div>
        </div>
      )}
      {/* MAIN DETAILS */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold">
          {property.title}
        </h1>

        <p className="text-gray-500 mt-2">
          {property.location}
        </p>

        <p className="text-blue-600 font-bold text-2xl mt-2">
          ₹{property.price}
        </p>

        {/* INFO GRID */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-gray-700">
          <p>Bedrooms: {property.bedrooms}</p>
          <p>Bathrooms: {property.bathrooms}</p>
          <p>Type: {property.propertyType}</p>
          <p>Area: {property.area}</p>
        </div>

        {/* AMENITIES */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">
            Amenities
          </h3>

          <div className="flex gap-2 flex-wrap">
            {property.amenities?.map((a, i) => (
              <span
                key={i}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Neighbourhoods */}

      <div className="mt-6">
        <h3 className="font-semibold mb-3 text-lg">
          Nearby Neighbourhoods
        </h3>

        <div className="flex flex-wrap gap-2">
          {property.neighbourhoods?.map((place, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
            >
              📍 {place}
            </span>
          ))}
        </div>
      </div>

      {/* LOCATION + MAP */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-2">
          Location
        </h2>

        <p className="text-gray-500 mb-4">
          {property.location}
        </p>

        {/* GOOGLE MAP */}
        {property.coordinates?.lat &&
          property.coordinates?.lng ? (

          <MapContainer
            center={[
              property.coordinates.lat,
              property.coordinates.lng,
            ]}
            zoom={15}
            scrollWheelZoom={true}
            style={{
              height: "400px",
              width: "100%",
              borderRadius: "12px",
            }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={[
                property.coordinates.lat,
                property.coordinates.lng,
              ]}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">
                    {property.title}
                  </h3>

                  <p>{property.location}</p>

                  <p>₹{property.price}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>

        ) : (
          <p className="text-gray-500">
            Map location not available
          </p>
        )}
      </div>

    </div>
  );
};

export default PropertyDetails;