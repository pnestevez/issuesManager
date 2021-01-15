const express = require('express');

const router = express.Router();
const { getVotes } = require('../controllers/votesControllers');

router.get('/', getVotes);

module.exports = router;
