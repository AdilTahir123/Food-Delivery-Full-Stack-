import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";

// Add food
export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category || !req.file) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "food-delivery",
      }
    );

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: result.secure_url,
    });

    await food.save();

    res.json({
      success: true,
      message: "Food added successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error adding food",
    });
  }
};

// List food
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error fetching food",
    });
  }
};

// Remove food
export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({
        success: false,
        message: "Food not found",
      });
    }

    // Delete food document
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({
      success: true,
      message: "Food removed successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error removing food",
    });
  }
};