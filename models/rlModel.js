const mongoose = require('mongoose');

const rlSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    qTable: [[Number]], // A 2D array to represent the Q-table
    actionSpace: [String],
    state: { type: Object }, // Can store the current state
    explorationRate: { type: Number, default: 1.0 },
    learningRate: { type: Number, default: 0.1 },
    discountFactor: { type: Number, default: 0.9 },
});

module.exports = mongoose.model('RL', rlSchema);
