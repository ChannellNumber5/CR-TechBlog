const { router } = require("express").Router();
const { User, Post, Comment } = require('../models');

//homePage shows all Posts posted on the blog from all users
router.get('/homePage');

//dashboard shows user's page and their specific posts
router.get('/dashboard');

//postPage shows the specific page for each post and associated comments with post. Users can also add comments to posts from this page
router.get('/postPage');
