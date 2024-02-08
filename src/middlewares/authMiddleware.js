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
        const decoded = jwt.verify(token, 'MY_SECRET_KEY');

        if(decoded.role=="user")
        {
        req.userId = decoded.id;
        next();
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
};



const adminauthMiddleware = (req, res, next) => {
    cookieParser()(req, res, () => {});
    
    
    
    // Extract token from cookies
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, 'MY_SECRET_KEY');
        
        // If userRole is admin
        if(decoded.role=="admin")
        {
        req.userId = decoded.id;
        next();
        }

        // Elseif userRole is user


        else
        {
            res.redirect("/tasks/todo")
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports ={adminauthMiddleware,authMiddleware}

