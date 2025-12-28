// Image Management System
let imagesConfig = {
    hero: { url: '', description: 'Image de fond pour la section hero (page d\'accueil)' },
    pageHero: { url: '', description: 'Image de fond pour les pages' },
    joinHero: { url: '', description: 'Image de fond pour la page \'Se joindre à nous\'' },
    events: [],
    departments: []
};

// Load existing images configuration
async function loadImagesConfig() {
    try {
        const response = await fetch('data/images.json');
        imagesConfig = await response.json();
        populateForms();
    } catch (error) {
        console.error('Error loading images config:', error);
        alert('Erreur lors du chargement de la configuration. Utilisez les valeurs par défaut.');
    }
}

// Populate forms with existing data
function populateForms() {
    // Hero images
    document.getElementById('heroUrl').value = imagesConfig.hero?.url || '';
    document.getElementById('pageHeroUrl').value = imagesConfig.pageHero?.url || '';
    document.getElementById('joinHeroUrl').value = imagesConfig.joinHero?.url || '';
    
    updatePreview('heroPreview', 'heroUrl');
    updatePreview('pageHeroPreview', 'pageHeroUrl');
    updatePreview('joinHeroPreview', 'joinHeroUrl');

    // Events images
    renderEventsImages();
    
    // Departments images
    renderDepartmentsImages();
}

// Update image preview
function updatePreview(previewId, urlInputId) {
    const preview = document.getElementById(previewId);
    const urlInput = document.getElementById(urlInputId);
    if (preview && urlInput && urlInput.value) {
        preview.src = urlInput.value;
        preview.onerror = function() {
            this.src = 'https://via.placeholder.com/150x100?text=Image+non+disponible';
        };
    }
}

// Show/Hide add forms
function showAddEventForm() {
    document.getElementById('newEventForm').classList.add('active');
}

function hideAddEventForm() {
    document.getElementById('newEventForm').classList.remove('active');
    document.getElementById('newEventId').value = '';
    document.getElementById('newEventUrl').value = '';
}

function showAddDeptForm() {
    document.getElementById('newDeptForm').classList.add('active');
}

function hideAddDeptForm() {
    document.getElementById('newDeptForm').classList.remove('active');
    document.getElementById('newDeptName').value = '';
    document.getElementById('newDeptUrl').value = '';
}

// Add event image
function addEventImage() {
    const id = parseInt(document.getElementById('newEventId').value);
    const url = document.getElementById('newEventUrl').value;

    if (!id || !url) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    // Check if ID already exists
    const existingIndex = imagesConfig.events.findIndex(e => e.id === id);
    if (existingIndex !== -1) {
        imagesConfig.events[existingIndex].url = url;
    } else {
        imagesConfig.events.push({ id, url });
    }

    renderEventsImages();
    hideAddEventForm();
}

// Add department image
function addDeptImage() {
    const name = document.getElementById('newDeptName').value.trim();
    const url = document.getElementById('newDeptUrl').value;

    if (!name || !url) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    // Check if department already exists
    const existingIndex = imagesConfig.departments.findIndex(d => d.name === name);
    if (existingIndex !== -1) {
        imagesConfig.departments[existingIndex].url = url;
    } else {
        // Get next available ID
        const maxId = imagesConfig.departments.length > 0 
            ? Math.max(...imagesConfig.departments.map(d => d.id || 0))
            : 0;
        imagesConfig.departments.push({ id: maxId + 1, name, url });
    }

    renderDepartmentsImages();
    hideAddDeptForm();
}

// Remove event image
function removeEventImage(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
        imagesConfig.events = imagesConfig.events.filter(e => e.id !== id);
        renderEventsImages();
    }
}

// Remove department image
function removeDeptImage(name) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
        imagesConfig.departments = imagesConfig.departments.filter(d => d.name !== name);
        renderDepartmentsImages();
    }
}

// Render events images list
function renderEventsImages() {
    const container = document.getElementById('eventsImagesList');
    if (!container) return;

    container.innerHTML = imagesConfig.events.map(event => `
        <div class="image-item">
            <img src="${event.url}" alt="Event ${event.id}" class="image-preview" 
                 onerror="this.src='https://via.placeholder.com/150x100?text=Image+non+disponible'">
            <div class="image-info">
                <label>Événement ID: ${event.id}</label>
                <input type="text" value="${event.url}" 
                       onchange="updateEventImage(${event.id}, this.value)"
                       placeholder="URL de l'image">
            </div>
            <button class="btn-remove" onclick="removeEventImage(${event.id})">
                <i class="fas fa-trash"></i> Retirer
            </button>
        </div>
    `).join('');
}

// Render departments images list
function renderDepartmentsImages() {
    const container = document.getElementById('departmentsImagesList');
    if (!container) return;

    container.innerHTML = imagesConfig.departments.map(dept => `
        <div class="image-item">
            <img src="${dept.url}" alt="${dept.name}" class="image-preview"
                 onerror="this.src='https://via.placeholder.com/150x100?text=Image+non+disponible'">
            <div class="image-info">
                <label>${dept.name}</label>
                <input type="text" value="${dept.url}" 
                       onchange="updateDeptImage('${dept.name}', this.value)"
                       placeholder="URL de l'image">
            </div>
            <button class="btn-remove" onclick="removeDeptImage('${dept.name}')">
                <i class="fas fa-trash"></i> Retirer
            </button>
        </div>
    `).join('');
}

// Update event image
function updateEventImage(id, url) {
    const event = imagesConfig.events.find(e => e.id === id);
    if (event) {
        event.url = url;
        renderEventsImages();
    }
}

// Update department image
function updateDeptImage(name, url) {
    const dept = imagesConfig.departments.find(d => d.name === name);
    if (dept) {
        dept.url = url;
        renderDepartmentsImages();
    }
}

// Save all images to JSON file
async function saveAllImages() {
    // Update hero images
    imagesConfig.hero.url = document.getElementById('heroUrl').value;
    imagesConfig.pageHero.url = document.getElementById('pageHeroUrl').value;
    imagesConfig.joinHero.url = document.getElementById('joinHeroUrl').value;

    // Create JSON string
    const jsonString = JSON.stringify(imagesConfig, null, 4);

    // Create download link
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'images.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Fichier images.json téléchargé ! Remplacez le fichier dans data/images.json avec ce nouveau fichier.');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadImagesConfig();
    
    // Add input listeners for preview
    document.getElementById('heroUrl').addEventListener('input', function() {
        updatePreview('heroPreview', 'heroUrl');
    });
    document.getElementById('pageHeroUrl').addEventListener('input', function() {
        updatePreview('pageHeroPreview', 'pageHeroUrl');
    });
    document.getElementById('joinHeroUrl').addEventListener('input', function() {
        updatePreview('joinHeroPreview', 'joinHeroUrl');
    });
});


