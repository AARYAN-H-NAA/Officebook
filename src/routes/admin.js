// Import required modules
const express = require('express');
const router = express.Router(); 
const adminController = require('../controllers/adminController'); 
const authMiddleware  = require('../middlewares/authMiddleware'); 
const accessMiddleware  = require('../middlewares/accessMiddleware'); 

// Define routes
router
    .get('/tasks', authMiddleware,accessMiddleware, adminController.getUsers)
    .get('/edit-user/:id', authMiddleware,accessMiddleware, adminController.getEditUserByID)
    .post('/edit-user/:id', authMiddleware,accessMiddleware, adminController.putEditUser)
    .get('/allTasks/:id', authMiddleware,accessMiddleware, adminController.getAllTasks)
    .post('/delete-user', authMiddleware,accessMiddleware, adminController.deleteUser)
    .post('/delete-task', authMiddleware,accessMiddleware, adminController.deleteTask)
    .get('/edit-task/:id', authMiddleware,accessMiddleware, adminController.getEditTaskById)
    .post('/edit-task/:id', authMiddleware,accessMiddleware, adminController.putEditTask);

module.exports = router; // Export the router for use in other files

