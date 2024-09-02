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
const premiumRoutes = require('./routes/premiumRoutes');
const gamificationRoutes = require('./routes/gamificationRoutes');
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
app.use('/api', protect, premiumRoutes);
app.use('/api', protect, gamificationRoutes);


// Gemini API configuration
const geminiApiUrl = 'https://api.gemini.com/v1';
const geminiApiKey = process.env.GEMINI_API_KEY;

// ChatGPT API configuration
const chatgptApiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const chatgptApiKey = process.env.CHATGPT_API_KEY;

// Routes for Gemini API
app.post('/api/past', async (req, res) => {
  const { experience } = req.body;
  try {
    const response = await axios.post(`${geminiApiUrl}/past`, { experience }, {
      headers: { 'Authorization': `Bearer ${geminiApiKey}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error analyzing past:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/present', async (req, res) => {
  const { text } = req.body;
  try {
    const response = await axios.post(`${geminiApiUrl}/present`, { text }, {
      headers: { 'Authorization': `Bearer ${geminiApiKey}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error analyzing present:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/future', async (req, res) => {
  const { vision } = req.body;
  try {
    const response = await axios.post(`${geminiApiUrl}/future`, { vision }, {
      headers: { 'Authorization': `Bearer ${geminiApiKey}` }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error analyzing future:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Routes for ChatGPT API
app.post('/api/chatgpt/idea', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post(chatgptApiUrl, {
      prompt,
      max_tokens: 100,
      temperature: 0.7,
    }, {
      headers: { 'Authorization': `Bearer ${chatgptApiKey}` }
    });
    res.json(response.data.choices[0].text);
  } catch (error) {
    console.error('Error generating idea:', error.message);
    res.status(500).json({ error: error.message });
  }
});

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
