
const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const Task = require('../models/todo');

const {adminauthMiddleware} = require('../middlewares/authMiddleware')

const adminController = require('../controllers/adminController')


router.get('/tasks',adminauthMiddleware,adminController.getUsers );

router.get("/edit-user/:id",adminauthMiddleware, adminController.getEditUser)
  
  
  
router.post('/edit-user/:id',adminauthMiddleware, adminController.postEditUser);


router.get("/allTasks/:id",adminauthMiddleware, adminController.getAlltasks)
router.post("/delete-user" , adminauthMiddleware,adminController.postDeleteUser)

router.post('/delete-task',adminauthMiddleware, adminController.postDeleteTask);

router.get("/edit-task/:id",adminauthMiddleware, adminController.getEditTask)



router.post('/edit-task/:id',adminauthMiddleware, adminController.postEditTask);


module.exports = router;
