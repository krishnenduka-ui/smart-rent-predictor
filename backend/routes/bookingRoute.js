import express from "express";
import { bookProperty,
        getMyBookings,
        getAllBookings,
        confirmBooking } 
        from "../controllers/bookingController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/allbookings",protect,authorize("admin"),getAllBookings)
router.put("/confirm/:id",protect,authorize("admin"),confirmBooking)
router.get("/mybookings",protect,authorize("user"),getMyBookings)
router.post("/:propertyId", protect, authorize("user"), bookProperty);

export default router;