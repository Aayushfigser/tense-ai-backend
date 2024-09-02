const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  logoutUser,
  registerUser,
  authUser
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Auth routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post('/logout', protect, logoutUser);
router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;
