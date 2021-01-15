const S = require('sequelize');
const db = require('../db');

class Vote extends S.Model {}
Vote.init(
  {
    author: {
      type: S.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  }, { sequelize: db, modelName: 'vote' },
);

module.exports = Vote;
