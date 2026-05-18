import mongoose from "mongoose"

const propertySchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    priceofproperty:{
        type:String,
        required:true
    },
    propertyarea :{
        type:String,
        required:true
    },
    bedrooms:{
        type:Number,
        required:true
    },
    bathrooms:{
        type:Number,
        required:true

    },
    amenities:{
        type:String,
        required:true
    }

})

const propertyModel = mongoose.model("properties",propertySchema)

export default propertyModel