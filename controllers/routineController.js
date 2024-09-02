// controllers/routineController.js

const asyncHandler = require('express-async-handler');

// @desc    Get all routines
// @route   GET /api/routines
// @access  Private
const getRoutines = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get routines' });
});

// @desc    Set a routine
// @route   POST /api/routines
// @access  Private
const setRoutine = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Set routine' });
});

// @desc    Update a routine
// @route   PUT /api/routines/:id
// @access  Private
const updateRoutine = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update routine ${req.params.id}` });
});

// @desc    Delete a routine
// @route   DELETE /api/routines/:id
// @access  Private
const deleteRoutine = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete routine ${req.params.id}` });
});

module.exports = {
    getRoutines,
    setRoutine,
    updateRoutine,
    deleteRoutine,
};
