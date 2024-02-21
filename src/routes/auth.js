// routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authController = require('../controllers/authController');

router
    // Register
    .get('/register', authController.getRegister)
    .post('/register', authController.register)

    // Login
    .get('/login', authController.getLogin)
    .post('/login', authController.login)

    //Logout
    .post('/logout', authController.logout);
    

module.exports = router;
