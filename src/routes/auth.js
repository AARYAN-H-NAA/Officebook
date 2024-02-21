// routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authController = require('../controllers/authController');

router
    // Register
    .get('/register', authController.getRegister)
    .post('/register', authController.postRegister)

    // Login
    .get('/login', authController.getLogin)
    .post('/login', authController.postLogin)

    //Logout
    .post('/logout', authController.postLogout);
    

module.exports = router;
