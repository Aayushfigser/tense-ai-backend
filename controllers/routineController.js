// controllers/routineController.js

const asyncHandler = require('express-async-handler');
const Routine = require('../models/Routine'); 


// @desc    Get all routines
// @route   GET /api/routines
// @access  Private
const getRoutines = asyncHandler(async (req, res) => {

    const userId = req._id; 

    // Fetch routines for the current user
    const routines = await Routine.find({ user: userId });
    
    res.status(200).json(routines);
});

// @desc    Set a routine
// @route   POST /api/routines
// @access  Private
const setRoutine = asyncHandler(async (req, res) => {
    const {goal, duration, selectedDate, type, takeHelp} = req.body;

    if(!goal || !duration || !selectedDate || !type){
        res.status(400);
        throw new Error("Please add all fields!");
    }

    // Create a new routine
    const routine = new Routine({
        user: req._id,
        goal,
        duration,
        selectedDate,
        type,
        takeHelp,
        completed: false
    });

    const createRoutine = await routine.save();

    res.status(201).json(createRoutine);
});

// @desc    Update a routine
// @route   PUT /api/routines/:id
// @access  Private
const updateRoutine = asyncHandler(async (req, res) => {
    const { id }  = req.params
    const { completed } = req.body

    try{
        const updatedRoutine = await Routine.findByIdAndUpdate(
            id,
            {completed : completed}
        );
        if (!updatedRoutine) {
            return res.status(404).json({message: "Routine not found"})
        };

        res.status(200).json(updatedRoutine);
    }catch(error){
        res.status(500).json({message: "Error updating routine", error})
    }
});

// @desc    Delete a routine
// @route   DELETE /api/routines/:id
// @access  Private
const deleteRoutine = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Find the routine by ID and delete it from the database
        const deletedRoutine = await Routine.findByIdAndDelete(id);

        if (!deletedRoutine) {
            return res.status(404).json({ message: "Routine not found" });
        }

        res.status(200).json({ message: "Routine deleted successfully", deletedRoutine });
    } catch (error) {
        res.status(500).json({ message: "Error deleting routine", error });
    }
});

module.exports = {
    getRoutines,
    setRoutine,
    updateRoutine,
    deleteRoutine,
};
