import express from 'express'
import { addProperty,
        getAllProperties,
        getsingleProperty,
        updateProperty,
        deleteProperty,
        featuredProperties} 
        from '../controllers/propertyController.js'
import {protect,authorize} from '../middlewares/authMiddleware.js'
import upload from '../middlewares/upload.js'

const router = express.Router()

router.post('/',protect, authorize("admin"),upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 10 }
  ]),addProperty)
router.get('/featured',featuredProperties)
router.get('/',getAllProperties)
router.get('/:id',getsingleProperty)

router.put('/:id',protect, authorize("admin"),upload.fields([
    { name: "image", maxCount: 1 },
    { name: "gallery", maxCount: 10 }
  ]) ,updateProperty)
  
router.delete('/:id',protect, authorize("admin"),deleteProperty)

export default router