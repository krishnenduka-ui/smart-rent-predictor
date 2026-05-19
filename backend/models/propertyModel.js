import mongoose from "mongoose"

const propertySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },

    coordinates: {
        lat: Number,
        lng: Number
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true

    },
    amenities: {
        type: [String],
        required: true,
        default: []
    },
    rating: {
        type: Number,
        default: 0
    },

    popularity: {
        type: Number,
        default: 0
    },
    propertyType: {
        type: String,
        enum: ["Apartment", "Villa", "Studio", "House"]
    },
    neighbourhoods: {
        type: [String],
        default: [],
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }

})

const propertyModel = mongoose.model("properties", propertySchema)

export default propertyModel