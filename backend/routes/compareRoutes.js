import { compareProperties } from "../controllers/compareController.js"
import express from 'express'
import { protect,authorize } from "../middlewares/authMiddleware.js"
const router = express.Router()

router.post('/',protect,authorize("user"),compareProperties)

export default router