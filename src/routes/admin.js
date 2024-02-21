// Import required modules
const express = require('express');
const router = express.Router(); 
const adminController = require('../controllers/adminController'); 
const  accessMiddleware  = require('../middlewares/accessMiddleware.js'); 
const authMiddleware = require('../middlewares/authMiddleware.js')
// Define routes
router
    .get('/tasks',authMiddleware, accessMiddleware, adminController.getUsers)
    .get('/edit-user/:id',authMiddleware, accessMiddleware, adminController.getEditUser)
    .post('/edit-user/:id',authMiddleware, accessMiddleware, adminController.postEditUser)
    .get('/allTasks/:id',authMiddleware, accessMiddleware, adminController.getAlltasks)
    .post('/delete-user',authMiddleware, accessMiddleware, adminController.postDeleteUser)
    .post('/delete-task',authMiddleware, accessMiddleware, adminController.postDeleteTask)
    .get('/edit-task/:id',authMiddleware, accessMiddleware, adminController.getEditTask)
    .post('/edit-task/:id',authMiddleware, accessMiddleware, adminController.postEditTask);

module.exports = router; // Export the router for use in other files

