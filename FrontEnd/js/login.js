document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments du formulaire
    const loginForm = document.querySelector('#login');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    console.log("L'élément #log-in a été trouvé :", loginForm);
    // Vérification des éléments critiques
    if (!loginForm ||!emailInput || !passwordInput) {
        console.error('Erreur: Éléments du formulaire introuvables');
        return;
    }

    // Fonction de connexion
    async function loginUser(email, password) {
        const loginUrl = 'http://localhost:5678/api/users/login';

        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Identifiants incorrects');
            }

            const data = await response.json();
            
            localStorage.setItem('authToken', data.token);

            console.log('Token de connexion:', data.token);
            console.log('Email:', email);
            console.log('Password:', password);

            document.querySelector('a[href="login.html"]').innerText = 'logout';
            document.querySelector('a[href="login.html"]').addEventListener('click', function() {
            document.getElementById("error").style.display = "none"; 
           
            });
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Erreur de connexion:', error);
            document.getElementById("error").style.display = "block"; 
        }
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;

    if (!email || !password) {
       
        return; 
    }
        
    
    loginUser(email, password);    
    });

    // Vérification si l'utilisateur est déjà connecté
    function checkAuthStatus() {
        const token = localStorage.getItem('authToken');
        if (token) {
            window.location.href = 'index.html';
        }
    }

    checkAuthStatus();
});