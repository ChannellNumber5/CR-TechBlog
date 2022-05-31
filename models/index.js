const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//sets up relationship between user and posts, so that when user is deleted, associated posts are deleted
User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'userId'
});

Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'postId'
});

module.exports = {User, Post, Comment};