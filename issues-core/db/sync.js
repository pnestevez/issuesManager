const db = require('.');

db.sync({ force: false })
  .then(() => console.log('DATABASE was successfully synchronized'));
