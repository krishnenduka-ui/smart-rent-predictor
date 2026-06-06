import userModel from "../models/userModel.js";
import propertyModel from "../models/propertyModel.js";



// Add to compare

export const addToCompare = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const propertyId = req.params.propertyId;

    const property = await propertyModel.findById(propertyId);

    if (!property) {
      return res.json({
        error: "Property not found",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        error: "User not found",
      });
    }

    // already added
    if (user.compareList.includes(propertyId)) {
      return res.json({
        message: "Already added to compare",
      });
    }

    // max 4
    if (user.compareList.length >= 4) {
      return res.json({
        error: "Only 4 properties allowed",
      });
    }

    user.compareList.push(propertyId);

    await user.save();

    return res.json({
      message: "Added to compare",
      compareList: user.compareList,
    });

  } catch (error) {
    next(error);
  }
};


//remove
export const removeFromCompare = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const propertyId = req.params.propertyId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        error: "User not found",
      });
    }

    user.compareList = user.compareList.filter(
      (id) => id.toString() !== propertyId
    );

    await user.save();

    return res.json({
      message: "Removed from compare",
      compareList: user.compareList,
    });

  } catch (error) {
    next(error);
  }
};


//get compare list
export const getCompareList = async (req, res, next) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .populate("compareList");

    if (!user) {
      return res.json({
        error: "User not found",
      });
    }

    return res.json(user.compareList);

  } catch (error) {
    next(error);
  }
};

//compare properties
export const compareProperties = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!ids || ids.length < 2) {
      return res.json({
        error: "Select at least 2 properties",
      });
    }

    const properties = await propertyModel.find({
      _id: { $in: ids },
    });

    if (properties.length < 2) {
      return res.json({
        error: "Properties not found",
      });
    }

    return res.json({
      message: "Comparison data",
      properties,
    });

  } catch (error) {
    next(error);
  }
};