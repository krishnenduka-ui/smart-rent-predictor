import User from "../models/userModel.js";
import Property from "../models/propertyModel.js";
import Booking from "../models/bookingModel.js";

export const getDashboardSummary = async (req,res,next) => {
  try {
    const totalProperties = await Property.countDocuments();

    const totalUsers = await User.countDocuments({role:"user"});

    const totalBookings = await Booking.countDocuments();


    const activeUsers = await User.countDocuments({role:"user",
      isDisabled: false,
      
    });

    const disabledUsers = await User.countDocuments({role:"user",
      isDisabled: true,
    });

    const confirmedBookings = await Booking.find({
      status: "Confirmed",
    }).populate("property");

    const bookedProperties = confirmedBookings.length;

    const availableProperties =totalProperties - bookedProperties;
    

    
    res.status(200).json({
      success: true,
      summary: {
        totalProperties,
        totalUsers,
        totalBookings,
        availableProperties,
        bookedProperties,
        activeUsers,
        disabledUsers,
        
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};