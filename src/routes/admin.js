// Import required modules
const express = require('express');
const router = express.Router(); 
const adminController = require('../controllers/adminController'); 
const { adminauthMiddleware } = require('../middlewares/authMiddleware'); 

// Define routes
router
    .get('/tasks', adminauthMiddleware, adminController.getUsers)
    .get('/edit-user/:id', adminauthMiddleware, adminController.getEditUser)
    .post('/edit-user/:id', adminauthMiddleware, adminController.postEditUser)
    .get('/allTasks/:id', adminauthMiddleware, adminController.getAlltasks)
    .post('/delete-user', adminauthMiddleware, adminController.postDeleteUser)
    .post('/delete-task', adminauthMiddleware, adminController.postDeleteTask)
    .get('/edit-task/:id', adminauthMiddleware, adminController.getEditTask)
    .post('/edit-task/:id', adminauthMiddleware, adminController.postEditTask);

module.exports = router; // Export the router for use in other files
office