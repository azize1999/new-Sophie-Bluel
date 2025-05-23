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
                
                <figcaption>${work.title}</figcaption>`;

             // Clone du figure pour éviter de manipuler deux fois le même nœud
            const figureClone = figure.cloneNode(true);
            figureClone.innerHTML = ` <img src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
            <i id="trash" class="fa-solid fa-trash-can"></i>`;

            
            document.querySelector(".modal-gallery").append(figureClone);

                
            gallery.appendChild(figure);
        });
    }
// filter 
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
// connexion
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    const editionDiv = document.querySelector('.edition');
    const filterDiv = document.querySelector('.Filter');
    const login =  document.querySelector('.login a');
    const Modifier = document.querySelector('.Modifier');
    // Vérifie si le token existe
    if (token) {
        if (login){
            editionDiv.style.display = 'flex';
            editionDiv.style.justifyContent = 'center';
            editionDiv.style.flexDirection = 'row-reverse';
            editionDiv.style.alignItems = 'center';
            filterDiv.style.display = 'none';
            Modifier.style.display = 'block';
            login.innerText = 'logout';
            login.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('authToken');
                window.location.reload();
            });
        }
    }
});
// Sélection de l'icône <i> et de la modal
const openButtons = document.querySelectorAll('.fa-solid.fa-pen-to-square'); 
const modal = document.getElementById('modal'); 
const closeButton = document.querySelector('.close-button[popovertarget="modal"]'); 


if (openButtons && modal && closeButton ) {

    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'block'; 
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; 
        
    });
} else {
    console.error('Un ou plusieurs éléments n\'ont pas été trouvés dans le DOM.');
}


                     
// ajouter une photo + suppression d'une photo
document.addEventListener("click", (event) => {
    const target = event.target;

    if (target.id === "trash") {
        // Supprimer l'image (figure associée)
        target.closest("figure").remove();
    } else if (target.id === "Ajouter-une-photo") {
        document.getElementById("add-page").style.display = "block";
    const modalContainer = document.querySelector(".modal-container");
    const modalContainer1 = document.querySelector(".modal-Container1");
        // Cacher la modal principale
    modalContainer.style.display = "none";
    modalContainer1.style.display = "block";

//retour button 
const retourButton = document.querySelector(".retour");
retourButton.addEventListener("click", changingModal);


function changingModal() {
  // Cette fonction est destinée à gérer l'affichage et le masquage d'une modale en fonction de son état actuel.
  if( document.querySelector(".modal").style.display ==="block" ||
      document.querySelector(".modal").style.display ===""
){
    console.log(1);
    document.querySelector(".modal-container").style.display = "none";
    document.querySelector(".modal-container1").style.display = "block";
  } else {
    document.querySelector(".modal-container").style.display = "block";
    document.querySelector(".modal-container1").style.display = "none";
    console.log("2");
  }
}
        // inputFile.onchange = (e) => {
        //     const file = e.target.files[0];
        //     if (file) {
        //         const reader = new FileReader();
        //         reader.onload = () => {
        //              // Code à exécuter une fois que le fichier a été lu
        //             const figure = document.createElement("figure");
        //             figure.innerHTML = `
        //                 <img src="${reader.result}" alt="Nouvelle Image">
        //                 <i id="trash" class="fa-solid fa-trash-can"></i>`;
        //             document.querySelector(".modal-gallery").append(figure);
        //         };
        //         reader.readAsDataURL(file);
        //     }
        // };
        // inputFile.click(); // Ouvre la fenêtre de sélection
    }
});


