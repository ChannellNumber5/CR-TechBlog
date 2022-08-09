//moment of learning... when you're using a "controller" for the routes, this index.js file uses express router, instead of just express
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

//put all routes under api directory
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;