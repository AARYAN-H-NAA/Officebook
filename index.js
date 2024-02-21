// index.js
const path = require('path')
const express = require('express');
const dbController = require('./src/database/dbController');
const routes = require('../routes/mainRoutes')
const app = express();
dbController();

app
// Set view engine and views directory
  .set('views', path.join(__dirname, 'src', 'views'))
  .set('view engine', 'ejs')
// Parse URL-encoded bodies
  .use(express.json())
  .use('/', routes);



