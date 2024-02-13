const User = require('../models/user');
const Task = require('../models/todo');

const adminController = {
    async getUsers(req, res) {
        try {
            const tasks = await findUsers(); 
            res.render('admin', { user: Array.isArray(tasks) ? tasks : [tasks] }); 
        } catch (error) {
            handleError(res, error);
        }
    },

    async getEditUser(req, res) {
        try {
            const user = await findUserById(req.params.id); 
            res.render('adminUpdate', { user }); 
        } catch (error) {
            handleError(res, error);
        }
    },

    async postEditUser(req, res) {
        try {
            await updateUser(req.params.id, req.body.updatedUsername, req.body.updatedEmail, req.body.updatedRole); 
        } catch (error) {
            handleError(res, error);
        }
        res.redirect('/admin/tasks'); 
    },

    async postDeleteUser(req, res) {
        try {
            await deleteUser(req.body.user_id); 
        } catch (error) {
            handleError(res, error);
        }
        res.redirect('/admin/tasks'); 
    },

    async getAlltasks(req, res) {
        try {
            const task = await findTasksByUserId(req.params.id.replace(':', '')); 
            res.render('userTasks', { task, userId: req.params.id }); 
        } catch (error) {
            handleError(res, error);
        }
    },

    async postDeleteTask(req, res) {
        try {
            await deleteTask(req.body.taskId); 
            res.redirect(`/admin/allTasks/:${req.body.userId}`); 
        } catch (error) {
            handleError(res, error);
        }
    },

    async getEditTask(req, res) {
        try {
            const task = await findTaskById(req.params.id); 
            res.render('updateUserTasks', { task }); 
        } catch (error) {
            handleError(res, error);
        }
    },

    async postEditTask(req, res) {
        try {
            await updateTask(req.params.id, req.body.updatedTask); 
            res.redirect(req.get('referer')); 
        } catch (error) {
            handleError(res, error);
        }
    }
};

module.exports = adminController;

// Common functions

async function findUsers() {
    return await User.find().exec();
}

async function findUserById(id) {
    return await User.findById(id).exec();
}

async function updateUser(id, updatedUsername, updatedEmail, updatedRole) {
    await User.findOneAndUpdate({ _id: id }, { username: updatedUsername, email: updatedEmail, role: updatedRole });
}

async function deleteUser(id) {
    await User.findOneAndDelete({ _id: id });
}

async function findTasksByUserId(userId) {
    return await Task.find({ userId }).exec();
}

async function deleteTask(id) {
    await Task.findByIdAndDelete(id);
}

async function findTaskById(id) {
    return await Task.findById(id).exec();
}

async function updateTask(id, updatedTask) {
    await Task.findOneAndUpdate({ _id : id }, { task: updatedTask });
}

function handleError(res, error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}
