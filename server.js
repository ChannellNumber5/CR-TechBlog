const path = require('path');
const express = require('express');
const session = require('express-session'); //allows for application to use cookies to track user sessions and will create a session table in your db
const exphbars = require('express-handlebars'); //needed to use handlebards for our view in the MCV application development concept
const routes = require('./controllers'); //connects to controllers index.js, to follow the controllers part of the MCV development concept
const Auth = require('./utils/auth');

const sequelize = require('./config/connection'); //establishes the connection to the database through the connection.js

const SequelizeStore = require('connect-session-sequelize')(session.Store) // creates a new instance of sequelize store

const app = express(); //creates a new instance of the express application
const PORT = process.env.PORT || 3001;

const hbars = exphbars.create({Auth}); // according to the documentation, this creates a new environment for the handlebars framework to exist in, but we have no helpers to export in

//creates new express session object, where the secret key is defined in the environment variables, the cookie defaults are overridden, the cookies do not resave, but any session is saved automatically, and any session inforamtion is stored in the new sequelize database created
const sesh = {
    secret: process.env.SESS_SECRET,
    cookie:{},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sesh));

//sets handlebars as the express view engine
app.engine('handlebars', hbars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public'))); // serves out public static files


app.use(routes); //uses the controller to handle routes and requests to routes

//syncs all sequelize models in the database, without overwriting them, and then starts up the server
sequelize.sync({ force:false }).then(() => {
    app.listen(PORT, 'localhost', () => {
        console.log(`The server is listening at Port: ${PORT}`);
    });
});



