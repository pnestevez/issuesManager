const { Vote } = require('../models');

// Serves votes by query
const getVotes = (req, res, next) => {
  Vote.findAll({
    where: {
      author: req.query.author,
    },
  })
    .then((data) => res.send(data))
    .catch(next);
};

module.exports = { getVotes };
