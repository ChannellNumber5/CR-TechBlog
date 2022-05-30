# The Tech Blog

Check out this application [here](), deployed on Heroku!

Also, if you want to check out the Github repository, you can find it [here](https://github.com/ChannellNumber5/CR-TechBlog).

## Description

This Tech Blog is an express application that uses MySQL, Sequelize, and express session to allow the user to create and post their own blog posts on this community page. The user is able to create an account and can then create blog posts and then log in to see their created posts and add new ones. In addition to making posts, users are able to add comments to existing posts that are shown on the homepage.

On the front end, this application uses handlebars to modularize the code and client facing webpage designa and information.

## Installation

Since this application will be deployed on Heroku, there are no installation steps, just visit [this]() webpage.

## Usage

Once the user visits the homepage, they will automatically see any blogs that have been posted to the community on the main page. After setting up a new user account - or logging in - the user is directed to a page where they can see their existing blog posts and create new blog posts. The user is also able to add comments to posts on the main page, once they are logged in.

## Credits

This project is credited to the UW coding BootCamp for the idea, user story and acceptance criteria.

## License

This application currently does not have any licenses.

## Resources

- [Github branch issue resolution](https://stackoverflow.com/questions/65173291/git-push-error-src-refspec-main-does-not-match-any-on-linux) -- really the issue ended up being that I didn't do a "git add -A".... novice mistake...
- [MySQL Drop Database Command](https://www.mysqltutorial.org/mysql-drop-database/)
- [JAWSDB](https://www.jawsdb.com/docs/#mysql), needed to research why I needed the if statement in my connection.js file and what it meant to set `process.env.JAWSDB_URL` as one of the environment variables
- [Node Path module](https://nodejs.dev/learn/the-nodejs-path-module)
- [Connect-Session-Sequelize](https://www.npmjs.com/package/connect-session-sequelize)
- [express-session-sequelize](https://www.npmjs.com/package/express-session-sequelize)
- [View Engines](https://www.geeksforgeeks.org/how-to-setup-view-engine-in-node-js/) - quick skim to get a rough idea of view engines and what this line of code: `app.set('view engine', 'handlebars');` actually means
- [Session Management](https://handyman.dulare.com/session-management-in-express/) - an old article, but helpful for visualizing what happens in sessions
- [Timing Attacks](https://codahale.com/a-lesson-in-timing-attacks/) - an interesting read on timing attacks, when researching compare vs compareSync in bcrpyt
- []()
