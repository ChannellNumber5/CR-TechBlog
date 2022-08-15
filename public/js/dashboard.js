const postContainer = document.getElementById("blogPosts");

// function newPostHandler (event) {
//     event.preventDefault();
    
// }


async function postHandler (event) {
    event.preventDefault();

    if (event.target.classList.contains("postCard")) {
        const postId = event.target.getAttribute('id');
        window.location.replace(`/postPage/${postId}`);
    }

    if(event.target.classList.contains('deleteBtn')){
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

postContainer.addEventListener('click', postHandler);
document.querySelector('#newPost').addEventListener('onClick', window.location.replace('/createPost'));
// deleteBtns.addEventListener('click', postDeleteHandler);

