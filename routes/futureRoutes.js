
// routes/futureRoutes.js
const express = require('express');
const { analyzeFuture } = require('../controllers/futureController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get future response
router.post('/future', protect, analyzeFuture);

module.exports = router;
