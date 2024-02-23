const User = require('../models/user');
const Task = require('../models/todo');

const adminController = {
    // Get All Users
    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.render('admin', { users });
        } catch (error) {
            adminController.handleError(res, error);
        }
    },

    //Edit user by Id and render edit page
    getEditUserByID: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.render('adminUpdate', { user });
        } catch (error) {
            adminController.handleError(res, error);
        }
    },

    // Edit user
    putEditUser: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        } catch (error) {
            adminController.handleError(res, error);
        }
        res.redirect('/admin/tasks');
    },

    // Delete User
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.body.user_id);
            await Task.deleteMany({userId:req.body.user_id})
        } catch (error) {
            adminController.handleError(res, error);
        }
        res.redirect('/admin/tasks');
    },

// Get All task of a specific user
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.find({ userId: req.params.id });
            res.render('userTasks', { tasks, userId: req.params.id });
        } catch (error) {
            adminController.handleError(res, error);
        }
    },

    // delete Task
    deleteTask: async (req, res) => {
        try {
            await Task.findByIdAndDelete(req.body.taskId);
        } catch (error) {
            adminController.handleError(res, error);
        }
        res.redirect(`/admin/allTasks/:${req.body.userId}`);
    },

    // Get task id and open edit task of that task id
    getEditTaskById: async (req, res) => {
        try {
            const task = await Task.findById(req.params.id);
            res.render('updateUserTasks', { task });
        } catch (error) {
            adminController.handleError(res, error);
        }
    },

    // Edit task
    putEditTask: async (req, res) => {
        try {
            await Task.findByIdAndUpdate(req.params.id, { task: req.body.updatedTask });
        } catch (error) {
            adminController.handleError(res, error);
        }
        res.redirect(req.get('referer'));
    },

    // Error Handdle
    handleError: (res, error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = adminController;
