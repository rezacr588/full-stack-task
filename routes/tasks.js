const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController'); // This will be your tasks controller file

router.post('/', tasksController.createTask);
router.put('/:id', tasksController.editTask);
router.delete('/:id', tasksController.deleteTask);
router.get('/', tasksController.listTasks);
router.delete('/', tasksController.deleteAlllTasks);
router.patch('/:id', tasksController.updateTask);

module.exports = router;