const express = require('express');

const router = express.Router();
const {
  getTools,
  addTool,
  getTool,
  updateTool,
  removeTool,
} = require('../controllers/toolsControllers');

router.get('/', getTools);
router.post('/', /* userValidation, */ addTool);
router.get('/:id', getTool);
router.put('/:id', /* userValidation, */ updateTool);
router.delete('/:id', /* userValidation, */ removeTool);

module.exports = router;
