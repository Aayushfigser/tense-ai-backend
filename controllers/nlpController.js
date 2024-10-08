const { spawn } = require('child_process');
const path = require('path');

// Function to process text and classify intent via Python
const processText = (text, task) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', [path.join(__dirname, '../utils/nlpProcessing.py'), text, task]);

        let result = '';
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (error) => {
            console.error(`Error processing text: ${error}`);
            reject(new Error('Error processing text'));
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    const parsedResult = JSON.parse(result);
                    resolve(parsedResult.result);  // Parse the JSON result from Python
                } catch (error) {
                    reject(new Error('Failed to parse Python response'));
                }
            } else {
                reject(new Error('Python script failed'));
            }
        });
    });
};

// Controller to classify intent
exports.classifyIntent = async (req, res) => {
    const { text } = req.body;
    try {
        const intent = await processText(text, 'classify_intent');
        res.status(200).json({ intent });
    } catch (error) {
        res.status(500).json({ error: 'Failed to classify intent' });
    }
};

// Controller to analyze sentiment
exports.analyzeSentiment = async (req, res) => {
    const { text } = req.body;
    try {
        const sentiment = await processText(text, 'analyze_sentiment');
        res.status(200).json({ sentiment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze sentiment' });
    }
};

// Controller to analyze tone
exports.analyzeTone = async (req, res) => {
    const { text } = req.body;
    try {
        const tone = await processText(text, 'analyze_tone');
        res.status(200).json({ tone });
    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze tone' });
    }
};
