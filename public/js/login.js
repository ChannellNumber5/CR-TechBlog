
async function loginHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#pass').value.trim();
    if (!username) {
        alert("Please Enter a username");
        document.getElementById('logInForm').reset();
    }

    if (!password) {
        alert("Please Enter a username");
        document.getElementById('logInForm').reset();
    }

    const response = await fetch('api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {'Content-Type':'application/json' },
    }); 

    if (response.ok) {
        window.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#logInForm').addEventListener("submit", loginHandler);
