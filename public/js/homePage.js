const postContainer = document.getElementById("blogPosts");

function postSelectHandler (event) {
    event.preventDefault();

    if (event.target.hasClass("postCard")) {
        const postId = event.target.getAttribute('id');
        document.location.replace(`/postPage/${postId}`);
    }
}

postContainer.addEventListener(postContainer);