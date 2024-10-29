// Liste des thèmes et leurs dossiers correspondants
const themes = [
    { name: "Thème 1", folder: "/NightWing" },
    { name: "Thème 2", folder: "/theme2" },
];

// Fonction pour générer dynamiquement les sections de chaque thème
async function loadGallery() {
    const galleryContainer = document.getElementById('gallery');
    
    for (const theme of themes) {
        const section = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = theme.name;
        
        section.appendChild(summary);
        const content = document.createElement('div');
        content.className = 'content';

        // Récupération des fichiers dans le dossier du thème
        const files = await fetchFiles(theme.folder);
        
        // Filtrage et ajout des fichiers en fonction de leur type
        files.forEach(file => {
            if (file.endsWith('.mp4')) {
                const video = document.createElement('video');
                video.src = `${theme.folder}/${file}`;
                video.controls = true;
                content.appendChild(video);
            } else if (file.endsWith('.jpg') || file.endsWith('.png')) {
                const img = document.createElement('img');
                img.src = `${theme.folder}/${file}`;
                img.alt = `${theme.name} Image`;
                content.appendChild(img);
            }
        });
        
        section.appendChild(content);
        galleryContainer.appendChild(section);
    }
}

// Fonction pour récupérer les fichiers d'un dossier (nécessite un backend)
async function fetchFiles(folder) {
    try {
        const response = await fetch(`/api/files?folder=${encodeURIComponent(folder)}`);
        return response.ok ? await response.json() : [];
    } catch (error) {
        console.error("Erreur lors de la récupération des fichiers:", error);
        return [];
    }
}

// Appel de la fonction de chargement de la galerie
loadGallery();
