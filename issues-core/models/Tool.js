const S = require('sequelize');
const db = require('../db');

class Tool extends S.Model {}
Tool.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
      unique: true,
    },
  }, { sequelize: db, modelName: 'tool' },
);

module.exports = Tool;
