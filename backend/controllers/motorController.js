const MotorData = require("../models/MotorData");
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const PYTHON_SERVER_URL = process.env.PYTHON_SERVER;

//create motor data
const createMotorData = async (req, res) => {
  try {
    const { voltage, current, temperature, vibration, motorNumber } = req.body;

    // Validate input data
    if (!voltage || !current || !temperature || !vibration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const predictionResponse = await axios.post(
      `${PYTHON_SERVER_URL}/predict`,
      {
        voltage,
        current,
        temperature,
        vibration,
      }
    );

    const prediction = predictionResponse.data.prediction;

    const newEntry = new MotorData({
      motorNumber,
      voltage,
      current,
      temperature,
      vibration,
      category: prediction,
    });

    const savedEntry = await newEntry.save();
    res
      .status(201)
      .json({ message: "Motor data created successfully", data: savedEntry });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//get all motor data
const getAllMotorData = async (req, res) => {
  try {
    const motorData = await MotorData.find();
    res.status(200).json(motorData);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//get motor data by id
const getMotorDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const motorData = await MotorData.findById(id);
    if (!motorData) {
      return res.status(404).json({ message: "Motor data not found" });
    }
    res.status(200).json(motorData);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//delete motor data by id
const deleteMotorDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const motorData = await MotorData.findByIdAndDelete(id);
    if (!motorData) {
      return res.status(404).json({ message: "Motor data not found" });
    }
    res.status(200).json({ message: "Motor data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

//update motor data by id
const updateMotorDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const { voltage, current, temperature, vibration } = req.body;

    // Validate input data
    if (!voltage || !current || !temperature || !vibration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedMotorData = await MotorData.findByIdAndUpdate(
      id,
      { voltage, current, temperature, vibration },
      { new: true }
    );

    if (!updatedMotorData) {
      return res.status(404).json({ message: "Motor data not found" });
    }

    res.status(200).json({
      message: "Motor data updated successfully",
      data: updatedMotorData,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  createMotorData,
  getAllMotorData,
  getMotorDataById,
  deleteMotorDataById,
  updateMotorDataById,
};
