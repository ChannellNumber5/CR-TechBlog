async function signUpHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const email = document.querySelector('#userEmail').value.trim();
    const verifPass = document.querySelector('#repass').value.trim();

    if (username && email && (password === verifPass)) {
        const response = await fetch('api/users/', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type':'application/json' },
        });

        if (response.ok) {
            window.location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    } else if (password !== verifPass) {
        alert("Please ensure password and re-entered password match");
    } else {
        alert("Please ensure all required fields are complete");
    }
};

document.querySelector('#signUpForm').addEventListener("submit", signUpHandler);