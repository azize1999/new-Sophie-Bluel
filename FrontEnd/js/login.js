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
            
            // Stockage du token dans le localStorage
            localStorage.setItem('authToken', data.token);
            
            // Redirection vers la page d'accueil après connexion réussie
            window.location.href = 'index.html';

        } catch (error) {
            // Gestion des erreurs
            console.error('Erreur de connexion:', error);
            alert(error.message || 'Une erreur est survenue lors de la connexion');
        }
    }

    // Gestion de la soumission du formulaire
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validation basique
        if (!email || !password) {
            alert('Veuillez remplir tous les champs');
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

    // Vérification initiale
    checkAuthStatus();
});