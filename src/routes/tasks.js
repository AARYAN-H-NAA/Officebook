const express = require('express');
const { json } = require('body-parser');
const router = express.Router();

const Task = require('../models/todo');
const {authMiddleware} = require('../middlewares/authMiddleware')
const todoController = require('../controllers/todoController')

router
    // Get all tasks of user
    .get('/todo', authMiddleware, todoController.getTodo)
    // Add new task
    .post('/todo', authMiddleware, todoController.postTodo)
    // delete a task
    .delete('/delete-task', authMiddleware, todoController.deleteTask)
    // get edit task page
    .get("/edit-task/:id", authMiddleware, todoController.getEditTaskId)
    // post edit task
    .put('/edit-task/:id', authMiddleware, todoController.putEditTask);
    
    
module.exports = router;
