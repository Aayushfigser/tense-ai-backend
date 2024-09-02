const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/logout', protect, logoutUser);

module.exports = router;
