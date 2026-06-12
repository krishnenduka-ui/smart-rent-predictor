import { useState } from "react";
import api from "../api/axiosInstance";

const AMENITIES_KEYWORDS = [
  "wifi",
  "parking",
  "pool",
  "gym",
  "pet-friendly",
  "security",
];

const NEIGHBOURHOODS_KEYWORDS = [
  "school",
  "hospital",
  "shopping_mall",
  "temple",
  "hypermarket",
];

const RentEstimator = () => {
  const [sqft, setSqft] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [location, setLocation] = useState("");
  const [amenities, setAmenities] = useState("");
  const [neighbourhoods, setNeighbourhoods] = useState("");
  const [rating, setRating] = useState("");

  const [predictedRent, setPredictedRent] = useState(null);

  const [recognizedAmenities, setRecognizedAmenities] = useState([]);
  const [recognizedNeighbourhoods, setRecognizedNeighbourhoods] = useState([]);

  const parseKeywords = (text, keywords) => {
    return text
      .toLowerCase()
      .split(/,|and/)
      .map((item) => item.trim())
      .filter((item) => keywords.includes(item));
  };

  const handleAmenitiesChange = (e) => {
    const value = e.target.value;

    setAmenities(value);

    setRecognizedAmenities(
      parseKeywords(value, AMENITIES_KEYWORDS)
    );
  };

  const handleNeighbourhoodsChange = (e) => {
    const value = e.target.value;

    setNeighbourhoods(value);

    setRecognizedNeighbourhoods(
      parseKeywords(value, NEIGHBOURHOODS_KEYWORDS)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/rent/predict", {
        sqft: Number(sqft),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        amenities: recognizedAmenities.length,
        neighbourhoods: recognizedNeighbourhoods.length,
        rating: Number(rating),
        location,
      });

      setPredictedRent(res.data.predictedRent);
    } catch (error) {
      console.log(error);
      alert("Failed to estimate rent");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          AI Rent Estimator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Area in sqft"
            className="w-full border p-3 rounded"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Bedrooms"
            className="w-full border p-3 rounded"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Bathrooms"
            className="w-full border p-3 rounded"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            required
          />

          <select
            className="w-full border p-3 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option value="">Select Location</option>
            <option value="Kakkanad">Kakkanad</option>
            <option value="Edappally">Edappally</option>
            <option value="Palarivattom">Palarivattom</option>
            <option value="FortKochi">Fort Kochi</option>
            <option value="Vyttila">Vyttila</option>
            <option value="Kalamassery">Kalamassery</option>
          </select>

          <input
            type="text"
            placeholder="Amenities (wifi, parking, gym...)"
            className="w-full border p-3 rounded"
            value={amenities}
            onChange={handleAmenitiesChange}
          />

          <input
            type="text"
            placeholder="Nearby Places (school, hospital...)"
            className="w-full border p-3 rounded"
            value={neighbourhoods}
            onChange={handleNeighbourhoodsChange}
          />

          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            placeholder="Property Rating (0-5)"
            className="w-full border p-3 rounded"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded hover:bg-emerald-700"
          >
            Estimate Rent
          </button>
        </form>

        {predictedRent !== null && (
          <div className="mt-6 bg-green-100 p-4 rounded text-center">
            <p className="text-lg font-semibold">
              Estimated Monthly Rent
            </p>

            <p className="text-3xl font-bold text-green-700">
              ₹{predictedRent.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentEstimator;