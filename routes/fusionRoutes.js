const express = require('express');
const { fusionLayer, feedbackController } = require('../controllers/fusionController');
const { protect } = require('../middleware/authMiddleware');
const { handleFusionRequest } = require('../controllers/llmController'); 


const router = express.Router();

// Define the routes
router.post('/fusion', protect, fusionLayer);
router.post('/feedback', protect, feedbackController);
router.post('/api/fusion', protect, handleFusionRequest); // Make sure this route points to the correct handler

module.exports = router;
