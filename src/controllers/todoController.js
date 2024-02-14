const Task = require('../models/todo');

const todoController = {
    async getTodo(req, res, next) {
        try {
            const userId = req.userId;
            const tasks = await Task.find({ userId }).exec();
            res.render('todo', { task: Array.isArray(tasks) ? tasks : [tasks] });
        } catch (error) {
            handleError(res, error);
        }
    },

    async postTodo(req, res) {
        try {
            const userId = req.userId;
            await new Task({ task: req.body.tasks, userId }).save();
            res.redirect(req.originalUrl);
        } catch (error) {
            handleError(res, error);
        }
    },

    async deleteTask(req, res) {
        try {
            await Task.findByIdAndDelete(req.body.taskId);
        } catch (error) {
            handleError(res, error);
        }
        res.redirect('/tasks/todo');
    },

    async getEditTasks(req, res) {
        try {
            const task = await Task.findById(req.params.id).exec();
            res.render('task', { task });
        } catch (error) {
            handleError(res, error);
        }
    },

    async postEditTask(req, res) {
        try {
            await Task.findOneAndUpdate({ _id: req.params.id }, { task: req.body.updatedTask });
        } catch (error) {
            handleError(res, error);
        }
        res.redirect('/tasks/todo');
    }
};

function handleError(res, error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}

module.exports = todoController;
