const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import cors
const motorRoutes = require('./routes/motorRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:3000',  // Allow the frontend running on this URL
}));

// Middleware to parse incoming JSON data
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.log(error));

// Use the motorRoutes for handling motor data
app.use('/api', motorRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Backend is running on http://localhost:${PORT}`);
});
