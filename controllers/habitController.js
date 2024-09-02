const asyncHandler = require('express-async-handler');
const Habit = require('../models/Habit');

// @desc    Get all habits
// @route   GET /api/habits
// @access  Private
const getHabits = asyncHandler(async (req, res) => {
    const habits = await Habit.find({ user: req.user._id });
    res.json(habits);
});

// @desc    Create a new habit
// @route   POST /api/habits
// @access  Private
const createHabit = asyncHandler(async (req, res) => {
    const { habit, frequency } = req.body;

    const newHabit = new Habit({
        user: req.user._id,
        habit,
        frequency,
    });

    const createdHabit = await newHabit.save();
    res.status(201).json(createdHabit);
});

// @desc    Update an existing habit
// @route   PUT /api/habits/:id
// @access  Private
const updateHabit = asyncHandler(async (req, res) => {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
        res.status(404);
        throw new Error('Habit not found');
    }

    if (habit.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    habit.habit = req.body.habit || habit.habit;
    habit.frequency = req.body.frequency || habit.frequency;

    const updatedHabit = await habit.save();
    res.json(updatedHabit);
});

// @desc    Delete a habit
// @route   DELETE /api/habits/:id
// @access  Private
const deleteHabit = asyncHandler(async (req, res) => {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
        res.status(404);
        throw new Error('Habit not found');
    }

    if (habit.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    await habit.remove();
    res.json({ message: 'Habit removed' });
});

module.exports = {
    getHabits,
    createHabit,
    updateHabit,
    deleteHabit
};
