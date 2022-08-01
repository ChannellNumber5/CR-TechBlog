const commentText = document.querySelector('#newCommentText').value();

function addComment(event) {
    event.preventDefault();
    if (commentText) {
        const response = await fetch('/post/comment', {
            method: 'POST',
            body: JSON.stringify({
                commentText,
            }),
            headers: {'Content-Type' : 'application/json' },
        });

        if (response.ok) {
            window.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};


document.getElementById('#submitComment').addEventListener('Submit', addComment);