import express from "express";
import {toggleUserStatus, 
        getAllUsers
        } from "../controllers/adminUserController.js";

import {protect,authorize} from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/all-users",protect,authorize("admin"),getAllUsers);
router.put("/toggle-user/:id",protect,authorize("admin"),toggleUserStatus);

export default router;