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

                     
// ajouter une photo + suppression d'une photo
document.addEventListener("click", (event) => {
    const target = event.target;

    if (target.id === "trash") {
        // Supprimer l'image (figure associée)
        target.closest("figure").remove();
    } else if (target.id === "Ajouter-une-photo") {
        document.getElementById("add-page").style.display = "block";
   

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

//open and close button
document.querySelector('.fa-solid.fa-pen-to-square').onclick = function() {
    document.getElementById('modal').style.display = 'block';
};

document.getElementById('closeModal').onclick = function() {
    document.getElementById('modal').style.display = 'none';
};
//ajouter une photo (confirm button)
document.getElementById('confirmButton').onclick = function() {
    var firstForm = document.getElementById('firstForm');
    var secondForm = document.getElementById('secondForm');
    firstForm.style.display = 'none';
    secondForm.style.display = 'block';
};
// confirm and return button
document.getElementById('returnButton').onclick = function() {
    var firstForm = document.getElementById('firstForm');
    var secondForm = document.getElementById('secondForm');
    firstForm.style.display = 'block';
    secondForm.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
};

//ajouter la photo selectionnée
document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("file");
  const previewContainer = document.getElementById("previewImageContainer");
  const label = document.querySelector('label[for="file"]');
  const icon = document.querySelector(".addDocument-container i");
  const details = document.querySelector(".details");

  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = "Prévisualisation";
        img.style.maxWidth = "129px";

        previewContainer.innerHTML = "";
        previewContainer.appendChild(img);

        label.style.display = "none";
        if (icon) icon.style.display = "none";
        if (details) details.style.display = "none";
      };

      reader.readAsDataURL(file);
    }
  });
});

