const express = require('express');

const router = express.Router();
const {
  getIssues,
  getPriorities,
  addIssue,
  getIssue,
  updateIssue,
  removeIssue,
  vote,
  cancelVote,
} = require('../controllers/issuesControllers');

router.get('/', getIssues);
router.get('/priorities', getPriorities);
router.post('/', /* userValidation, */ addIssue);
router.get('/:id', getIssue);
router.put('/:id', /* userValidation, */ updateIssue);
router.delete('/:id', /* userValidation, */ removeIssue);
// Votes
router.post('/:id/vote', /* userValidation, */ vote);
router.delete('/:id/vote', /* userValidation, */ cancelVote);

module.exports = router;
