// routes/auth.js

const express = require('express');

const router = express.Router();

const jwt = require('jsonwebtoken');

const User = require('../models/user');



const {register , login , logout} = require('../controllers/authController')


router.get('/register', (req, res, next) => {
    res.render('authRegister');
});

router.get('/login', (req, res, next) => {
    res.render('authLogin');
});

// Registration
router.post('/register', register);

// Login
router.post('/login', login);

router.post('/logout', logout)

module.exports = router;
