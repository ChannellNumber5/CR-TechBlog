
async function createPostHandler (event) {
    const title = document.getElementById('title').value;
    const content = document.getElementById('postText').value;

    event.preventDefault();
    
    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {'Content-Type' : 'application/json'},
    });

        if (response.ok) {
            window.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }


document.querySelector("#createPost").addEventListener('submit', createPostHandler);