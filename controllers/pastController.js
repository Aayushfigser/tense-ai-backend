// controllers/pastController.js
const { callGeminiAPI } = require('../utils/geminiAPI');

exports.createPastPrompt = async (req, res) => {
  try {
    const { prompt, userId } = req.body;

    // Prepare the data to send to Gemini API
    const data = {
      prompt: {
        experience: prompt
      }
    };

    // Call the Gemini API
    const result = await callGeminiAPI(data);

    // Assuming the response structure from Gemini API
    const pastData = {
      userId,
      prompt,
      analysis: result.candidates[0].text, // Replace with actual fields from response
    };

    // Save to DB if necessary, or directly return the response
    res.status(201).json(pastData);
  } catch (error) {
    console.error('Error analyzing past experience:', error.message);
    res.status(500).json({ error: 'Failed to analyze past experience' });
  }
};
