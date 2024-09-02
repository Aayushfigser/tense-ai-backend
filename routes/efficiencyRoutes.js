// routes/efficiencyRoutes.js
const express = require('express');
const router = express.Router();
const {
  getEfficiencies,
  createEfficiency,
  updateEfficiency,
  deleteEfficiency
} = require('../controllers/efficiencyController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getEfficiencies).post(protect, createEfficiency);
router.route('/:id').put(protect, updateEfficiency).delete(protect, deleteEfficiency);

module.exports = router; 
