const express = require('express');
const router = express.Router();
const {
  getPlans,
  createPlan,
  getPlanById,
  updatePlan,
  deletePlan,
} = require('../controllers/planController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getPlans).post(protect, createPlan);
router
  .route('/:id')
  .get(protect, getPlanById)
  .put(protect, updatePlan)
  .delete(protect, deletePlan);

module.exports = router;
