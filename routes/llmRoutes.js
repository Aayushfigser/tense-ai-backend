// routes/llmRoutes.js

const express = require('express');
const { handleFusionRequest } = require('../controllers/llmController'); // Import the controller function

const router = express.Router();

// Define the route for LLM requests
router.post('/fusion', handleFusionRequest); // POST request to handle fusion requests

module.exports = router; // Export the router
