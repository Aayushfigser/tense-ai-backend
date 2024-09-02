// routes/api.js
const express = require('express');
const router = express.Router();
const { getPastData, getPresentData, getFutureData, geminiApi, chatgptApi } = require('../controllers/apiController');

router.get('/past', getPastData);
router.get('/present', getPresentData);
router.get('/future', getFutureData);
router.get('/gemini', geminiApi);
router.get('/chatgpt', chatgptApi);

module.exports = router;

