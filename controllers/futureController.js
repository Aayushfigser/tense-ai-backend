// controllers/futureController.js
const { vision } = require('googleapis/build/src/apis/vision');
const { callGeminiAPI } = require('../utils/geminiAPI');
const { text } = require('body-parser');

exports.createFuturePrompt = async (req, res) => {
  try {
    const { prompt, userId } = req.body;

    // Prepare the data to send to Gemini API
    const data = {
      prompt: {
        vision: prompt
      }
    };

    // Call the Gemini API
    const result = await callGeminiAPI(data);

    // Assuming the response structure from Gemini API
    const futureData = {
      userId,
      prompt,
      roadmaps: result.candidates[0].text, // Replace with actual fields from response
      successRate: result.successRate || 100 // Dummy success rate if not provided
    };

    // Save to DB if necessary, or directly return the response
    res.status(201).json(futureData);
  } catch (error) {
    console.error('Error analyzing future possibilities:', error.message);
    res.status(500).json({ error: 'Failed to explore future possibilities' });
  }
};
