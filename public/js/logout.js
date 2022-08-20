
async function logoutHandler(event) {
    event.preventDefault();

    const response = await fetch('/api/users/logout', {
        method: 'POST',
        body: {},
        headers: {'Content-Type':'application/json'},
    }); 
    
    if (response.ok) {
        window.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#logout').addEventListener("click", logoutHandler);