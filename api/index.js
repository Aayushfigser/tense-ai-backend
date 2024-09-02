const express = require('express');
const axios = require('axios');
const router = express.Router();

// Gemini API configuration
const geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
const geminiApiKey = process.env.GEMINI_API_KEY; // Use environment variable

// ChatGPT API configuration
const chatgptApiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const chatgptApiKey = process.env.CHATGPT_API_KEY; // Use environment variable

// Routes for Gemini API
router.post('/past', async (req, res) => {
    const { text } = req.body;
    try {
        const response = await axios.post(`${geminiApiUrl}/past`, { Experience }, {
            headers: { 'Authorization': `Bearer ${geminiApiKey}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/present', async (req, res) => {
    const { text } = req.body;
    try {
        const response = await axios.post(`${geminiApiUrl}/present`, { text }, {
            headers: { 'Authorization': `Bearer ${geminiApiKey}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/future', async (req, res) => {
    const { text } = req.body;
    try {
        const response = await axios.post(`${geminiApiUrl}/future`, { vision},{
            headers: { 'Authorization': `Bearer ${geminiApiKey}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Routes for ChatGPT API
router.post('/chatgpt/idea', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await axios.post(chatgptApiUrl, {
            prompt,
            max_tokens: 100,
            temperature: 0.7,
        }, {
            headers: { 'Authorization': `Bearer ${chatgptApiKey}` }
        });
        res.json(response.data.choices[0].text);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
