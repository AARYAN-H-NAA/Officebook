const User = require('../models/user')
const Task = require('../models/todo')


exports.getUsers = async(req, res, next) => {
    const tasks = await User.find().exec();
    const tasksArray = Array.isArray(tasks) ? tasks : [tasks];
    res.render('admin',{ user: tasksArray });
}

exports.getEditUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId).exec();
      res.render('adminUpdate', { user });
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

exports.postEditUser = async (req, res) => {
    try 
    {
        const userId = req.params.id;
        const updatedUser = req.body.updatedUsername;
        const  userRole = req.body.updatedRole;
        const  userEmail = req.body.updatedEmail;
            console.log(userRole)


        // Use Mongoose to find and delete the task by its ID
        await User.findOneAndUpdate({_id : userId }, {username:updatedUser,email:userEmail ,role:userRole});
    } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
    }
    res.redirect('/admin/tasks');
}

exports.postDeleteUser = async (req,res) => {
    const userId = req.body.user_id;
    console.log(userId)
    await User.findOneAndDelete({_id:userId})
    res.redirect('/admin/tasks')
}

exports.getAlltasks = async (req, res) => {
    try {
        const userId = req.params.id.replace(':', ''); 
        const task = await Task.find({userId:userId}).exec();
        res.render('userTasks', { task , userId});
        
        } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
        }
}




exports.postDeleteTask = async (req, res) => {
    try {
      const taskId = req.body.taskId;
      const userId = req.body.userId
      // Use Mongoose to find and delete the task by its ID
      await Task.findByIdAndDelete(taskId);
      res.redirect(`/admin/allTasks/:${userId}`)
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    
  }


exports.getEditTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findById(taskId).exec();
      res.render('updateUserTasks', { task });
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

exports.postEditTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const updatedTask = req.body.updatedTask;
  
  
      // Use Mongoose to find and delete the task by its ID
      await Task.findOneAndUpdate({_id : taskId }, {task:updatedTask});
      const referer = req.get('referer') 
      res.redirect(referer);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    
  }