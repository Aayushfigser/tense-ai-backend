// routes/presentRoutes.js

const express = require('express');
const callGeminiAPI = require('../utils/geminiAPI');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { text } = req.body;
        const plan = await callGeminiAPI({ prompt: text });
        res.json(plan);
    } catch (error) {
        console.error('Error generating present plan:', error.message);
        res.status(500).json({ error: 'Failed to generate plan' });
    }
});

module.exports = router;
