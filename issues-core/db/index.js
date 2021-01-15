const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './issuesManager.db',
  logging: false,
});

module.exports = db;
