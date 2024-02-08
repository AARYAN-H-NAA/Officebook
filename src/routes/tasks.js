const express = require('express');
const { json } = require('body-parser');
const router = express.Router();

const Task = require('../models/todo');
const {authMiddleware} = require('../middlewares/authMiddleware')
const todoController = require('../controllers/todoController')

router.get('/todo',authMiddleware,todoController.getTodo );
router.post('/todo',authMiddleware, todoController.postTodo);
router.post('/delete-task',authMiddleware, todoController.deleteTask);
router.get("/edit-task/:id",authMiddleware, todoController.getEditTasks)
router.post('/edit-task/:id',authMiddleware, todoController.postEditTask);

module.exports = router;
