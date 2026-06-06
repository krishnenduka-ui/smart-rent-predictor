import express from "express";
import Property from "../models/propertyModel.js";
import { trainModel,
        predictRent,
      } from "../ml/rentModel.js";

const router = express.Router();

router.get("/train", async (req, res) => {

  try {

    const properties = await Property.find();

    if (!properties.length) {
      return res.status(400).json({
        success: false,
        message: "No properties found",
      });
    }

    await trainModel(properties);

    res.json({
      success: true,
      message: "Model trained successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

router.post("/predict", async (req, res) => {

  try {

    const prediction = predictRent(req.body);

    return res.json({success: true,predictedRent: prediction,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

export default router;