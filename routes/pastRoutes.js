// routes/pastRoutes.js

const express = require('express');
const callGeminiAPI = require('../utils/geminiAPI');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { experience } = req.body;
        const result = await callGeminiAPI({ prompt: experience });
        res.json(result);
    } catch (error) {
        console.error('Error analyzing past experience:', error.message);
        res.status(500).json({ error: 'Failed to analyze past experience' });
    }
});

module.exports = router;
