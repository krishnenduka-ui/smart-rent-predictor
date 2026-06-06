import { set } from 'mongoose';
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
            !bedrooms ||
            !bathrooms ||
            !amenities ||
            !propertyType ||
            !neighbourhoods) {

            return res.status(400).json({ error: "Some fields are empty" });
        }


        //image validation
        if (!req.files || !req.files.image) {
            return res.status(400).json({ error: "Main image is required" });
        }

        const mainImage = req.files.image[0];
        const galleryImages = req.files.gallery || [];

        const galleryData = galleryImages.map((file) => ({
            url: file.path,
            public_id: file.filename,
        }));

        const property = await propertyModel.create({
            title,
            description,
            price,
            area,
            location,
            coordinates: coordinates || { lat: 0, lng: 0 },
            bedrooms,
            bathrooms,
            amenities: amenities.split(","),
            rating: 0,
            popularity: 0,
            propertyType,
            neighbourhoods: neighbourhoods.split(","),
            featured: featured || false,
            image: mainImage.path,
            imagePublicId: mainImage.filename,
            gallery: galleryData
        })

        return res.status(201).json({ message: "Property added", property })

    } catch (error) {
        next(error)
    }
}


//Get all properties
export const getAllProperties = async (req, res, next) => {
    try {
        const { location, bedrooms, amenities, propertyType, minPrice, maxPrice, sort } = req.query
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
            if (bedrooms === "3+") {
                query.bedrooms = { $gte: 3 }
            } else {
                query.bedrooms = Number(bedrooms)
            }
        }



        //Filter by property type 
        if (propertyType) {
            query.propertyType = new RegExp(propertyType, "i")
        }

        //Filter by amenities
        if (amenities) {
            const arr = amenities.split(",").map(a => a.trim().toLowerCase());

            query.amenities = {
                $all: arr.map(a => new RegExp(`^${a}$`, "i"))
            };
        }

        //Sort 
        const sortMap = {
            price_asc: { price: 1 },
            price_desc: { price: -1 },
            rating_desc: { rating: -1 },
            popularity_desc: { popularity: -1 },
        };

        const sortOption = sortMap[sort] || { createdAt: -1 };


        const properties = await propertyModel.find(query).sort(sortOption)
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
    const id = req.params.id;

    const updatedData = {
      ...req.body,
    };

    if (req.body.amenities) {
      updatedData.amenities = req.body.amenities
        .split(",")
        .map((a) => a.trim());
    }

    if (req.body.neighbourhoods) {
      updatedData.neighbourhoods = req.body.neighbourhoods
        .split(",")
        .map((n) => n.trim());
    }

    // Update cover image
    if (req.files?.image) {
      updatedData.image = req.files.image[0].path;
      updatedData.imagePublicId = req.files.image[0].filename;
    }

    // Update gallery
    if (req.files?.gallery) {
      updatedData.gallery = req.files.gallery.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    const updatedProperty = await propertyModel.findByIdAndUpdate(
      id,
      updatedData,
      { returnDocument: "after" }
    );

    return res.json(updatedProperty);

  } catch (error) {
    next(error);
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
