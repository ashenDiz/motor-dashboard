const MotorData = require('../models/MotorData');

// @desc    Store motor sensor data
// @route   POST /api/motor
// @access  Public
const createMotorData = async (req, res) => {
  try {
    const { voltage, current, temperature, vibration } = req.body;

    const newEntry = new MotorData({
      voltage,
      current,
      temperature,
      vibration,
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = { createMotorData };
