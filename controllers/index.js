//moment of learning... when you're using a "controller" for the routes, this index.js file uses express router, instead of just express
const router = require('express').Router();
const apiRoutes = require('./api');

//put all routes under api directory
router.use('/api', apiRoutes);

module.exports = router;