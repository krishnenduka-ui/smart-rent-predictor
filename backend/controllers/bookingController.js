import bookingModel from "../models/bookingModel.js";
import propertyModel from "../models/propertyModel.js";

// Book a Property
export const bookProperty = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const propertyId = req.params.propertyId;

    const property = await propertyModel.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    if (property.isBooked) {
      return res.status(400).json({
        message: "Property already booked",
      });
    }

    const booking = await bookingModel.create({
      user: userId,
      property: propertyId,
      status: "Pending",
    });

    property.isBooked = true;
    property.bookedBy = userId;
    property.bookingStatus = "Pending";

    await property.save();

    return res.status(201).json({
      message: "Property booked successfully",
      booking,
    });

  } catch (error) {
    next(error);
  }
};

// Get My Bookings
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await bookingModel
      .find({ user: req.user.id })
      .populate("property");

    return res.status(200).json(bookings);

  } catch (error) {
    next(error);
  }
};

// Get All Bookings (Admin)
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingModel
      .find()
      .populate("user", "username email")
      .populate("property", "title location price image");

    return res.status(200).json(bookings);

  } catch (error) {
    next(error);
  }
};

// Confirm Booking
export const confirmBooking = async (req, res, next) => {
  try {
    const booking = await bookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = "Confirmed";

    await booking.save();

    const property = await propertyModel.findById(
      booking.property
    );

    if (property) {
      property.bookingStatus = "Confirmed";
      await property.save();
    }

    return res.status(200).json({
      message: "Booking confirmed successfully",
      booking,
    });

  } catch (error) {
    next(error);
  }
};

// Cancel Booking
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await bookingModel.findById(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = "Cancelled";

    await booking.save();

    const property = await propertyModel.findById(
      booking.property
    );

    if (property) {
      property.isBooked = false;
      property.bookedBy = null;
      property.bookingStatus = "Cancelled";

      await property.save();
    }

    return res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });

  } catch (error) {
    next(error);
  }
};