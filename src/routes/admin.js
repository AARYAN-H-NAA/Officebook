// Import required modules
const express = require('express');
const router = express.Router(); 
const adminController = require('../controllers/adminController'); 
const { adminauthMiddleware } = require('../middlewares/authMiddleware'); 

// Define routes
router
    .get('/tasks', adminauthMiddleware, adminController.getUsers)
    .get('/edit-user/:id', adminauthMiddleware, adminController.getEditUserByID)
    .post('/edit-user/:id', adminauthMiddleware, adminController.putEditUser)
    .get('/allTasks/:id', adminauthMiddleware, adminController.getAllTasks)
    .post('/delete-user', adminauthMiddleware, adminController.deleteUser)
    .post('/delete-task', adminauthMiddleware, adminController.deleteTask)
    .get('/edit-task/:id', adminauthMiddleware, adminController.getEditTaskById)
    .post('/edit-task/:id', adminauthMiddleware, adminController.putEditTask);

module.exports = router; // Export the router for use in other files

