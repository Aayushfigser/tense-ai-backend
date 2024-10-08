const { spawn } = require('child_process');
const axios = require('axios');

// Function to call the Gemini API via Python script
const callGeminiAPI = (content) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['utils/geminiAPI.py', content]);

        let result = '';
        let errorOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (error) => {
            errorOutput += error.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    const jsonResponse = JSON.parse(result);
                    console.log('LLM API Response:', jsonResponse);
                    resolve(jsonResponse);
                } catch (error) {
                    reject(new Error('Failed to parse response from LLM: ' + error.message));
                }
            } else {
                reject(new Error('LLM process failed: ' + errorOutput));
            }
        });
    });
};

const weightedFusion = (rlOutput, llmOutput, context = {}, baseAlpha = 0.2) => {
    const rlWeight = baseAlpha + (context.rlInfluence || 0);
    const llmWeight = 1 - rlWeight;

    const rlValue = rlOutput || 0;
    const llmValue = llmOutput || 0;

    return {
        combinedResult: {
            rl: rlWeight * rlValue,
            llm: llmWeight * llmValue
        },
        total: (rlWeight * rlValue) + (llmWeight * llmValue),
    };
};

// Function to call the NLP processing for sentiment and intent classification
const callNLPProcessing = (text, task) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['utils/nlpProcessing.py', text, task]);

        let result = '';
        let errorOutput = '';

        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (error) => {
            errorOutput += error.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    const jsonResponse = JSON.parse(result);
                    resolve(jsonResponse);
                } catch (error) {
                    reject(new Error('Failed to parse NLP response: ' + error.message));
                }
            } else {
                reject(new Error('NLP process failed: ' + errorOutput));
            }
        });
    });
};

// Fusion Layer to combine RL Agent, LLM outputs, and NLP Analysis
const fusionLayer = async (req, res) => {
    const { state, action, textPrompt, alpha } = req.body;

    try {
        // Step 1: Call RL Agent
        const rlProcess = spawn('python', ['utils/rlAgent.py', JSON.stringify(state), action]);

        rlProcess.stdout.on('data', async (rlData) => {
            const rlOutput = JSON.parse(rlData.toString()).output;

            try {
                // Step 2: Call LLM using Python
                console.log('Calling LLM with prompt:', textPrompt);
                const llmOutput = await callGeminiAPI(textPrompt);
                console.log('LLM Output:', llmOutput);

                const llmValue = llmOutput?.candidates[0]?.content?.parts[0]?.text || 0;
                console.log('Extracted LLM value:', llmValue);

                // Step 3: NLP Processing - Sentiment and Intent Analysis
                const sentimentAnalysis = await callNLPProcessing(textPrompt, 'analyze_sentiment');
                const intentClassification = await callNLPProcessing(textPrompt, 'classify_intent');
                console.log('Sentiment:', sentimentAnalysis.result);
                console.log('Intent:', intentClassification.result);

                // Step 4: Combine RL, LLM, and NLP using weighted averages
                const fusedResponse = weightedFusion(
                    rlOutput,
                    llmValue,
                    { rlInfluence: sentimentAnalysis.result === 'positive' ? 0.1 : -0.1 },
                    alpha || 0.2
                );

                res.status(200).json({
                    fusedResponse,
                    sentiment: sentimentAnalysis.result,
                    intent: intentClassification.result
                });
            } catch (error) {
                console.error('Error in calling LLM or NLP:', error);
                res.status(500).json({ error: 'Failed to call LLM or NLP', details: error.message });
            }
        });

        rlProcess.stderr.on('data', (error) => {
            console.error(`Error running RL Agent: ${error}`);
            res.status(500).json({ error: 'Failed to run RL Agent' });
        });
    } catch (error) {
        console.error('Error in fusionLayer:', error);
        res.status(500).json({ error: 'Fusion Layer failed' });
    }
};

// Feedback Loop for Reinforcement Learning
const feedbackController = async (req, res) => {
    const { feedback, fusedResponse } = req.body;

    try {
        const reward = feedback; // Use feedback as reward value

        const rlProcess = spawn('python', ['utils/rlAgent.py', JSON.stringify(fusedResponse), reward]);

        rlProcess.stdout.on('data', async (rlData) => {
            const updatedState = rlData.toString();

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
