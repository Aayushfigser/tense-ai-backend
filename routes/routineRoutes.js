const express = require('express');
const router = express.Router();
const { getRoutines, setRoutine, updateRoutine, deleteRoutine } = require('../controllers/routineController');

// Example route setup
router.route('/')
    .get(getRoutines)
    .post(setRoutine);

router.route('/:id')
    .put(updateRoutine)
    .delete(deleteRoutine);

module.exports = router;
