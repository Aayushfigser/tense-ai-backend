// controllers/efficiencyController.js
const asyncHandler = require('express-async-handler');
const Efficiency = require('../models/efficiencyModel');

// @desc    Get all efficiencies
// @route   GET /api/efficiency
// @access  Private
const getEfficiencies = asyncHandler(async (req, res) => {
  const efficiencies = await Efficiency.find({ user: req.user._id });
  res.json(efficiencies);
});

// @desc    Create new efficiency
// @route   POST /api/efficiency
// @access  Private
const createEfficiency = asyncHandler(async (req, res) => {
  const { date, score, data } = req.body;
  const efficiency = new Efficiency({
    user: req.user._id,
    date,
    score,
    data,
  });

  const createdEfficiency = await efficiency.save();
  res.status(201).json(createdEfficiency);
});

// @desc    Update an efficiency
// @route   PUT /api/efficiency/:id
// @access  Private
const updateEfficiency = asyncHandler(async (req, res) => {
  const { date, score, data } = req.body;
  const efficiency = await Efficiency.findById(req.params.id);

  if (efficiency) {
    efficiency.date = date || efficiency.date;
    efficiency.score = score || efficiency.score;
    efficiency.data = data || efficiency.data;

    const updatedEfficiency = await efficiency.save();
    res.json(updatedEfficiency);
  } else {
    res.status(404);
    throw new Error('Efficiency not found');
  }
});

// @desc    Delete an efficiency
// @route   DELETE /api/efficiency/:id
// @access  Private
const deleteEfficiency = asyncHandler(async (req, res) => {
  const efficiency = await Efficiency.findById(req.params.id);

  if (efficiency) {
    await Efficiency.deleteOne({ _id: req.params.id });
    res.json({ message: 'Efficiency removed' });
  } else {
    res.status(404);
    throw new Error('Efficiency not found');
  }
});

module.exports = { getEfficiencies, createEfficiency, updateEfficiency, deleteEfficiency };
