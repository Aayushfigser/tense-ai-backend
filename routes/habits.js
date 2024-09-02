const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// Mark habit as completed for a specific date
router.post('/complete', async (req, res) => {
  const { habitId, date } = req.body;
  try {
    const habit = await Habit.findById(habitId);
    if (!habit.completedDates.includes(date)) {
      habit.completedDates.push(date);
      await habit.save();
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Retrieve habit completion status
router.get('/:userId', async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.params.userId });
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add new habit
router.post('/', async (req, res) => {
  const { userId, name, color } = req.body;
  try {
    const newHabit = new Habit({ userId, name, color });
    const savedHabit = await newHabit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete habit
router.delete('/:habitId', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.habitId);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
