const mongoose = require('mongoose');

// Create Schema for Motor Data
const motorDataSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the MotorData model based on the schema
const MotorData = mongoose.model('MotorData', motorDataSchema);

module.exports = MotorData;
