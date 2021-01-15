const { Tool, Issue } = require('../models');

// Serves all tools
const getTools = (_req, res, next) => {
  Tool.findAll()
    .then((data) => res.send(data))
    .catch(next);
};

// Adds a tool
const addTool = (req, res, next) => {
  Tool.create(req.body)
    .then((data) => res.status(201).send(data))
    .catch(next);
};
// Serves a tool
const getTool = (req, res, next) => {
  Tool.findByPk(req.params.id)
    .then((data) => (data
      ? res.send(data)
      : res.status(404).send({ message: 'Not found' })))
    .catch(next);
};
// Updates a tool
const updateTool = (req, res, next) => {
  Tool.findByPk(req.params.id)
    .then((tool) => (tool
      ? tool.update(req.body).then((data) => res.send(data))
      : res.status(404).send({ message: 'Not found' })))
    .catch(next);
};
// Deletes a tool
const removeTool = (req, res, next) => {
  Tool.findByPk(req.params.id)
    .then((tool) => (tool
      ? tool.destroy()
        .then((data) => {
          Issue.destroy({
            where: {
              toolId: data.id,
            },
          });
        })
        .then(() => res.status(200).send({ message: 'OK' }))
      : res.status(404).send({ message: 'Not found' })))
    .catch(next);
  // : res.status(401).send({message: 'Unauthorized'})
};

module.exports = {
  getTools,
  addTool,
  getTool,
  updateTool,
  removeTool,
};
