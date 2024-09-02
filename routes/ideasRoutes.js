// routes/ideasRoutes.js
const express = require('express');
const callChatGPTAPI = require('../utils/chatgptAPI');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { ask } = req.body;
    const response = await callChatGPTAPI(ask);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get ideas from ChatGPT' });
  }
});

module.exports = router;
