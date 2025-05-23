const express = require('express');
const mongoose = require('mongoose');
import connectDB from './utils/DBconnection';
const cors = require('cors');  
const motorRoutes = require('./routes/motorRoutes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/motor-failures', motorRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend is running on http://localhost:${PORT}`);
  connectDB();
});
