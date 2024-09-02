const express = require('express');
const router = express.Router();
const { getRoutines, addRoutine, deleteRoutine, toggleCompleteRoutine } = require('../controllers/routines');

router.get('/', getRoutines);
router.post('/', addRoutine);
router.delete('/:id', deleteRoutine);
router.patch('/complete/:id', toggleCompleteRoutine);

module.exports = router;
