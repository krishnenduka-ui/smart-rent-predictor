import express from 'express'
import { addProperty,
        getallProperties,
        getsingleProperty,
        updateProperty,
        deleteProperty,
        featuredProperties} 
        from '../controllers/propertyController.js'
import {protect,authorize} from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/',protect, authorize("admin"),addProperty)
router.get('/featured',featuredProperties)
router.get('/',getallProperties)
router.get('/:id',getsingleProperty)
router.put('/:id',protect, authorize("admin"),updateProperty)
router.delete('/:id',protect, authorize("admin"),deleteProperty)

export default router