// Import required modules
const router = require('express').Router();
const adminController = require('../controllers/adminController'); 
const accessMiddleware  = require('../middlewares/accessMiddleware'); 
const authMiddleware = require('../middleware/authMiddeware')
// Define routes
router
    .get('/tasks', authMiddleware, accessMiddleware ,  adminController.getUsers)
    .get('/edit-user/:id',authMiddleware, accessMiddleware , adminController.getEditUser)
    .post('/edit-user/:id',  authMiddleware,accessMiddleware , adminController.postEditUser)
    .get('/allTasks/:id',  authMiddleware,accessMiddleware , adminController.getAlltasks)
    .post('/delete-user',  authMiddleware,accessMiddleware , adminController.postDeleteUser)
    .post('/delete-task',  authMiddleware,accessMiddleware , adminController.postDeleteTask)
    .get('/edit-task/:id',  authMiddleware,accessMiddleware , adminController.getEditTask)
    .post('/edit-task/:id',  authMiddleware,accessMiddleware , adminController.postEditTask);

module.exports = router; // Export the router for use in other files
office