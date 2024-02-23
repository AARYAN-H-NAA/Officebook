const routes = require('express').Router();

// Import route modules
const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');
const adminRoutes = require('./src/routes/admin');

// Register routes
routes.use("/auth", authRoutes);
routes.use('/tasks', taskRoutes);
routes.use('/admin', adminRoutes);

module.exports = routes;
