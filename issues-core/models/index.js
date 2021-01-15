const Issue = require('./Issue');
const Tool = require('./Tool');
const Vote = require('./Vote');

Vote.belongsTo(Issue);
Issue.belongsTo(Tool);

module.exports = {
  Tool,
  Issue,
  Vote,
};
