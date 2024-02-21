// Import required modules
const express = require('express');
const router = express.Router(); 
const adminController = require('../controllers/adminController'); 
const  authMiddleware  = require('../middleware/authMiddleware'); 
const acessMiddleware = require('../middleware/acessMiddleware')
// Define routes
router
    .get('/tasks', authMiddleware,acessMiddleware, adminController.getUsers)
    .get('/edit-user/:id', authMiddleware,acessMiddleware, adminController.getEditTaskById)
    .put('/edit-user/:id', authMiddleware,acessMiddleware, adminController.putEditUser)
    .get('/allTasks/:id', authMiddleware,acessMiddleware, adminController.getAllTasks)
    .delete('/delete-user', authMiddleware,acessMiddleware, adminController.deleteUser)
    .post('/delete-task', authMiddleware,acessMiddleware, adminController.deleteTask)
    .get('/edit-task/:id', authMiddleware,acessMiddleware, adminController.getEditTaskById)
    .put('/edit-task/:id', authMiddleware,acessMiddleware, adminController.putEditTask);

module.exports = router; // Export the router for use in other files

