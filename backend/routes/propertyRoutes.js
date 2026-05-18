import express from 'express'
import { createProperty,
        getallProperties,
        getsingleProperty,
        updateProperty,
        deleteProperty } 
        from '../controllers/propertyController.js'


const router = express.Router()

router.post('/',createProperty)
router.get('/',getallProperties)
router.get('/:id',getsingleProperty)
router.put('/:id',updateProperty)
router.delete('/:id',deleteProperty)

export default router