const express = require('express');
const { updateRL } = require('../controllers/rlController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to handle updates from the frontend
router.post('/update', protect, updateRL);

module.exports = router;
