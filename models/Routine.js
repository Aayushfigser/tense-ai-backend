const mongoose = require('mongoose');

const routineSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        goal: {  // This maps to 'activity'
            type: String,
            required: true
        },
        duration: {  // Added duration field
            type: String,
            required: true
        },
        type: {  // Added type field (e.g., Personal, Work)
            type: String,
            required: true
        },
        selectedDate: {  // Store the date
            type: Date,
            required: true
        },
        takeHelp :{
            type: Boolean,
            required: false
        },
        completed :{
            type: Boolean,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;
