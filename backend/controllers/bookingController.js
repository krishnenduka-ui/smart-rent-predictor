import bookingModel from "../models/bookingModel.js";
import propertyModel from "../models/propertyModel.js";


//Book a property
export const bookProperty = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const propertyId = req.params.propertyId;

    const property = await propertyModel.findById(propertyId);

    if (!property) {
      return res.json({
        error: "Property not found",
      });
    }

    if (property.isBooked) {
      return res.json({
        error: "Property already booked",
      });
    }

    const booking = await bookingModel.create({
      user: userId,
      property: propertyId,
      status:"Pending"
    });

    property.isBooked = true;
    property.bookedBy = userId;
    property.bookingStatus ="Pending"

    await property.save();

    return res.json({
      message: "Property booked successfully",
      booking,
    });
  } catch (error) {
    next(error);
  }
};

//Get booked properties in user list
export const getMyBookings = async (req,res,next) =>{
  try {
    const bookings = await bookingModel.find({user:req.user.id})
    .populate("property")

    return res.json(bookings)
    
  } catch (error) {
    next(error)
  }
}


//Get all booked properties in admin list

export const getAllBookings = async (req,res,next)=>{
  try {
    const bookings = await bookingModel.find()
                    .populate("user","username email")
                    .populate("property","title location price image")

    return res.json(bookings)
    
  } catch (error) {
    next(error)
    
  }
}


//Booking confirmation

export const confirmBooking = async (req,res,next) =>{
  try {
    const booking = await bookingModel.findById(req.params.id)

    booking.status = "Confirmed";
    await booking.save();

    const property = await propertyModel.findById(
      booking.property
    );

    property.bookingStatus = "Confirmed";
    await property.save();

    res.json({
      message: "Booking confirmed",
    });

  } catch (error) {
    next(error);
  }
};