const mongoose = require('mongoose');

const habitSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    habit: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    // Add other fields as needed
}, {
    timestamps: true
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
