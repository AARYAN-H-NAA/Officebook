// index.js
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./src/routes/tasks');
const dbController = require('./database/dbController');
const authRoutes = require('./src/routes/auth');
const adminRoutes = require("./src/routes/admin")
const app = express();
dbController();
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 5000;

app.use("/auth", authRoutes);
app.use('/tasks',taskRoutes);
app.use('/admin',adminRoutes);
app.get('/', (req, res) => {
    res.send('<button type="submit"><a href="/auth/register">Register</a></button><button type="submit"><a href="/auth/login">Login</a></button>');
});

app.listen(PORT, () => {
    console.log(`Hi server is running at Port: ${PORT}`);
});
