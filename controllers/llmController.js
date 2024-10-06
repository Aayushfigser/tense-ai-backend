const { spawn } = require('child_process');

// Call Gemma LLM (Python) 
const callGemmaLLM = async (prompt) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['utils/gemmaModel.py', prompt]);

        pythonProcess.stdout.on('data', (data) => {
            const output = data.toString();
            resolve(output.trim());  // Resolve LLM output
        });

        pythonProcess.stderr.on('data', (error) => {
            console.error(`Error in Gemma LLM: ${error}`);
            reject('Failed to process with Gemma LLM');  // Reject with a user-friendly message
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(`Python process exited with code: ${code}`);  // Provide error code on failure
            }
        });
    });
};

// Example function to handle a fusion request
const handleFusionRequest = async (req, res) => {
    const { prompt } = req.body;  // Assuming prompt is sent in the request body
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });  // Validate input
    }

    try {
        const result = await callGemmaLLM(prompt);
        res.status(200).json({ output: result });
    } catch (error) {
        console.error('Caught an error in handleFusionRequest:', error);
        res.status(500).json({ error: error.message });  // Return error message
    }
};

module.exports = { callGemmaLLM, handleFusionRequest };
