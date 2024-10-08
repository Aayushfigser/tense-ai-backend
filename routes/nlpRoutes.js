const express = require('express');
const { classifyIntent, analyzeSentiment, analyzeTone } = require('../controllers/nlpController');

const router = express.Router();

router.post('/intent', classifyIntent);
router.post('/sentiment', analyzeSentiment);
router.post('/tone', analyzeTone);

module.exports = router;
