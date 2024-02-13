// routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { register, login, logout } = require('../controllers/authController');

router
    // Register
    .get('/register', (req, res, next) => {
        res.render('authRegister');
    })
    .post('/register', register)

    // Login
    .get('/login', (req, res, next) => {
        res.render('authLogin');
    })
    .post('/login', login)

    //Logout
    .post('/logout', logout);

module.exports = router;
