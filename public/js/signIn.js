async function loginHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    if (!username) {
        alert("Please Enter a username");
        document.getElementById('logInForm').reset();
    }

    if (!password) {
        alert("Please Enter a username");
        document.getElementById('logInForm').reset();
    }

    const response = await fetch('api/user', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {'Content-Type':'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
};

async function signUpHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const email = document.querySelector('#userEmail').value;
    const verifPass = document.querySelector('#repass').value;

    if (username && email && (password === verifPass)) {
        const response = await fetch('api/user', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type':'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    } else if (password !== verifPass) {
        alert("Please ensure password and re-entered password match");
    } else {
        alert("Please ensure all required fields are complete");
    }
};

document.querySelector('.logInForm').addEventListener("submit", loginHandler);
document.querySelector('.signUpForm').addEventListener("submit", signUpHandler);