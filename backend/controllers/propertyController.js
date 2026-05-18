import express from 'express'
import propertyModel from '../models/propertyModel.js'


//Add property
export const createProperty = async (req,res) =>{
    const {title,priceofproperty,propertyarea,bedrooms,bathrooms,amenities} = req.body

    if(!title || !priceofproperty || !propertyarea || !bedrooms || !bathrooms || !amenities){
        return res.json({error:"Some fields are empty"})
    }

    const property = await propertyModel.create({
        title,
        priceofproperty,
        propertyarea,
        bedrooms,
        bathrooms,
        amenities
    })

    return res.json({message:"Property created",property})

}


//Get all properties
export const getallProperties = async (req,res) =>{
    const properties = await propertyModel.find()
    return res.json(properties)

}

//Get single property
export const getsingleProperty = async (req,res) => {
    const id = req.params.id
    const property = await propertyModel.findById(id)
    return res.json(property)

}

//Update property
export const updateProperty = async (req,res) =>{
   const id = req.params.id
   const updatedProperty = await propertyModel.findByIdAndUpdate(id,req.body)
   return res.json(updatedProperty)
}

//Delete property
export const deleteProperty = async (req,res) =>{
    const id = req.params.id
    const confirmation = await propertyModel.findByIdAndDelete(id)
    if(!confirmation){
        return res.json({error:"No properties found"})
    }
    return res.json({message:"Property deleted",confirmation})
    
}
