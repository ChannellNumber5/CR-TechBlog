//middleware used to check whether user is logged in. If so, the "next" parameter allows the application to move forward to the route that the user was trying to access.
const authenticated = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = authenticated;