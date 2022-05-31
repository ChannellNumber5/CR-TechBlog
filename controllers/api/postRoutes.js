const router = require('express').Router();
const {Post} = require('../../models');
const authenticated  = require('../../utils/auth');

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

module.exports = router;