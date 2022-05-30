//moment of learning... when you're using a "controller" for the routes, this index.js file uses express router, instead of just express
const router = require('express').Router();

// before completing the below, need to relearn difference between api routes and home routes.. intially, I want to stay api routes are for CRUD RESTful operations, while homeroutes are for displaying info for everyone to see

// const apiRoutes; or user routes?
// const homeRoutes; or the blog homepage/login page?

//need to determine what routes to use... what do I want the URL path to be?

//Maybe...
// router.use('/bloghome', homeRoutes);
// router.use('/users', apiRoutes)

module.exports = router;