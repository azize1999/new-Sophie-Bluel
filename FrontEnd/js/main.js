document.addEventListener('DOMContentLoaded', async () => {
    const gallery = document.getElementById("gallery");
    const filterContainer = document.querySelector(".Filter");

    if (!gallery) {
        console.error("Erreur : L'élément #gallery est introuvable dans le DOM.");
        return; // Arrêter l'exécution si gallery n'est pas trouvé
    }

    console.log("L'élément #gallery a été trouvé :", gallery);

    async function loadWorks(filter = null) {
        const url = "http://localhost:5678/api/works";

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

            const works = await response.json();
            renderWorks(works, filter);

        } catch (error) {
            console.error("Erreur de chargement:", error);
        }
    }

    function renderWorks(works, filter) {
        // Double vérification de gallery
        if (!gallery) {
            console.log("Erreur : L'élément #gallery est introuvable dans le DOM.");
            return; 
        }

        gallery.innerHTML = ""; // Vidage sécurisé

        const filteredWorks = filter 
            ? works.filter(work => work.categoryId == filter) 
            : works;

        // Création des éléments
        filteredWorks.forEach(work => {
            const figure = document.createElement("figure");
            figure.dataset.id = work.id;

            figure.innerHTML = `
                <img src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
                <figcaption>${work.title}</figcaption>
            `;

            gallery.appendChild(figure);
        });
    }

    if (filterContainer) {
        const filters = filterContainer.querySelectorAll("input[type='submit']");

        filters.forEach(filterBtn => {
            filterBtn.addEventListener('click', () => {
                filters.forEach(btn => btn.classList.remove("active"));
                filterBtn.classList.add("active");

                const filterValue = filterBtn.value;
                const categoryId = 
                    filterValue === "Tous" ? null :
                    filterValue === "Objets" ? 1 :
                    filterValue === "Appartements" ? 2 : 3;

                loadWorks(categoryId);
            });
        });
    } 
    else {
        console.warn("Aucun conteneur de filtre trouvé.");
    }

    await loadWorks();
});
