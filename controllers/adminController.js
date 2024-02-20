const User = require('../models/user');
const Task = require('../models/todo');

const adminController = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.render('admin', { users });
        } catch (error) {
            handleError(res, error);
        }
    },

    async getEditUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            res.render('adminUpdate', { user });
        } catch (error) {
            handleError(res, error);
        }
    },

    async postEditUser(req, res) {
        try {
            await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        } catch (error) {
            handleError(res, error);
        }
        res.redirect('/admin/tasks');
    },

    async postDeleteUser(req, res) {
        try {
            await User.findByIdAndDelete(req.body.user_id);
        } catch (error) {
            handleError(res, error);
        }
        res.redirect('/admin/tasks');
    },

    async getAlltasks(req, res) {
        try {
            const tasks = await Task.find({ userId: req.params.id });
            res.render('userTasks', { tasks, userId: req.params.id });
        } catch (error) {
            handleError(res, error);
        }
    },

    async postDeleteTask(req, res) {
        try {
            await Task.findByIdAndDelete(req.body.taskId);
        } catch (error) {
            handleError(res, error);
        }
        res.redirect(`/admin/allTasks/:${req.body.userId}`);
    },

    async getEditTask(req, res) {
        try {
            const task = await Task.findById(req.params.id);
            res.render('updateUserTasks', { task });
        } catch (error) {
            handleError(res, error);
        }
    },

    async postEditTask(req, res) {
        try {
            await Task.findByIdAndUpdate(req.params.id, { task: req.body.updatedTask });
        } catch (error) {
            handleError(res, error);
        }
        res.redirect(req.get('referer'));
    }
};

module.exports = adminController;

function handleError(res, error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}

