const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const connectDB = require('./config/db');
const { protect } = require('./middleware/authMiddleware');
const { errorHandler } = require('./middleware/errorMiddleware');


// Import routes
const efficiencyRoutes = require('./routes/efficiencyRoutes');
const routineRoutes = require('./routes/routineRoutes');
const pastRoutes = require('./routes/pastRoutes');
const presentRoutes = require('./routes/presentRoutes');
const futureRoutes = require('./routes/futureRoutes');
const ideasRoutes = require('./routes/ideasRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();
const port = process.env.PORT || 5000;

// Middleware to handle CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.43.110:3000'], // allow both localhost and your network IP
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();  // Using the connectDB function from config/db.js

// Routes
app.use('/api/efficiency', efficiencyRoutes);
app.use('/api/routines', routineRoutes);
app.use('/api/users', userRoutes);
app.use('/api/past', pastRoutes);
app.use('/api/present', presentRoutes);
app.use('/api/future', futureRoutes);
app.use('/api/ideas', ideasRoutes);
app.use('/api/auth', authRoutes);





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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
