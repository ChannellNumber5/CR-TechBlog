const Sequelize = require('sequelize');
require('dotenv').config(); //sets up connection with .env file to set environment variables

let sequelize;

//this block of code will run JawsDB, as the server, if this application is hosted on Heroku. If the application is run on localhost it will use the database that we've created
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host:'localhost',
            dialect:'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize;