const express = require('express');
const router = express.Router();
const { getUserPoints, updateUserPoints } = require('../controllers/gamificationController');

router.get('/points', getUserPoints);
router.post('/points', updateUserPoints);

module.exports = router;
