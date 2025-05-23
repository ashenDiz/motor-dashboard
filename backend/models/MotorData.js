const mongoose = require("mongoose");

// Create Schema for Motor Data
const motorDataSchema = new mongoose.Schema(
  {
    motorNumber: {
      type: String,
      required: true,
    },
    voltage: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    vibration: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MotorData = mongoose.model("MotorData", motorDataSchema);

module.exports = MotorData;
