const express = require('express');
const { fusionLayer, feedbackController } = require('../controllers/fusionController');
const { protect } = require('../middleware/authMiddleware');
const { handleFusionRequest } = require('../controllers/llmController'); 

const router = express.Router();

router.post('/fusion', protect, fusionLayer);
router.post('/feedback', protect, feedbackController);
// Route to handle fusion requests
router.post('/api/fusion', handleFusionRequest);

module.exports = router;
