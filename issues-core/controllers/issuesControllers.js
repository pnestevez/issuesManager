const { Issue, Vote, Tool } = require('../models');

// Serves all issues
const getIssues = (_req, res, next) => {
  Issue.findAll({
    include: Tool,
    order: [
      ['createdAt', 'DESC'],
    ],
  })
    .then((data) => res.send(data))
    .catch(next);
};
// Serves top ten pending priorities
const getPriorities = (_req, res, next) => {
  Issue.findAll({
    include: Tool,
    where: {
      status: 'pending',
    },
    order: [
      ['votes', 'DESC'],
    ],
    limit: 10,
  })
    .then((data) => res.send(data))
    .catch(next);
};

// Serves an issue by Pk
const getIssue = (req, res, next) => {
  Issue.findByPk(req.params.id, {
    include: Tool,
  })
    .then((data) => (data
      ? res.send(data)
      : res.status(404).send({ message: 'Not found' })))
    .catch(next);
};
// Adds an issue
const addIssue = (req, res, next) => {
  Issue.create(req.body)
    .then((data) => res.status(201).send(data))
    .catch(next);
};
// Updates an issue by Pk
const updateIssue = (req, res, next) => {
  Issue.findByPk(req.params.id)
    .then((issue) => (issue
      ? issue.update(req.body).then((data) => res.send(data))
      : res.status(404).send({ message: 'Not found' })))
    .catch(next);
};
// Deletes an issue
const removeIssue = (req, res, next) => {
  Issue.findByPk(req.params.id)
    .then(issue => {
      if (issue) {
        issue.author === req.body.author
          ? issue.destroy().then((data) => res.send(data))
          : res.status(401).send({ message: 'Unauthorized' });
      } else {
        res.status(404).send({ message: 'Not found' });
      }
    })
    .catch(next);
};

// Vote
const vote = (req, res, next) => {
  Vote.findOne({
    where: {
      issueId: req.params.id,
      author: req.body.author,
    },
  })
    .then(alreadyCreated => {
      alreadyCreated
        ? res.status(409).send({ message: 'Conflict' })
        : Issue.findByPk(req.params.id)
          .then((issue) => {
            Vote.create({
              issueId: issue.id,
              author: req.body.author,
            })
              .then((data) => {
                data && issue.vote();
                res.status(201).send({ message: 'Created' });
              });
          });
    })
    .catch(next);
};
// Cancel vote
const cancelVote = (req, res, next) => {
  Issue.findByPk(req.params.id)
    .then((issue) => {
      Vote.destroy({
        where: {
          issueId: issue.id,
          author: req.body.author,
        },
      })
        .then((data) => {
          data && issue.cancelVote();
          res.status(200).send({ message: 'OK' });
        });
    })
    .catch(next);
};

module.exports = {
  getIssues,
  getPriorities,
  getIssue,
  addIssue,
  updateIssue,
  removeIssue,
  vote,
  cancelVote,
};
