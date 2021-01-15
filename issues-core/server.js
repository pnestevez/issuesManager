const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;
const routes = require('./routes');

// Cors middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['set-cookie'],
}));

// Bodyparsing middleware
app.use(express.json());

// Router middleware
app.use('/', routes);
app.use((_req, res) => res.status(404).send());

// Error handler endware
app.use((err, _req, res) => {
  res.status(500).send(err);
});

const server = app.listen(port, () => console.log(`Issues Core REST API listening on port: ${port}`));
module.exports = server;
