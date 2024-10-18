const { fusionLogic } = require('./fusionController');
const Conversation = require('../models/coversationModel');

// Handles user input for present analysis
const analyzePresent = async (req, res) => {
    try {
        const userId = req._id
        const text = req.body.text
        
        // Retrieve past conversation context
        const userConversations = await Conversation.find({ userId });

        // Use the fusion layer to analyze user input
        const fusionResponse = await fusionLogic({
            state: userConversations,
            action: 'analyze_present',
            textPrompt: text
        });

        // Save this interaction in the database
        const newConversation = new Conversation({
            userId,
            input: text,
            output: fusionResponse.message,
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
