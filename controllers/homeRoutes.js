const router = require("express").Router();
const { User, Post, Comment } = require('../models');
const Authenticated = require('../utils/auth');

//homePage shows all Posts posted on the blog from all users
router.get('/', Authenticated, async (req, res) => {
    try {
        const logged_in = req.session.logged_in;
        const allPosts = await Post.findAll();
        if(!allPosts) {
            res.json({message: "No Posts Found."})
            .render('homePage');
        }

        const plainPosts = allPosts.map((posts) => posts.get({ plain:true }));
        res.render('homePage', { plainPosts, logged_in});
    } catch (err) {
        res.status(500).json({message: 'Error loading posts'})
        .render('homePage');
    }
});

//dashboard shows user's page and their specific posts
router.get('/dashboard', Authenticated, async (req, res) => {
    try {
        const logged_in = req.session.logged_in;
        const posts = await Post.findAll({ 
            where: {userId: req.session.userId},
            include: [
                {
                    model:Comment,
                    attributes:['id','userId','dateCreated', 'content']
                },
            ]
        });
        if(!posts) {
            res.json ({message: "No Posts Found."})
            .render('dashboard', {logged_in});
        }

        const plainPosts = posts.map((posts) => posts.get({ plain:true }));
        res.render('dashboard', { plainPosts});
    } catch (err) {
        res.status(500).json({message: 'Error loading posts'})
        .render('dashboard');
    }
});

//postPage shows the specific page for each post and associated comments with post. Users can also add comments to posts from this page
router.get('/postPage/:postId', Authenticated, async (req, res) => {
    try {
        const logged_in = req.session.logged_in;
        const postData = await Post.findOne({
            where: {
                id: req.params.postId
            },
            include: [
                {
                    model:Comment,
                    attributes:['id','userId','dateCreated', 'content']
                },
            ]
        });

        const commentData = await Comment.findAll({where:{postId: req.params.postId}});

        if(!postData) {
            res.json ({message: "No Posts Found."})
            .render('postPage');
        }

        const post = postData.map((posts) => postData.get({ plain:true }));
        console.log(post);

        if(!commentData) {
            res.json({message: "No comments Found."})
            .render('postPage', {postData, logged_in})
        }
        const comment = commentData.map((comments) => commentData.get({plain:true}));
        console.log(comment);

        res.render('postPage', { post, comment, logged_in});

    } catch (err) {
        res.status(500).json({message: 'Error loading post'})
        .render('postPage');
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    const logged_in = req.session.logged_in;
    if (logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup', logged_in);
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end(); //204 status code means there's no content, which makes sense because the user has been logged out
        });
    } else {
        res.status(404).end();
    }
});


router.get('/createPost', Authenticated, (req, res) => {
    const logged_in = req.session.logged_in;
    res.render('createPost', {logged_in});
});

router.get('/updatePost/:postId', Authenticated, async (req, res) => {
    try {
        const logged_in = req.session.logged_in;
        const post = await findOne({where: {_id: req.params.postId}});

        if(!post) {
            res.status(400).json({message: "post could not be rendered"})
        }
        const postData = post.map((posts) => post.get({plain:true}));

        res.render('/updatePost', {postData, logged_in});
    } catch(err) {
        res.status(400).json({message: err});
    }
});


module.exports = router;