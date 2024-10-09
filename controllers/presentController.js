const { fusionLayer } = require('./fusionController');
const Conversation = require('../models/conversationModel');

// Handles user input for present analysis
const analyzePresent = async (req, res) => {
    try {
        const { text, userId } = req.body;
        
        // Retrieve past conversation context
        const userConversations = await Conversation.find({ userId });

        // Use the fusion layer to analyze user input
        const fusionResponse = await fusionLayer({
            state: userConversations,
            action: 'analyze_present',
            textPrompt: text
        });

        // Save this interaction in the database
        const newConversation = new Conversation({
            userId,
            input: text,
            output: fusionResponse.total,
            task: 'present'
        });
        await newConversation.save();

        // Respond back to the user
        res.status(200).json(fusionResponse);
    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze present situation' });
    }
};

module.exports = { analyzePresent };
