//This is working properly so, it is ready to use for initial stage 

const { spawn } = require('child_process');
const axios = require('axios');


// training our own data aswell which are responses for specific queries
const predefinedResponses = (text) => {
    const queries = {
        'what is tenseai': "TenseAI is an artificial research company co-founded by Ayush Maurya, Deependra Maurya, and Bhanu Paliwal.",
        'who are you': "Hi, I am TenseAI, here to help with daily life use and making things simpler for you.",
        'who is co-founder of tenseai': "TenseAI was co-founded by Ayush Maurya, Deependra Maurya, and Bhanu Paliwal.",
        'introduce yourself': "Hi, I am TenseAI, designed to assist you in managing your life better.",
        'give me brief of tenseai': "TenseAI is focused on advancing artificial intelligence for better life management, founded by Ayush Maurya, Deependra Maurya, and Bhanu Paliwal.",
        'who is ayush maurya' : "ayush maurya is co-founder and CEO of Tenseai, author and he was common visionary boy.",
        'how to build tenseai' :"yes, you can build tenseai but think if you build tenseai you copy me, so why you copy me when i am here the real with you",
        'tenseai ko kisne bnaya': " Tenseai software ko ayush maurya, deependra maurya and bhanu paliwal ne bnaya h.",
        'Tum jo aye zindagi mein': "tu btt bngayi, but tell me how can i help you",
        'updates about 2024': "Here are some updates about 2024: International Year of Camelids, The UN has designated 2024 as the International Year of Camelids. Camels, llamas, alpacas, vicuñas, and guanacos are important sources of livelihood for many families in dryland and mountainous rangeland ecosystems. Global economy. The World Economic Outlook (WEO) projects global growth to be 3.2% in 2024 and 3.3% in 2025. However, geopolitical tensions, rising shipping costs, and emerging industrial policies could reshape global trade patterns. J.P. Morgan Research estimates a 35% chance that the global economy will enter a recession by the end of 2024. International student visas, the UK's new regulations for international students will impact those arriving after January 2024. Dependents who have already been living in the UK with the student will be able to apply for a dependant visa to stay in the UK after the student switches to a Post-Study Work (PSW) visa. Elections More than 70 countries will hold elections in 2024, which could test the democratic system. International days Some important international days include International Day for Peace, International Women's Day, World Anti-Tobacco Day, World Environment Day, and International Yoga Day. Summer Paralympics The 2024 Summer Paralympics will be held in Paris, France from August 28 to September 8. ",
        'tell me a joke': "Haa ahaa haaa  huuu ha huu haah ah haaaa, there was king haa haa haa haa haaa, who wanted to rule haaha haa, but whenever he had gone for war, his minister said you are near to die because you using pencil to fight."
    };


    // Normalize the user input
    const normalizedText = text.toLowerCase().trim();

    // Return the corresponding predefined response, or null if no match is found
    return queries[normalizedText] || null;
};



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

const fusionLogic = async ({state, action, textPrompt}) => {
    try {
        // Step 1: Check for predefined responses
        const predefinedResponse = predefinedResponses(textPrompt);

        if (predefinedResponse) {
            // If we find a predefined response, return it without invoking the RL agent or LLM
            return {
                message: predefinedResponse,
                source: 'predefined'
            };
        }

    
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

                resolve({
                    fusedResponse,
                    sentiment: sentimentAnalysis.result,
                    intent: intentClassification.result
                });
            } catch (error) {
                console.error('Error in calling LLM or NLP:', error);
                reject(new Error('Error in LLM or NLP process: ' + error.message));
            }
        });

        rlProcess.stderr.on('data', (error) => {
            console.error(`Error running RL Agent: ${error}`);
            reject(new Error(`Error running RL Agent: ${error}`));
        });
    } catch (error) {
        console.error('Error in fusionLayer:', error);
        throw new Error('Fusion Logic failed: ' + error.message);
    }
}

// Fusion Layer to combine RL Agent, LLM outputs, and NLP Analysis
const fusionLayer = async (req, res) => {
    const { state, action, textPrompt } = req.body;
    try {
        const fusionResponse = await fusionLogic(state, action, textPrompt);
        res.status(200).json(fusionResponse);
    } catch (error) {
        console.error('Error in fusionLayer:', error);
        res.status(500).json({ error: 'Fusion Layer failed', details: error.message });
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

module.exports = { fusionLayer, fusionLogic, feedbackController };
