import express from "express"
import { addToFavorites, 
        removeFromFavorites,
        getFavorites } 
        from "../controllers/favoriteController.js"
import { protect } from "../middlewares/authMiddleware.js"


const router = express.Router()

router.post('/:propertyId',protect, addToFavorites)
router.delete('/:propertyId',protect,removeFromFavorites)
router.get('/',protect,getFavorites)

export default router


