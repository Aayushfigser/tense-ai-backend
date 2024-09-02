const express = require('express');
const router = express.Router();
const checkSubscription = require('../middleware/checkSubscription');
const { getPremiumFeature } = require('../controllers/premiumController');

router.get('/premium-feature', checkSubscription, getPremiumFeature);

module.exports = router;
