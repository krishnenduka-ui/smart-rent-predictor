import express from 'express'
import {addToCompare,
        removeFromCompare,
        getCompareList, 
        compareProperties } from "../controllers/compareController.js"
import { protect,authorize } from "../middlewares/authMiddleware.js"


const router = express.Router()

router.post('/compare-properties',protect,authorize("user"),compareProperties)
router.get('/',protect,authorize("user"),getCompareList)
router.post('/:propertyId',protect,authorize("user"),addToCompare)
router.delete('/:propertyId',protect,authorize("user"),removeFromCompare)


export default router