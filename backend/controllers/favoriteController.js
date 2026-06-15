import userModel from '../models/userModel.js'
import propertyModel from '../models/propertyModel.js'


//Add property to favorites
export const addToFavorites = async (req,res,next) => {
    try{

        const userId = req.user.id
        const propertyId = req.params.propertyId

        const property = await propertyModel.findById(propertyId)
        if(!property){
            return res.json({error:"No property found"})
        }
         // Get logged-in user
        const user = await userModel.findById(userId)

        if(!user){
            return res.json({error:"User not found"})
        }

        if(user.favorites.includes(propertyId)){
            return res.json({message:"Property already added in favorites"})
        }
        user.favorites.push(propertyId)
        await user.save()
        return res.json({message:"Property added to favorites",favorites:user.favorites})
        
    }catch(error){
        next(error)
    }

}


//Remove from favorites
export const removeFromFavorites = async (req,res,next)=>{
    try {

        const userId = req.user.id
        const propertyId = req.params.propertyId

        const user = await userModel.findById(userId)

        user.favorites = user.favorites.filter(
            (fav)=> fav.toString() !== propertyId
        )

        await user.save()

        return res.json({
            message:"Property removed from favorites",
            favorites:user.favorites
        })

    } catch (error) {
        next(error)
    }
}



// Get all favorite properties
export const getFavorites = async (req,res,next)=>{
    try {

        const userId = req.user.id

        const user = await userModel
        .findById(userId)
        .populate("favorites")

        return res.json(user.favorites)

    } catch (error) {
        next(error)
    }
}