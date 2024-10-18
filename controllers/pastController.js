const { fusionLogic } = require('./fusionController');
const Conversation = require('../models/coversationModel');

// Handles user input for analyzing past experiences
const analyzePast = async (req, res) => {
    try {
        const userId = req._id
        const text = req.body.text
        
        // Retrieve past conversation context
        const userConversations = await Conversation.find({ userId });

        // Use the fusion layer to analyze user input
        const fusionResponse = await fusionLogic({
            state: userConversations,
            action: 'analyze_past',
            textPrompt: text
        });
    
        // Save this interaction in the database
        const newConversation = new Conversation({
            userId,
            input: text,
            output: fusionResponse.message,
            task: 'past'
        });

        await newConversation.save();

        // Respond back to the user
        res.status(200).json(fusionResponse);
    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze past experience' });
    }
};

module.exports = { analyzePast };
