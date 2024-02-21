const routes = require('express').Router();

// Import route modules
const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');
const adminRoutes = require('./src/routes/admin');

// Register routes
routes
    .use("/auth", authRoutes)
    .use('/tasks', taskRoutes)
    .use('/admin', adminRoutes)
    .use('/', (req, res) => {
        res.send('<button type="submit"><a href="/auth/register">Register</a></button><button type="submit"><a href="/auth/login">Login</a></button>');
      })
module.exports = routes;
