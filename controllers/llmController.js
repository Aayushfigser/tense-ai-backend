// controllers/llmController.js
const { spawn } = require('child_process');


// Function to handle fusion requests
const handleFusionRequest = async (req, res) => {
    const { prompt } = req.body;  // Extract prompt from request body

    try {
        // Spawn a child process to call the Python geminiAPI script
        const pythonProcess = spawn('python', ['utils/geminiAPI.py', prompt]);

        let result = '';
        let errorOutput = '';

        // Collect data from the Python script
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (error) => {
            errorOutput += error.toString();
        });

        // When the Python process finishes, process the result
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                // Try to parse result as JSON
                try {
                    const jsonResponse = JSON.parse(result);
                    res.status(200).json(jsonResponse);  // Send the parsed JSON response back to the client
                } catch (parseError) {
                    console.error('Error parsing JSON response:', parseError);
                    res.status(500).json({ error: 'Failed to parse response from LLM' });
                }
            } else {
                console.error('Python process failed:', errorOutput);
                res.status(500).json({ error: 'Failed to call LLM', details: errorOutput });
            }
        });
    } catch (error) {
        console.error('Error in handleFusionRequest:', error);
        res.status(500).json({ error: 'Failed to process LLM request' });
    }
};

module.exports = { handleFusionRequest };
