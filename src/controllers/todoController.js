const mongoose = require('mongoose');
const Task = require('../models/todo');

exports.handleTaskRequest = async (req, res) => {
    const userId = req.userId;

    try {
        if (req.method === 'GET' && req.path === '/tasks/todo') {
            // Get all tasks
            const tasks = await Task.find({ userId }).exec();
            const tasksArray = Array.isArray(tasks) ? tasks : [tasks];
            res.render('todo', { task: tasksArray });
        } else if (req.method === 'POST' && req.path === '/tasks/todo') {
            // Add new task
            const newTask = new Task({ task: req.body.tasks, userId });
            await newTask.save();
            res.redirect(req.originalUrl);
        } else if (req.method === 'DELETE' && req.path === '/tasks/todo/delete-task') {
            // Delete task
            const taskId = req.body.taskId;
            await Task.findByIdAndDelete(taskId);
            res.redirect('/tasks/todo');
        } else if (req.method === 'GET' && req.path.startsWith('/tasks/todo/edit-task/')) {
            // Get edit task page
            const taskId = req.path.split('/').pop();
            const task = await Task.findById(taskId).exec();
            res.render('task', { task });
        } else if (req.method === 'POST' && req.path.startsWith('/tasks/todo/edit-task/')) {
            // Edit task
            const taskId = req.path.split('/').pop();
            const updatedTask = req.body.updatedTask;
            await Task.findOneAndUpdate({ _id: taskId }, { task: updatedTask });
            res.redirect('/tasks/todo');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
