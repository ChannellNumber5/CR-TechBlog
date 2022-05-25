const path = require('path');
const express = require('express');
const session = require('express-session'); //allows for application to use cookies to track user sessions and will create a session table in your db
const exphbars = require('express-handlebars'); //needed to use handlebards for our view in the MCV application development concept
const routes = require('./controllers'); //connects to controllers index.js, to follow the controllers part of the MCV development concept


const sequelize = require('./config/connection'); //establishes the connection to the database through the connection.js



const PORT = process.env.PORT || 3001;



router.listen(PORT, 'localhost', () => {
    console.log(`The server is listening at Port: ${PORT}`);
})
