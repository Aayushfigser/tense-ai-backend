const express = require('express');
const router = express.Router();
const { getHabits, createHabit, updateHabit, deleteHabit } = require('../controllers/habitController');
const protect = require('../middleware/authMiddleware');

router.route('/').get(protect, getHabits).post(protect, createHabit);
router.route('/:id').put(protect, updateHabit).delete(protect, deleteHabit);

module.exports = router;
