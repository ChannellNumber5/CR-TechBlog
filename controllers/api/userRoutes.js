const router = require('express').Router();
const { User } = require('../../models');

//when posting to /api/, it will create a new user, using the request body... request body will have to be structured based on User's defined model columns and the session variable will show that the user is logged in
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.userId = userData.isSoftDeleted;
            req.session.loggedIn = true;

            res.status(200).json(userData);
            });
        } catch (err) {
            res.status(400).json(err);
        }
    });

    //when accessing the login route, the input email address will be compared to current email addresses already stored in the databasea and then the input password will be compared to the hashed password, using the checkPassword method on user. If they are the same, the session is set for the specific user
    router.post('/login', async (req, res) => {
        try {
            const userData = await User.findOne({ where: { email: req.body.email} })

            if (!userData) {
                res
                .status(400)
                .json({message: 'Incorrect email or password, please try again' });
            return;
            }

            const validPass = await userData.checkPassword(req.body.password);

            if(!validPass) {
                res
                .status(400)
                .json({message: 'Incorrect email or password, please try again' });
                return;
            }

            req.session.save(() => {
                req.session.userId = userData.id;
                req.session.loggedIn = true;

                res.json({ user: userData, message: 'You have successfully logged in!'});
            });
        } catch (err) {
            res.status(400).json(err)
        }
    });

    // if the user is logged in, the log out route will destroy the session and then send a 
    router.post('/logout', (req, res) => {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end(); //204 status code means there's no content, which makes sense because the user has been logged out
            });
        } else {
            res.status(404).end();
        }
    });

    module.exports = router;