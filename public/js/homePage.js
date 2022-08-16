const postContainer = document.getElementById("blogPosts");

function postSelectHandler (event) {
    event.preventDefault();

    if (event.target.classList.contains("postCard")) {
        const postId = event.target.getAttribute('id');
        console.log(postId);
        window.location.replace(`/api/posts/${postId}`);
    }
}

postContainer.addEventListener('click', postSelectHandler);