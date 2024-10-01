const express = require('express');
const router = express.Router();
const { getRoutines, setRoutine, updateRoutine, deleteRoutine } = require('../controllers/routineController');
const { protect } = require('../middleware/authMiddleware');

// Example route setup
router.route('/')
    .get(protect, getRoutines)
    .post(protect, setRoutine);

router.route('/:id')
    .put(updateRoutine)
    .delete(deleteRoutine);

module.exports = router;
