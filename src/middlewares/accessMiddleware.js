const { request } = require('express');


const accessMiddleware = (req, res, next) => {
    const userRole = req.userRole

    if (!userRole) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }
    try {
        // If userRole is admin
        if(userRole=="admin")
        {
        req.userId = decoded.id;
        next();
        }
        else
        {
            res.redirect("/tasks/todo")
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid userRole' });
    }
};
module.exports = accessMiddleware