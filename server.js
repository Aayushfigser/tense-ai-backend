const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const connectDB = require('./config/db');
const { protect } = require('./middleware/authMiddleware');
const { errorHandler } = require('./middleware/errorMiddleware');
const nlpRoutes = require('./routes/nlpRoutes');

// Import routes
const efficiencyRoutes = require('./routes/efficiencyRoutes');
const routineRoutes = require('./routes/routineRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const rlRoutes = require('./routes/rlRoutes');
const fusionRoutes = require('./routes/fusionRoutes');
const llmRoutes = require('./routes/llmRoutes');
const pastRoutes = require('./routes/pastRoutes');
const presentRoutes = require('./routes/presentRoutes');
const futureRoutes = require('./routes/futureRoutes');


// Primary App for the API
const app = express();
const apiPort = process.env.PORT || 5000;

// Middleware to handle CORS for API
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.43.110:3000'], // allow both localhost and your network IP
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();  // Using the connectDB function from config/db.js

// API Routes
app.use('/api/efficiency', efficiencyRoutes);
app.use('/api/routines', routineRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rl', rlRoutes); 
app.use('/api', fusionRoutes); 
app.use('/api/llm', llmRoutes);
app.use('/api/nlp', nlpRoutes);
app.use('/api', pastRoutes);
app.use('/api', presentRoutes);
app.use('/api', futureRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.use(errorHandler);

// Start the API Server
app.listen(apiPort, () => {
  console.log(`API Server running on port ${apiPort}`);
});


