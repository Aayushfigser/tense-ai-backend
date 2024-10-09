// routes/presentRoutes.js
const express = require('express');
const {  analyzePresent } = require('../controllers/presentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get present response
router.post('/present', protect, analyzePresent);

module.exports = router;
