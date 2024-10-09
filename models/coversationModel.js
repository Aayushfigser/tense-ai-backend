const mongoose = require('mongoose');

// Stores past conversations and interactions for context
const conversationSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        input: {
            type: String,
            required: true,
        },
        output: {
            type: String,
            required: true,
        },
        task: {
            type: String,
            enum: ['past', 'present', 'future'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
