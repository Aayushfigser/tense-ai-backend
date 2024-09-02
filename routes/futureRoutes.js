// routes/futureRoutes.js

const express = require('express');
const callGeminiAPI = require('../utils/geminiAPI');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { vision } = req.body;
        const data = { prompt: vision };
        const possibilities = await callGeminiAPI(data);
        res.json(possibilities);
    } catch (error) {
        console.error('Error exploring future possibilities:', error.message);
        res.status(500).json({ error: 'Failed to explore future possibilities' });
    }
});

module.exports = router;
