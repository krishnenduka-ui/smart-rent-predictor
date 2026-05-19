import express from 'express'
import propertyModel from '../models/propertyModel.js'


//Add property
export const addProperty = async (req, res, next) => {
    try {
        const { title,
            description,
            price,
            area,
            location,
            coordinates,
            bedrooms,
            bathrooms,
            amenities,
            rating,
            popularity,
            propertyType,
            neighbourhoods,
            featured } = req.body

        if (!title ||
            !description ||
            !price ||
            !area ||
            !location ||
            !coordinates ||
            !bedrooms ||
            !bathrooms ||
            !amenities ||
            !rating ||
            !popularity ||
            !propertyType ||
            !neighbourhoods ||
            featured === undefined ) {

            return res.json({ error: "Some fields are empty" })
        }

        const property = await propertyModel.create({
            title,
            description,
            price,
            area,
            location,
            coordinates,
            bedrooms,
            bathrooms,
            amenities: amenities.split(","),
            rating,
            popularity,
            propertyType,
            neighbourhoods: neighbourhoods.split(","),
            featured 
        })

        return res.json({ message: "Property added", property })

    } catch (error) {
        next(error)
    }
}


//Get all properties
export const getallProperties = async (req, res, next) => {
    try {
        const { location, bedrooms, bathrooms, amenities, propertyType, minPrice, maxPrice, sort } = req.query
        let query = {}

        //Search by location
        if (location) {
            query.location = new RegExp(location, "i")
        }

        //Search by price range 
        if (minPrice || maxPrice) {
            query.price = {}

            if (minPrice) {
                query.price.$gte = Number(minPrice)
            }

            if (maxPrice) {
                query.price.$lte = Number(maxPrice)
            }

        }

        //Filter by bedrooms
        if (bedrooms) {
            query.bedrooms = Number(bedrooms)
        }

        //Filter by bathrooms 
        if (bathrooms) {
            query.bathrooms = Number(bathrooms)
        }

        //Filter by property type 
        if (propertyType) {
            query.propertyType = new RegExp(propertyType, "i")
        }

        //Filter by amenities
        if (amenities) {
            query.amenities = { $in: amenities.split(",") }
        }


        const properties = await propertyModel.find(query).sort(sort)
        return res.json(properties)
    }
    catch (error) {
        next(error)
    }
}





//Get single property
export const getsingleProperty = async (req, res, next) => {
    try {
        const id = req.params.id
        const property = await propertyModel.findById(id)
        return res.json(property)
    } catch (error) {
        next(error)
    }

}

//Update property
export const updateProperty = async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedProperty = await propertyModel.findByIdAndUpdate(id, req.body,{ returnDocument: "after"})
        return res.json(updatedProperty)
    } catch (error) {
        next(error)
    }
}

//Delete property
export const deleteProperty = async (req, res, next) => {
    try {
        const id = req.params.id
        const confirmation = await propertyModel.findByIdAndDelete(id)
        if (!confirmation) {
            return res.json({ error: "No properties found" })
        }
        return res.json({ message: "Property deleted", confirmation })
    } catch (error) {
        next(error)
    }

}

//Featured properties
export const featuredProperties = async (req, res, next) => {
    try {
        const properties = await propertyModel.find({ featured: true })
        res.json(properties)
    } catch (error) {
        next(error)
    }
}
