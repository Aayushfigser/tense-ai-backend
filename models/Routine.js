const mongoose = require('mongoose');

const routineSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    activity: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    // Add other fields as needed
}, {
    timestamps: true
});

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;
