const express = require('express');
const routes = express.Router();

// Import route modules
const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');
const adminRoutes = require('./src/routes/admin');


routes
// Auth routes
    .use("/auth", authRoutes)
// Task Related Routes
    .use('/tasks', taskRoutes)
// Admin Related Routes
    .use('/admin', adminRoutes);

module.exports = routes;