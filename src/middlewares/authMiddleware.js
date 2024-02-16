// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const cookieParser =require('cookie-parser');
const { request } = require('express');


const authMiddleware = (req, res, next) => {
    cookieParser()(req, res, () => {});
    // Extract token from cookies
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.jwtKey);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();

    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
};




module.exports ={authMiddleware}

