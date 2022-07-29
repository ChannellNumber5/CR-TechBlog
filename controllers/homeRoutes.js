const { router } = require("express").Router();
const { User, Post, Comment } = require('../models');
const Authenticated = require('../utils/auth');

//homePage shows all Posts posted on the blog from all users
router.get('/homePage', Authenticated, async (req, res) => {
    try {
        const posts = await Post.findAll();
        if(!posts) {
            res.json({message: "No Posts Found."})
            .render('homePage');
        }

        const plainPosts = posts.map((posts) => posts.get({ plain:true }));
        res.render('homePage', { plainPosts});
    } catch (err) {
        res.status(500).json({message: 'Error loading posts'})
        .render('homePage');
    }
});

//dashboard shows user's page and their specific posts
router.get('/dashboard', Authenticated, async (req, res) => {
    try {
        const posts = await Post.findAll({ where: {userId: req.session.userId}});
        if(!posts) {
            res.json ({message: "No Posts Found."})
            .render('dashboard');
        }

        const plainPosts = posts.map((posts) => posts.get({ plain:true }));
        res.render('dashboard', { plainPosts});
    } catch (err) {
        res.status(500).json({message: 'Error loading posts'})
        .render('dashboard');
    }
});

//postPage shows the specific page for each post and associated comments with post. Users can also add comments to posts from this page
router.get('/postPage');
