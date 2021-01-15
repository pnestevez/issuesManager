const S = require('sequelize');
const db = require('../db');

class Issue extends S.Model {}
Issue.init(
  {
    title: {
      type: S.STRING,
      allowNull: false,
    },
    description: {
      type: S.TEXT,
      allowNull: false,
    },
    type: {
      type: S.ENUM({
        values: ['feature', 'bug'],
      }),
      allowNull: false,
    },
    image: {
      type: S.TEXT,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    author: {
      type: S.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    votes: {
      type: S.INTEGER,
      validate: {
        min: 0,
      },
      defaultValue: 0,
      allowNull: false,
    },
    status: {
      type: S.ENUM({
        values: ['pending', 'rejected', 'queued', 'completed'],
      }),
      defaultValue: 'pending',
      allowNull: false,
    },
  }, { sequelize: db, modelName: 'issue' },
);

Issue.prototype.vote = function vote() {
  this.votes = this.getDataValue('votes') + 1;
  this.save();
};
Issue.prototype.cancelVote = function cancelVote() {
  if (this.votes) this.votes = this.getDataValue('votes') - 1;
  this.save();
};

module.exports = Issue;
