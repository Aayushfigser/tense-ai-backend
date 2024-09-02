// controllers/presentController.js
const { text } = require('body-parser');
const { callGeminiAPI } = require('../utils/geminiAPI');

exports.createPresentPrompt = async (req, res) => {
  try {
    const { prompt, userId } = req.body;

    // Prepare the data to send to Gemini API
    const data = {
      prompt: {
        text: prompt
      }
    };

    // Call the Gemini API
    const result = await callGeminiAPI(data);

    // Assuming the response structure from Gemini API
    const presentData = {
      userId,
      prompt,
      plan: result.candidates[0].text, // Replace with actual fields from response
    };

    // Save to DB if necessary, or directly return the response
    res.status(201).json(presentData);
  } catch (error) {
    console.error('Error generating present plan:', error.message);
    res.status(500).json({ error: 'Failed to generate plan' });
  }
};
