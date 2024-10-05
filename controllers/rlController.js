const { spawn } = require('child_process');
const RL = require('../models/rlModel');  // Import the RL MongoDB model

// Function to call Python RL Agent and update the Q-table
const updateRL = async (req, res) => {
    try {
        const { userId, state, action, reward = null } = req.body;

        // Fetch RL model from MongoDB for the user
        let rlModel = await RL.findOne({ userId });

        if (!rlModel) {
            // Initialize a new RL model if none exists
            rlModel = new RL({
                userId,
                qTable: Array(10).fill(Array(4).fill(0)),  // Initialize an empty Q-table
                actionSpace: ['recommend_goal', 'provide_feedback', 'ask_for_input', 'recommend_insights'],
                state,
                explorationRate: 1.0,
                learningRate: 0.1,
                discountFactor: 0.9,
            });
        }

        // Call Python RL Agent with current state and action
        const pythonProcess = spawn('python', ['path/to/rlAgent.py', JSON.stringify(state), action]);

        pythonProcess.stdout.on('data', async (data) => {
            const rlOutput = JSON.parse(data.toString());  // Parse Python RL output

            // Update Q-table and state in the MongoDB document
            rlModel.qTable = rlOutput.qTable;  // Assuming the Python script returns an updated Q-table
            rlModel.state = rlOutput.state;

            // If feedback is provided, incorporate it into the agent's learning
            if (reward !== null) {
                rlModel.qTable = await applyFeedback(rlModel.qTable, action, reward);
            }

            await rlModel.save();  // Save updated RL model to MongoDB

            res.status(200).json({ message: 'RL agent updated', rlOutput });
        });

        pythonProcess.stderr.on('data', (error) => {
            console.error(`Error from Python RL Agent: ${error}`);
            res.status(500).json({ error: 'Failed to update RL agent' });
        });

    } catch (error) {
        console.error('Error in RL Controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to apply feedback to the Q-table
const applyFeedback = async (qTable, action, reward) => {
    const actionIndex = ['recommend_goal', 'provide_feedback', 'ask_for_input', 'recommend_insights'].indexOf(action);
    if (actionIndex >= 0) {
        // Apply learning rule (like Q-learning) to update Q-table based on feedback (reward)
        qTable[state][actionIndex] += reward;  // Adjust this to match the RL logic
    }
    return qTable;
};

module.exports = {
    updateRL,
};
