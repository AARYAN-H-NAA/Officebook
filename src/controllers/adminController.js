const User = require('../models/user');
const Task = require('../models/todo');

const adminController = {
    async getUsers(req, res) {
        try {
            const tasks = await databaseOperation('findItems', User.find()); 
            res.render('admin', { user: Array.isArray(tasks) ? tasks : [tasks] }); 
        } catch (error) {
            handleError(res, error);
        }
    },

    async getEditUser(req, res) {
        try {
            const user = await databaseOperation('findItemById', User.findById(req.params.id)); 
            res.render('adminUpdate', { user }); 
        } catch (error) {
            handleError(res, error);
        }
    },

    async postEditUser(req, res) {
        try {
            await databaseOperation('updateUser', req.params.id, req.body.updatedUsername, req.body.updatedEmail, req.body.updatedRole); 
        } catch (error) {
            handleError(res, error);
        }
        res.redirect('/admin/tasks'); 
    },

    async postDeleteUser(req, res) {
        try {
            await databaseOperation('deleteUser', req.body.user_id); 
        } catch (error) {
            handleError(res, error);
        }
        res.redirect('/admin/tasks'); 
    },

    async getAlltasks(req, res) {
        try {
            const task = await databaseOperation('findItems', Task.find({ userId: req.params.id.replace(':', '') })); 
            res.render('userTasks', { task, userId: req.params.id }); 
        } catch (error) {
            handleError(res, error);
        }
    },

    async postDeleteTask(req, res) {
        try {
            await databaseOperation('deleteTask', req.body.taskId); 
            res.redirect(`/admin/allTasks/:${req.body.userId}`); 
        } catch (error) {
            handleError(res, error);
        }
    },

    async getEditTask(req, res) {
        try {
            const task = await databaseOperation('findItemById', Task.findById(req.params.id)); 
            res.render('updateUserTasks', { task }); 
        } catch (error) {
            handleError(res, error);
        }
    },

    async postEditTask(req, res) {
        try {
            await databaseOperation('updateTask', req.params.id, req.body.updatedTask); 
            res.redirect(req.get('referer')); 
        } catch (error) {
            handleError(res, error);
        }
    }
};

module.exports = adminController;

// Common functions

async function databaseOperation(operation, ...args) {
    try {
        switch (operation) {
            case 'findItems':
            case 'findItemById':
                return await args[0].exec();
            case 'updateUser':
                await User.findOneAndUpdate({ _id: args[0] }, { username: args[1], email: args[2], role: args[3] });
                break;
            case 'deleteUser':
                await User.findOneAndDelete({ _id: args[0] });
                break;
            case 'deleteTask':
                await Task.findByIdAndDelete(args[0]);
                break;
            case 'updateTask':
                await Task.findOneAndUpdate({ _id: args[0] }, { task: args[1] });
                break;
            default:
                throw new Error('Invalid operation');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}

function handleError(res, error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}
