const asyncHandler = require('express-async-handler');
const Plan = require('../models/Plan');

// @desc    Get all plans
// @route   GET /api/plans
// @access  Private
const getPlans = asyncHandler(async (req, res) => {
  const plans = await Plan.find({ user: req.user._id });
  res.json(plans);
});

// @desc    Create new plan
// @route   POST /api/plans
// @access  Private
const createPlan = asyncHandler(async (req, res) => {
  const { title, description, date } = req.body;

  const plan = new Plan({
    user: req.user._id,
    title,
    description,
    date,
  });

  const createdPlan = await plan.save();
  res.status(201).json(createdPlan);
});

// @desc    Get plan by ID
// @route   GET /api/plans/:id
// @access  Private
const getPlanById = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id);

  if (plan) {
    res.json(plan);
  } else {
    res.status(404);
    throw new Error('Plan not found');
  }
});

// @desc    Update plan
// @route   PUT /api/plans/:id
// @access  Private
const updatePlan = asyncHandler(async (req, res) => {
  const { title, description, date } = req.body;

  const plan = await Plan.findById(req.params.id);

  if (plan) {
    plan.title = title || plan.title;
    plan.description = description || plan.description;
    plan.date = date || plan.date;

    const updatedPlan = await plan.save();
    res.json(updatedPlan);
  } else {
    res.status(404);
    throw new Error('Plan not found');
  }
});

// @desc    Delete plan
// @route   DELETE /api/plans/:id
// @access  Private
const deletePlan = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id);

  if (plan) {
    await plan.remove();
    res.json({ message: 'Plan removed' });
  } else {
    res.status(404);
    throw new Error('Plan not found');
  }
});

module.exports = {
  getPlans,
  createPlan,
  getPlanById,
  updatePlan,
  deletePlan,
};
