const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
