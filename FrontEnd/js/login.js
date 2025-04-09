// Ce code implémente un formulaire de connexion à une API de manière asynchrone avec gestion des erreurs et
//  stockage d'un jeton d'authentification dans le sessionStorage
const loginpourApi ='http://localhost:5678/api/users/login';

document
.getElementById('Log In')
.addEventListener('submit', e => handleLoginSubmit(e));


async function handleLoginSubmit(event) {
    event.preventDefault();

    let user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    let response = await fetch(loginpourApi, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if(response.status != 200) {
        const errorBox = document.createElement('div');
        errorBox.className = "error-login";
        errorBox.innerHTML = "Saisie incorrecte";
        document.querySelector("form").prepend(errorBox);
    }

    else {
    let result = await response.json();
    const token = result.token;
         sessionStorage.setItem("authToken", token);
         window.location.href = "index.html "
    }
}

