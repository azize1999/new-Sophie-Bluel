async function displayGallery() {
    const url = "http://localhost:5678/api/works";
    const gallery = document.querySelector(".gallery");

    if (!gallery) {
        console.error("L'élément '.gallery' est introuvable.");
        return;
    }
    
    try {
        const response = await fetch(url);
 
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const works = await response.json();

        console.log("Voici les données récupérées avec les détails complets :");
        works.forEach(work => {
            console.log({
                id: work.id,
                title: work.title,
                imageUrl: work.imageUrl,
                categoryId: work.categoryId, 
                userId: work.userId
            });

            gallery.innerHTML += `
                <figure>
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
                </figure>`;
        });
async function displayGallery(categoryId = null) {
    const url = "http://localhost:5678/api/works";
    const gallery = document.querySelector(".gallery");

    if (!gallery) {
        console.error("L'élément '.gallery' est introuvable.");
        return;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const works = await response.json();
        
        gallery.innerHTML = '';

        works.forEach(work => {
            console.log({
                id: work.id,
                title: work.title,
                imageUrl: work.imageUrl,
                categoryId: work.categoryId, 
                userId: work.userId
            });

            if (categoryId === null || work.categoryId === categoryId) {
                gallery.innerHTML += `
                    <figure>
                        <img src="${work.imageUrl}" alt="${work.title}">
                        <figcaption>${work.title}</figcaption>
                    </figure>`;
            }
        });
    } catch (error) {
        console.error("Une erreur s'est produite :", error.message);
    }
}

document.querySelector('input[value="Tous"]').addEventListener('click', () => displayGallery());
document.querySelector('input[value="Objets"]').addEventListener('click', () => displayGallery(1)); //categoryId = 1 pour "Objets"
document.querySelector('input[value="Appartements"]').addEventListener('click', () => displayGallery(2)); // categoryId = 2
document.querySelector('input[value="Hotels & restaurants"]').addEventListener('click', () => displayGallery(3)); // categoryId = 3

displayGallery();

    } catch (error) {
        console.error("Une erreur s'est produite :", error.message);
    }
}

displayGallery();
