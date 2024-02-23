const mongoose = require('mongoose');

const Task = require('../models/todo')

const todoController = {
  // Get all Todo of logged in user
  getTodo: async (req, res, next)=>{
    const userId = req.userId;
    try {
      const tasks = await Task.find({ userId }).exec();
      const tasksArray = Array.isArray(tasks) ? tasks : [tasks]; // Ensure tasks is an array
      res.render('todo', { task: tasksArray });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
// Post a new todo for the logged in user
  postTodo: async (req, res)=> {
    const userId = req.userId;
    try {
      const newTask = new Task({ task: req.body.tasks, userId: userId });
      await newTask.save();
      res.redirect(req.originalUrl);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
// Delete a specific clicked task of loged in user
  deleteTask:async (req, res)=>{
    try {
      const taskId = req.body.taskId;

      // Use Mongoose to find and delete the task by its ID
      await Task.findByIdAndDelete(taskId);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/tasks/todo');
  },

  //populate date in edit page of a specific clicked task of logged in user
  getEditTaskId: async (req, res)=>{
    try {
      const taskId = req.params.id;
      const task = await Task.findById(taskId).exec();
      res.render('task', { task });

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
// take values that user esites in edit page and repalace it with original values
  putEditTask: async(req, res)=>{
    try {
      const taskId = req.params.id;
      const updatedTask = req.body.updatedTask;

      // Use Mongoose to find and delete the task by its ID
      await Task.findOneAndUpdate({ _id: taskId }, { task: updatedTask });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/tasks/todo');
  }
};

module.exports= todoController
