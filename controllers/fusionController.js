const { spawn } = require('child_process');
const { callGemmaLLM } = require('./llmController'); // Updated import to match the function name

// Weighted Fusion Function
const weightedFusion = (rlOutput, llmOutput, alpha = 0.5) => {
    const rlWeight = alpha;
    const llmWeight = 1 - alpha;

    // Combine outputs using weighted average
    return `${rlWeight * rlOutput} and ${llmWeight * llmOutput}`;
};

// Fusion Layer to combine RL Agent and LLM outputs
const fusionLayer = async (req, res) => {
    const { state, action, textPrompt, alpha } = req.body;

    try {
        // Step 1: Call RL Agent (Python script)
        const rlProcess = spawn('python', ['utils/rlAgent.py', JSON.stringify(state), action]);

        rlProcess.stdout.on('data', async (rlData) => {
            const rlOutput = parseFloat(rlData.toString());

            // Step 2: Call LLM based on user prompt
            const llmOutput = await callGemmaLLM(textPrompt);  // Updated function call to match llmController

            // Step 3: Fusion logic (Combine RL and LLM outputs using weighted averages)
            const fusedResponse = weightedFusion(rlOutput, parseFloat(llmOutput), alpha || 0.7);

            // Step 4: Send combined response back to the frontend
            res.status(200).json({ fusedResponse });
        });

        rlProcess.stderr.on('data', (error) => {
            console.error(`Error: ${error}`);
            res.status(500).json({ error: 'Failed to run RL Agent' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Fusion Layer failed' });
    }
};

// Feedback Loop for Reinforcement Learning
const feedbackController = async (req, res) => {
    const { feedback, fusedResponse } = req.body;

    try {
        const reward = feedback;  // Use feedback as reward value

        // Call the RL Agent to update based on feedback
        const rlProcess = spawn('python', ['path/to/rlAgent.py', JSON.stringify(fusedResponse), reward]);

        rlProcess.stdout.on('data', async (rlData) => {
            const updatedState = rlData.toString();

            // Respond to the frontend that feedback was processed
            res.status(200).json({ message: 'Feedback processed successfully', updatedState });
        });

        rlProcess.stderr.on('data', (error) => {
            console.error(`Error processing feedback: ${error}`);
            res.status(500).json({ error: 'Failed to process feedback' });
        });

    } catch (error) {
        console.error('Error in feedback controller:', error);
        res.status(500).json({ error: 'Failed to process feedback' });
    }
};

module.exports = { fusionLayer, feedbackController };
