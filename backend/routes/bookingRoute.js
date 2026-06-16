import express from "express";
import { bookProperty,
        getMyBookings,
        getAllBookings,
        confirmBooking,
        cancelBooking } 
        from "../controllers/bookingController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/allbookings",protect,authorize("admin"),getAllBookings)
router.put("/confirm/:id",protect,authorize("admin"),confirmBooking)
router.put("/cancel/:id",protect,authorize("admin"),cancelBooking) 
router.get("/mybookings",protect,authorize("user"),getMyBookings)
router.post("/:propertyId", protect, authorize("user"), bookProperty);

export default router;