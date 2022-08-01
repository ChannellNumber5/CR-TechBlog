const postContainer = document.getElementById("blogPosts");
const deleteBtns = document.querySelectorAll('.postCard');

function postSelectHandler (event) {
    event.preventDefault();

    if (event.target.hasClass("postCard")) {
        const postId = event.target.getAttribute('id');
        window.location.replace(`/postPage/${postId}`);
    }
}

async function postDeleteHandler (event) {
    event.preventDefault();

    if(event.target.hasClass('deleteBtn')){
        const postId = event.currentTarget.getAttribute('id');
    
    
        const response = await fetch(`api/posts/${postId}`, {
            method: 'DELETE',
            body: JSON.stringify({
                postId
            }),
            headers: {'Content-Type' : 'application/json'},
        });

        if (response.ok) {
            window.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

postContainer.addEventListener('click', postSelectHandler);

deleteBtns.addEventListener('click', postDeleteHandler);

