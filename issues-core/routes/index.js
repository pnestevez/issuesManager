const express = require('express');

const router = express.Router();
const toolsRouter = require('./toolsRouter');
const issuesRouter = require('./issuesRouter');
const votesRouter = require('./votesRouter');

router.use('/tools', toolsRouter);
router.use('/issues', issuesRouter);
router.use('/votes', votesRouter);

module.exports = router;
