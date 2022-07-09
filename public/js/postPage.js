const commentText = document.querySelector('#newCommentText').value();

function addComment(event) {
    if (commentText) {
        const response = await fetch('/post/addComment')
    }

};


document.getElementById('#submitComment').addEventListener('Submit', addComment);