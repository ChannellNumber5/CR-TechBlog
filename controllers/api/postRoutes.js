const router = require('express').Router();
const {Post, Comment} = require('../../models');
const authenticated  = require('../../utils/auth');

//what do I need:
//Get all posts - done
//Get single post and associated comments for that post - done
//Get all posts for single user -- done
//Update Post -- done
//Update comment on post?
//Create new post -- done
//Create new comment -- done
//Delete Post -- done
//Delete Comment?


//posts new blog post, but can only be accessed when user is logged in based on authenticated middleware
router.post('/', authenticated, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body, //spread operator used to merge object properties to create new post
            userId: req.session.userId, //sets the association between the current user logged in and the post that is being created.
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

//finds all posts and their associated comments
router.get('/', authenticated, async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: Comment,
                    attributes:['id','userId','dateCreated', 'content']
                }
            ],
        });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

//gets single post by it's id and it's associated comments
router.get('/:postId', authenticated, async (req, res) => {
    try {
        const queriedPost = await Post.findOne({
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

        res.status(200).json(queriedPost).render('/postPage', {queriedPost});
    } catch (err) {
        res.status(400).json(err);
    }
});

//gets all posts for single user and their associated comments
router.get('/:userId', authenticated, async (req, res) => {
    try {
        const queriedPost = await Post.findAll({
            where: {
                userId: req.params.userId
            },
            include: [
                {
                    model:Comment,
                    attributes:['id','userId','dateCreated', 'content']
                },
            ]
        });

        res.status(200).json(queriedPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

//gets single post by it's id and it's associated comments
router.put('/:postId', authenticated, async (req, res) => {
    try {
        const updatedPost = await Post.update({
            ...req.body
            },
            {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

//creates new comment with user's id who is currently logged in and posting the comment
router.post('/comment', authenticated, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            userId: req.session.userId,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

//finds all comments
router.get('/comment', authenticated, async (req, res) => {
    console.log(`Retrieving comments`);
    try {
        const comments = await Comment.findAll();
        console.log(`here are the comments: ${comments}`);
        res.status(200).json(comments);
    } catch (err) {
        res.status(400).json(err);
    }
});


//delete route, if user decides to delete any posts they've created. Can only be accessed when user is logged in
router.delete('/:id', authenticated, async (req, res) => { 
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });

        if (!postData) {
            res.status(404).json({message: "Error when trying to find this post to delete"}); //this error message won't be super relevant because the delete button is located on the post itself
            return;
        }

        res.status(200).json(postData); //returns deleted post's information        
    } catch (err) {
        res.status(500).json(err); //sends user a server error
    }
});

//delete route, if user decides to delete any posts they've created. Can only be accessed when user is logged in
router.delete('/comment/:id', authenticated, async (req, res) => { 
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });

        if (!commentData) {
            res.status(404).json({message: "Error when trying to find this comment to delete"}); //this error message won't be super relevant because the delete button is located on the comment itself
            return;
        }

        res.status(200).json(commentData); //returns deleted post's information        
    } catch (err) {
        res.status(500).json(err); //sends user a server error
    }
});

module.exports = router;