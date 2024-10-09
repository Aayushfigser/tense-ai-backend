// routes/pastRoutes.js
const express = require('express');
const { analyzePast } = require('../controllers/pastController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get past response
router.post('/past', protect, analyzePast);

module.exports = router;
