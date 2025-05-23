const express = require('express');
const router = express.Router();
const { createMotorData } = require('../controllers/motorController');

// Update route to '/api/motor-data'
router.post('/motor-data', createMotorData); 

module.exports = router;
