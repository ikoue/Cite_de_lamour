// Admin Panel JavaScript
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123' // Changez ce mot de passe en production !
};

let imagesConfig = {};
let eventsData = [];
let departmentsData = [];
let programsData = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupEventListeners();
    checkServerStatus();
});

// Check authentication
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    if (isAuthenticated) {
        showDashboard();
        loadAllData();
    } else {
        showLogin();
    }
}

// Show login screen
function showLogin() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

// Show dashboard
function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'flex';
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Navigation
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.getAttribute('data-section');
            switchSection(section);
        });
    });
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        sessionStorage.setItem('adminUser', username);
        showDashboard();
        loadAllData();
        errorDiv.classList.remove('show');
    } else {
        errorDiv.textContent = 'Nom d\'utilisateur ou mot de passe incorrect';
        errorDiv.classList.add('show');
    }
}

// Logout
function logout() {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('adminUser');
    showLogin();
    document.getElementById('loginForm').reset();
}

// Switch section
function switchSection(section) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(sec => {
        sec.style.display = 'none';
    });

    // Remove active class from nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(section + 'Section');
    if (targetSection) {
        targetSection.style.display = 'block';
    }

    // Activate nav item
    const navItem = document.querySelector(`[data-section="${section}"]`);
    if (navItem) {
        navItem.classList.add('active');
    }

    // Update page title
    const titles = {
        images: 'Gestion des Images',
        events: 'Gestion des Événements',
        departments: 'Gestion des Départements',
        programs: 'Gestion des Programmes'
    };
    document.getElementById('pageTitle').textContent = titles[section] || 'Administration';

    // Load section data
    if (section === 'images') {
        loadImagesConfig();
        // Also ensure dropdowns are populated when switching to images section
        setTimeout(() => {
            populateDepartmentSelect();
            populateEventSelect();
        }, 100);
    } else if (section === 'events') {
        loadEventsData();
    } else if (section === 'departments') {
        console.log('🔄 Switching to departments section, loading data...');
        loadDepartmentsData();
    } else if (section === 'programs') {
        loadProgramsData();
    }
}

// Load all data
async function loadAllData() {
    console.log('🔄 Loading all data...');
    try {
        await Promise.all([
            loadImagesConfig(),
            loadEventsData(),
            loadDepartmentsData(),
            loadProgramsData()
        ]);
        console.log('✅ All data loaded, populating dropdowns...');
        // Ensure dropdowns are populated after all data is loaded
        populateDepartmentSelect();
        populateEventSelect();
    } catch (error) {
        console.error('❌ Error loading all data:', error);
    }
}

// Load images configuration
async function loadImagesConfig() {
    try {
        const response = await fetch('../data/images.json');
        imagesConfig = await response.json();
        populateImagesForms();
    } catch (error) {
        console.error('Error loading images config:', error);
        imagesConfig = {
            hero: { url: '', description: '' },
            pageHero: { url: '', description: '' },
            joinHero: { url: '', description: '' },
            events: [],
            departments: []
        };
    }
}

// Populate images forms
function populateImagesForms() {
    // Hero images
    if (imagesConfig.hero) {
        document.getElementById('heroUrlInput').value = imagesConfig.hero.url || '';
        updatePreview('heroPreviewLarge', 'heroUrlInput');
    }
    if (imagesConfig.pageHero) {
        document.getElementById('pageHeroUrlInput').value = imagesConfig.pageHero.url || '';
        updatePreview('pageHeroPreviewLarge', 'pageHeroUrlInput');
    }
    if (imagesConfig.joinHero) {
        document.getElementById('joinHeroUrlInput').value = imagesConfig.joinHero.url || '';
        updatePreview('joinHeroPreviewLarge', 'joinHeroUrlInput');
    }

    // Populate event and department select dropdowns
    // These will be populated even if data is still loading
    populateEventSelect();
    populateDepartmentSelect();

    // Render events images
    renderEventsImages();
    
    // Render departments images
    renderDepartmentsImages();
}

// Populate event select dropdown
function populateEventSelect() {
    const select = document.getElementById('newEventSelect');
    if (!select || !eventsData || eventsData.length === 0) return;

    // Clear existing options except the first one
    select.innerHTML = '<option value="">-- Sélectionner un événement --</option>';

    // Add events
    eventsData.forEach(event => {
        const option = document.createElement('option');
        option.value = event.id;
        option.textContent = `${event.name} (${event.date}/${event.time || ''})`;
        option.dataset.eventName = event.name;
        option.dataset.eventDate = event.date;
        option.dataset.eventTime = event.time || '';
        select.appendChild(option);
    });
}

// Populate department select dropdown
function populateDepartmentSelect() {
    const select = document.getElementById('newDeptSelect');
    if (!select) {
        console.warn('⚠️ Department select dropdown not found (newDeptSelect)');
        return;
    }

    // Clear existing options
    select.innerHTML = '<option value="">-- Sélectionner un département --</option>';

    // If no data, try to load it
    if (!departmentsData || departmentsData.length === 0) {
        console.warn('⚠️ No departments data available, attempting to load...');
        // Try to load from localStorage first (faster)
        try {
            const backup = localStorage.getItem('departmentsData_backup');
            if (backup) {
                const backupData = JSON.parse(backup);
                if (Array.isArray(backupData) && backupData.length > 0) {
                    departmentsData = backupData;
                    console.log('📦 Loaded departments from localStorage for dropdown:', departmentsData.length, 'items');
                }
            }
        } catch (e) {
            console.error('Could not load from localStorage:', e);
        }
        
        // If still empty, trigger a load
        if ((!departmentsData || departmentsData.length === 0) && typeof loadDepartmentsData === 'function') {
            console.log('🔄 Triggering loadDepartmentsData()...');
            loadDepartmentsData();
            return; // Will be called again after data loads
        }
    }

    // Add departments to dropdown
    if (departmentsData && departmentsData.length > 0) {
        departmentsData.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept.name;
            option.textContent = dept.name;
            option.dataset.deptDescription = dept.description || '';
            select.appendChild(option);
        });
        console.log('✅ Populated department dropdown with', departmentsData.length, 'departments');
    } else {
        console.warn('⚠️ Department dropdown remains empty - no data available');
    }
}

// Update event preview info
function updateEventPreview() {
    const select = document.getElementById('newEventSelect');
    const infoDiv = document.getElementById('eventInfo');
    
    if (!select || !infoDiv) return;

    const selectedOption = select.options[select.selectedIndex];
    if (selectedOption && selectedOption.value) {
        const name = selectedOption.dataset.eventName;
        const date = selectedOption.dataset.eventDate;
        const time = selectedOption.dataset.eventTime;
        infoDiv.textContent = `${name} - ${date} à ${time}`;
        infoDiv.style.display = 'block';
    } else {
        infoDiv.style.display = 'none';
    }
}

// Update department preview info
function updateDeptPreview() {
    const select = document.getElementById('newDeptSelect');
    const infoDiv = document.getElementById('deptInfo');
    
    if (!select || !infoDiv) return;

    const selectedOption = select.options[select.selectedIndex];
    if (selectedOption && selectedOption.value) {
        const description = selectedOption.dataset.deptDescription;
        infoDiv.textContent = description || '';
        infoDiv.style.display = description ? 'block' : 'none';
    } else {
        infoDiv.style.display = 'none';
    }
}

// Handle image upload from device
function handleImageUpload(fileInput, inputId, previewId) {
    const file = fileInput.files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('L\'image est trop grande. Veuillez choisir une image de moins de 5MB.');
        return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64String = e.target.result;
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);
        
        if (input) {
            input.value = base64String;
        }
        
        if (preview) {
            preview.src = base64String;
            preview.style.display = 'block';
        }
    };
    reader.onerror = function() {
        alert('Erreur lors de la lecture du fichier.');
    };
    reader.readAsDataURL(file);
}

// Update preview
function updatePreview(previewId, inputId) {
    const preview = document.getElementById(previewId);
    const input = document.getElementById(inputId);
    if (preview && input && input.value) {
        preview.src = input.value;
        preview.onerror = function() {
            this.src = 'https://via.placeholder.com/300x200?text=Image+non+disponible';
        };
    }
}

// Show add form
function showAddForm(type) {
    const formId = type === 'event' ? 'addEventForm' : 'addDepartmentForm';
    document.getElementById(formId).style.display = 'block';
}

// Hide add form
function hideAddForm(type) {
    const formId = type === 'event' ? 'addEventForm' : 'addDepartmentForm';
    document.getElementById(formId).style.display = 'none';
    
    if (type === 'event') {
        const select = document.getElementById('newEventSelect');
        if (select) select.value = '';
        document.getElementById('newEventUrl').value = '';
        const preview = document.getElementById('newEventPreview');
        if (preview) {
            preview.src = '';
            preview.style.display = 'none';
        }
        const fileInput = document.getElementById('newEventFileInput');
        if (fileInput) fileInput.value = '';
        const infoDiv = document.getElementById('eventInfo');
        if (infoDiv) infoDiv.style.display = 'none';
    } else {
        const select = document.getElementById('newDeptSelect');
        if (select) select.value = '';
        document.getElementById('newDeptUrl').value = '';
        const preview = document.getElementById('newDeptPreview');
        if (preview) {
            preview.src = '';
            preview.style.display = 'none';
        }
        const fileInput = document.getElementById('newDeptFileInput');
        if (fileInput) fileInput.value = '';
        const infoDiv = document.getElementById('deptInfo');
        if (infoDiv) infoDiv.style.display = 'none';
    }
}

// Add event image
function addEventImage() {
    const select = document.getElementById('newEventSelect');
    const url = document.getElementById('newEventUrl').value;

    if (!select || !select.value || !url) {
        alert('Veuillez sélectionner un événement et ajouter une image');
        return;
    }

    const id = parseInt(select.value);
    if (!id) {
        alert('Erreur : ID d\'événement invalide');
        return;
    }

    if (!imagesConfig.events) {
        imagesConfig.events = [];
    }

    const existingIndex = imagesConfig.events.findIndex(e => e.id === id);
    if (existingIndex !== -1) {
        imagesConfig.events[existingIndex].url = url;
    } else {
        imagesConfig.events.push({ id, url });
    }

    renderEventsImages();
    hideAddForm('event');
}

// Add department image
function addDepartmentImage() {
    const select = document.getElementById('newDeptSelect');
    const url = document.getElementById('newDeptUrl').value;

    if (!select || !select.value || !url) {
        alert('Veuillez sélectionner un département et ajouter une image');
        return;
    }

    const name = select.value.trim();
    if (!name) {
        alert('Erreur : nom de département invalide');
        return;
    }

    if (!imagesConfig.departments) {
        imagesConfig.departments = [];
    }

    const existingIndex = imagesConfig.departments.findIndex(d => d.name === name);
    if (existingIndex !== -1) {
        imagesConfig.departments[existingIndex].url = url;
    } else {
        const maxId = imagesConfig.departments.length > 0 
            ? Math.max(...imagesConfig.departments.map(d => d.id || 0))
            : 0;
        imagesConfig.departments.push({ id: maxId + 1, name, url });
    }

    renderDepartmentsImages();
    hideAddForm('department');
}

// Remove event image
function removeEventImage(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
        imagesConfig.events = imagesConfig.events.filter(e => e.id !== id);
        renderEventsImages();
    }
}

// Remove department image
function removeDepartmentImage(name) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
        imagesConfig.departments = imagesConfig.departments.filter(d => d.name !== name);
        renderDepartmentsImages();
    }
}

// Render events images
function renderEventsImages() {
    const container = document.getElementById('eventsImagesContainer');
    if (!container || !imagesConfig.events) return;

    container.innerHTML = imagesConfig.events.map((event, index) => `
        <div class="image-card">
            <img src="${event.url}" alt="Event ${event.id}" class="image-card-preview"
                 onerror="this.src='https://via.placeholder.com/300x200?text=Image+non+disponible'">
            <div class="image-card-info">
                <label>Événement ID: ${event.id}</label>
                <div class="upload-container">
                    <label for="eventFileInput${index}" class="btn-upload-small">
                        <i class="fas fa-upload"></i> Importer
                    </label>
                    <input type="file" id="eventFileInput${index}" accept="image/*" style="display: none;" 
                           onchange="handleEventImageUpload(this, ${event.id}, 'eventInput${index}')">
                    <input type="text" id="eventInput${index}" value="${event.url}" 
                           onchange="updateEventImage(${event.id}, this.value)"
                           placeholder="URL ou base64" style="flex: 1;">
                </div>
            </div>
            <div class="image-card-actions">
                <button class="btn-remove" onclick="removeEventImage(${event.id})">
                    <i class="fas fa-trash"></i> Retirer
                </button>
            </div>
        </div>
    `).join('');
}

// Render departments images
function renderDepartmentsImages() {
    const container = document.getElementById('departmentsImagesContainer');
    if (!container || !imagesConfig.departments) return;

    container.innerHTML = imagesConfig.departments.map((dept, index) => `
        <div class="image-card">
            <img src="${dept.url}" alt="${dept.name}" class="image-card-preview"
                 onerror="this.src='https://via.placeholder.com/300x200?text=Image+non+disponible'">
            <div class="image-card-info">
                <label>${dept.name}</label>
                <div class="upload-container">
                    <label for="deptFileInput${index}" class="btn-upload-small">
                        <i class="fas fa-upload"></i> Importer
                    </label>
                    <input type="file" id="deptFileInput${index}" accept="image/*" style="display: none;" 
                           onchange="handleDeptImageUpload(this, '${dept.name}', 'deptInput${index}')">
                    <input type="text" id="deptInput${index}" value="${dept.url}" 
                           onchange="updateDepartmentImage('${dept.name}', this.value)"
                           placeholder="URL ou base64" style="flex: 1;">
                </div>
            </div>
            <div class="image-card-actions">
                <button class="btn-remove" onclick="removeDepartmentImage('${dept.name}')">
                    <i class="fas fa-trash"></i> Retirer
                </button>
            </div>
        </div>
    `).join('');
}

// Handle event image upload from card
function handleEventImageUpload(fileInput, eventId, inputId) {
    const file = fileInput.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        alert('L\'image est trop grande. Veuillez choisir une image de moins de 5MB.');
        return;
    }

    if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64String = e.target.result;
        const input = document.getElementById(inputId);
        if (input) {
            input.value = base64String;
            updateEventImage(eventId, base64String);
        }
    };
    reader.onerror = function() {
        alert('Erreur lors de la lecture du fichier.');
    };
    reader.readAsDataURL(file);
}

// Handle department image upload from card
function handleDeptImageUpload(fileInput, deptName, inputId) {
    const file = fileInput.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        alert('L\'image est trop grande. Veuillez choisir une image de moins de 5MB.');
        return;
    }

    if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64String = e.target.result;
        const input = document.getElementById(inputId);
        if (input) {
            input.value = base64String;
            updateDepartmentImage(deptName, base64String);
        }
    };
    reader.onerror = function() {
        alert('Erreur lors de la lecture du fichier.');
    };
    reader.readAsDataURL(file);
}

// Update event image
function updateEventImage(id, url) {
    const event = imagesConfig.events.find(e => e.id === id);
    if (event) {
        event.url = url;
        // Update preview in the card
        const card = document.querySelector(`[onclick*="removeEventImage(${id})"]`)?.closest('.image-card');
        if (card) {
            const img = card.querySelector('.image-card-preview');
            if (img) img.src = url;
        }
    }
}

// Update department image
function updateDepartmentImage(name, url) {
    const dept = imagesConfig.departments.find(d => d.name === name);
    if (dept) {
        dept.url = url;
        // Update preview in the card
        const card = document.querySelector(`[onclick*="removeDepartmentImage('${name}')"]`)?.closest('.image-card');
        if (card) {
            const img = card.querySelector('.image-card-preview');
            if (img) img.src = url;
        }
    }
}

// Save all images
async function saveAllImages() {
    // Update hero images from inputs
    imagesConfig.hero = {
        url: document.getElementById('heroUrlInput').value,
        description: imagesConfig.hero?.description || 'Image de fond pour la section hero (page d\'accueil)'
    };
    imagesConfig.pageHero = {
        url: document.getElementById('pageHeroUrlInput').value,
        description: imagesConfig.pageHero?.description || 'Image de fond pour les pages'
    };
    imagesConfig.joinHero = {
        url: document.getElementById('joinHeroUrlInput').value,
        description: imagesConfig.joinHero?.description || 'Image de fond pour la page \'Se joindre à nous\''
    };

    // Create JSON and download
    const jsonString = JSON.stringify(imagesConfig, null, 4);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'images.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('✅ Fichier images.json téléchargé !\n\nRemplacez le fichier data/images.json avec ce nouveau fichier téléchargé.');
}

// Load events data
async function loadEventsData() {
    try {
        const response = await fetch('../data/events.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Validate data structure
        if (Array.isArray(data)) {
            eventsData = data;
            console.log('✅ Events loaded successfully:', eventsData.length, 'items');
            
            // Update localStorage backup
            try {
                localStorage.setItem('eventsData_backup', JSON.stringify(eventsData));
            } catch (e) {
                console.warn('Could not update localStorage:', e);
            }
        } else {
            console.error('Invalid events data format:', data);
            eventsData = [];
        }
        
        populateEventSelect(); // Populate dropdown when data is loaded
        renderEventsList(); // Render events list
    } catch (error) {
        console.error('❌ Error loading events:', error);
        console.error('Make sure you are running a local server (e.g., python -m http.server)');
        
        // Try to load from localStorage backup
        try {
            const backup = localStorage.getItem('eventsData_backup');
            if (backup) {
                const backupData = JSON.parse(backup);
                if (Array.isArray(backupData)) {
                    eventsData = backupData;
                    console.log('📦 Loaded events from localStorage backup:', eventsData.length, 'items');
                    populateEventSelect();
                    renderEventsList();
                    return;
                }
            }
        } catch (e) {
            console.error('Could not load from localStorage:', e);
        }
        
        eventsData = eventsData || [];
        populateEventSelect();
        renderEventsList();
    }
}

// Load departments data
async function loadDepartmentsData() {
    console.log('🔄 Starting loadDepartmentsData()...');
    showLoadStatus('departments', 'loading', 'Chargement des départements...');
    
    // First, try to load from JSON file (this is the source of truth)
    try {
        console.log('📡 Fetching ../data/departments.json...');
        const response = await fetch('../data/departments.json');
        console.log('📡 Response status:', response.status, response.statusText);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('📦 Data received:', data);
        
        // Validate data structure - accept empty arrays too
        if (Array.isArray(data)) {
            departmentsData = data;
            console.log('✅ Departments loaded from JSON file:', departmentsData.length, 'items');
            
            // Update localStorage backup with fresh data from JSON
            try {
                localStorage.setItem('departmentsData_backup', JSON.stringify(departmentsData));
            } catch (e) {
                console.warn('Could not update localStorage:', e);
            }
            
            populateDepartmentSelect();
            renderDepartmentsList();
            
            if (departmentsData.length > 0) {
                showLoadStatus('departments', 'success', `✅ ${departmentsData.length} départements chargés depuis le fichier JSON`);
                setTimeout(() => hideLoadStatus('departments'), 3000);
            } else {
                showLoadStatus('departments', 'error', '⚠️ Le fichier JSON est vide. Aucun département trouvé.');
            }
            return;
        } else {
            console.warn('JSON file is not a valid array:', data);
        }
    } catch (error) {
        console.error('❌ Error loading departments from JSON:', error);
        console.error('Trying to load from localStorage backup...');
    }
    
    // If JSON loading failed, try localStorage backup
    try {
        const backup = localStorage.getItem('departmentsData_backup');
        if (backup) {
            const backupData = JSON.parse(backup);
            if (Array.isArray(backupData)) {
                departmentsData = backupData;
                console.log('📦 Loaded departments from localStorage backup:', departmentsData.length, 'items');
                
                populateDepartmentSelect();
                renderDepartmentsList();
                
                if (departmentsData.length > 0) {
                    showLoadStatus('departments', 'error', `⚠️ Données chargées depuis le localStorage (${departmentsData.length} départements). Le fichier JSON n'a pas pu être chargé. Assurez-vous de démarrer un serveur local (ex: python -m http.server) dans le dossier cite-amour.`);
                } else {
                    showLoadStatus('departments', 'error', '⚠️ Le cache localStorage est vide. Démarrez un serveur local pour charger les données depuis le fichier JSON.');
                }
                return;
            }
        }
    } catch (e) {
        console.error('Could not load from localStorage:', e);
    }
    
    // If both failed, show error with clear instructions
    departmentsData = departmentsData || [];
    if (departmentsData.length === 0) {
        showLoadStatus('departments', 'error', '⚠️ Impossible de charger les départements. Le serveur local n\'est probablement pas démarré. Démarrez un serveur local (ex: python -m http.server) dans le dossier cite-amour, puis rechargez cette page.');
    } else {
        showLoadStatus('departments', 'error', `⚠️ Impossible de charger depuis le fichier JSON. Affichage de ${departmentsData.length} département(s) depuis le cache. Pour voir tous les départements, démarrez un serveur local.`);
    }
    renderDepartmentsList();
}

// Load programs data
async function loadProgramsData() {
    try {
        const response = await fetch('../data/programs.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Validate data structure
        if (Array.isArray(data)) {
            programsData = data;
            console.log('✅ Programs loaded successfully:', programsData.length, 'items');
            
            // Update localStorage backup
            try {
                localStorage.setItem('programsData_backup', JSON.stringify(programsData));
            } catch (e) {
                console.warn('Could not update localStorage:', e);
            }
        } else {
            console.error('Invalid programs data format:', data);
            programsData = [];
        }
        
        renderProgramsList(); // Render programs list
    } catch (error) {
        console.error('❌ Error loading programs:', error);
        console.error('Make sure you are running a local server (e.g., python -m http.server)');
        
        // Try to load from localStorage backup
        try {
            const backup = localStorage.getItem('programsData_backup');
            if (backup) {
                const backupData = JSON.parse(backup);
                if (Array.isArray(backupData)) {
                    programsData = backupData;
                    console.log('📦 Loaded programs from localStorage backup:', programsData.length, 'items');
                    renderProgramsList();
                    return;
                }
            }
        } catch (e) {
            console.error('Could not load from localStorage:', e);
        }
        
        programsData = programsData || [];
        renderProgramsList();
    }
}

// ========== EVENTS MANAGEMENT ==========
let editingEventId = null;

function showAddEventForm() {
    editingEventId = null;
    document.getElementById('eventFormTitle').textContent = 'Ajouter un événement';
    document.getElementById('eventForm').style.display = 'block';
    document.getElementById('eventName').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventTime').value = '';
    document.getElementById('eventDescription').value = '';
    document.getElementById('eventImageUrl').value = '';
    const preview = document.getElementById('eventImagePreview');
    if (preview) {
        preview.src = '';
        preview.style.display = 'none';
    }
    const fileInput = document.getElementById('eventImageFileInput');
    if (fileInput) fileInput.value = '';
    document.getElementById('eventForm').scrollIntoView({ behavior: 'smooth' });
}

function cancelEventForm() {
    document.getElementById('eventForm').style.display = 'none';
    editingEventId = null;
}

function editEvent(id) {
    // Convert id to number for comparison
    const eventId = typeof id === 'string' ? parseInt(id) : id;
    const event = eventsData.find(e => e.id == eventId);
    if (!event) return;

    editingEventId = id;
    document.getElementById('eventFormTitle').textContent = 'Modifier l\'événement';
    document.getElementById('eventForm').style.display = 'block';
    document.getElementById('eventName').value = event.name || '';
    document.getElementById('eventDate').value = event.date || '';
    document.getElementById('eventTime').value = event.time || '';
    document.getElementById('eventDescription').value = event.description || '';
    document.getElementById('eventImageUrl').value = event.image || '';
    
    const preview = document.getElementById('eventImagePreview');
    if (preview && event.image) {
        preview.src = event.image;
        preview.style.display = 'block';
    }
    
    document.getElementById('eventForm').scrollIntoView({ behavior: 'smooth' });
}

function saveEvent() {
    const name = document.getElementById('eventName').value.trim();
    const date = document.getElementById('eventDate').value.trim();
    const time = document.getElementById('eventTime').value.trim();
    const description = document.getElementById('eventDescription').value.trim();
    const image = document.getElementById('eventImageUrl').value.trim();

    if (!name || !date || !time || !description) {
        alert('Veuillez remplir tous les champs obligatoires (*)');
        return;
    }

    if (editingEventId !== null) {
        // Update existing event
        const event = eventsData.find(e => e.id == editingEventId);
        if (event) {
            event.name = name;
            event.date = date;
            event.time = time;
            event.description = description;
            if (image) event.image = image;
        }
    } else {
        // Add new event
        const maxId = eventsData.length > 0 ? Math.max(...eventsData.map(e => e.id)) : 0;
        const newEvent = {
            id: maxId + 1,
            name,
            date,
            time,
            description
        };
        if (image) newEvent.image = image;
        eventsData.push(newEvent);
    }

    renderEventsList();
    cancelEventForm();
    showSaveReminder('events');
}

function deleteEvent(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return;
    
    // Convert id to number for comparison
    const eventId = typeof id === 'string' ? parseInt(id) : id;
    eventsData = eventsData.filter(e => e.id != eventId);
    renderEventsList();
    showSaveReminder('events');
}

function renderEventsList() {
    const container = document.getElementById('eventsListContainer');
    if (!container) return;

    if (eventsData.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Aucun événement pour le moment.</p>';
        return;
    }

    container.innerHTML = eventsData.map(event => `
        <div class="item-card">
            <div class="item-card-content">
                <h4 class="item-card-title">${event.name}</h4>
                <div class="item-card-info">
                    <span><i class="fas fa-calendar"></i> ${event.date}</span>
                    <span><i class="fas fa-clock"></i> ${event.time}</span>
                </div>
                ${event.description ? `<p class="item-card-description">${event.description}</p>` : ''}
            </div>
            <div class="item-card-actions">
                <button class="btn-edit" onclick="editEvent(${event.id})">
                    <i class="fas fa-edit"></i> Modifier
                </button>
                <button class="btn-remove" onclick="deleteEvent(${event.id})">
                    <i class="fas fa-trash"></i> Supprimer
                </button>
            </div>
        </div>
    `).join('');
}

function saveEventsData() {
    const jsonString = JSON.stringify(eventsData, null, 4);
    
    // Save to localStorage as backup
    try {
        localStorage.setItem('eventsData_backup', jsonString);
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
    
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'events.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    const message = `✅ Fichier events.json téléchargé !\n\n📋 INSTRUCTIONS IMPORTANTES :\n\n1. Le fichier events.json a été téléchargé dans votre dossier Téléchargements\n2. Copiez ce fichier et remplacez-le dans : cite-amour/data/events.json\n3. Rechargez la page d'accueil pour voir les modifications\n\n⚠️ Les modifications ne seront visibles sur le site qu'après avoir remplacé le fichier !`;
    alert(message);
}

// ========== DEPARTMENTS MANAGEMENT ==========
let editingDepartmentId = null;

function showAddDepartmentForm() {
    editingDepartmentId = null;
    document.getElementById('departmentFormTitle').textContent = 'Ajouter un département';
    document.getElementById('departmentForm').style.display = 'block';
    document.getElementById('departmentName').value = '';
    document.getElementById('departmentDescription').value = '';
    document.getElementById('departmentImageUrl').value = '';
    const preview = document.getElementById('departmentImagePreview');
    if (preview) {
        preview.src = '';
        preview.style.display = 'none';
    }
    const fileInput = document.getElementById('departmentImageFileInput');
    if (fileInput) fileInput.value = '';
    document.getElementById('departmentForm').scrollIntoView({ behavior: 'smooth' });
}

function cancelDepartmentForm() {
    document.getElementById('departmentForm').style.display = 'none';
    editingDepartmentId = null;
}

function editDepartment(id) {
    // Convert id to number for comparison
    const deptId = typeof id === 'string' ? parseInt(id) : id;
    const dept = departmentsData.find(d => d.id == deptId);
    if (!dept) return;

    editingDepartmentId = deptId;
    document.getElementById('departmentFormTitle').textContent = 'Modifier le département';
    document.getElementById('departmentForm').style.display = 'block';
    document.getElementById('departmentName').value = dept.name || '';
    document.getElementById('departmentDescription').value = dept.description || '';
    document.getElementById('departmentImageUrl').value = dept.image || '';
    
    const preview = document.getElementById('departmentImagePreview');
    if (preview && dept.image) {
        preview.src = dept.image;
        preview.style.display = 'block';
    }
    
    document.getElementById('departmentForm').scrollIntoView({ behavior: 'smooth' });
}

function saveDepartment() {
    const name = document.getElementById('departmentName').value.trim();
    const description = document.getElementById('departmentDescription').value.trim();
    const image = document.getElementById('departmentImageUrl').value.trim();

    if (!name || !description) {
        alert('Veuillez remplir tous les champs obligatoires (*)');
        return;
    }

    if (editingDepartmentId !== null) {
        // Update existing department
        const dept = departmentsData.find(d => d.id == editingDepartmentId);
        if (dept) {
            dept.name = name;
            dept.description = description;
            if (image) dept.image = image;
        }
    } else {
        // Add new department
        const maxId = departmentsData.length > 0 ? Math.max(...departmentsData.map(d => d.id)) : 0;
        const newDept = {
            id: maxId + 1,
            name,
            description
        };
        if (image) newDept.image = image;
        departmentsData.push(newDept);
    }

    renderDepartmentsList();
    populateDepartmentSelect(); // Update dropdown in images section
    cancelDepartmentForm();
    showSaveReminder('departments');
}

function deleteDepartment(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce département ?')) return;
    
    // Convert id to number for comparison
    const deptId = typeof id === 'string' ? parseInt(id) : id;
    departmentsData = departmentsData.filter(d => d.id != deptId);
    renderDepartmentsList();
    populateDepartmentSelect(); // Update dropdown in images section
    showSaveReminder('departments');
}

function renderDepartmentsList() {
    console.log('🎨 renderDepartmentsList() called');
    const container = document.getElementById('departmentsListContainer');
    if (!container) {
        console.error('❌ Departments list container not found!');
        console.error('Looking for element with id: departmentsListContainer');
        return;
    }
    console.log('✅ Container found:', container);

    console.log('📊 Rendering departments list, count:', departmentsData.length);
    console.log('📊 Departments data:', departmentsData);

    if (departmentsData.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Aucun département pour le moment.</p>';
        return;
    }

    container.innerHTML = departmentsData.map(dept => `
        <div class="item-card">
            <div class="item-card-content">
                <h4 class="item-card-title">${dept.name || 'Sans nom'}</h4>
                ${dept.description ? `<p class="item-card-description">${dept.description}</p>` : ''}
                ${dept.image ? `<img src="${dept.image}" alt="${dept.name}" style="max-width: 200px; border-radius: 5px; margin-top: 0.5rem;">` : ''}
            </div>
            <div class="item-card-actions">
                <button class="btn-edit" onclick="editDepartment(${dept.id})">
                    <i class="fas fa-edit"></i> Modifier
                </button>
                <button class="btn-remove" onclick="deleteDepartment(${dept.id})">
                    <i class="fas fa-trash"></i> Supprimer
                </button>
            </div>
        </div>
    `).join('');
}

function saveDepartmentsData() {
    const jsonString = JSON.stringify(departmentsData, null, 4);
    
    // Save to localStorage as backup
    try {
        localStorage.setItem('departmentsData_backup', jsonString);
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
    
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'departments.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    const message = `✅ Fichier departments.json téléchargé !\n\n📋 INSTRUCTIONS IMPORTANTES :\n\n1. Le fichier departments.json a été téléchargé dans votre dossier Téléchargements\n2. Copiez ce fichier et remplacez-le dans : cite-amour/data/departments.json\n3. Rechargez la page d'accueil pour voir les modifications\n\n⚠️ Les modifications ne seront visibles sur le site qu'après avoir remplacé le fichier !`;
    alert(message);
}

// ========== PROGRAMS MANAGEMENT ==========
let editingProgramId = null;

function showAddProgramForm() {
    editingProgramId = null;
    document.getElementById('programFormTitle').textContent = 'Ajouter un programme';
    document.getElementById('programForm').style.display = 'block';
    document.getElementById('programName').value = '';
    document.getElementById('programDay').value = '';
    document.getElementById('programTime').value = '';
    document.getElementById('programIcon').value = '';
    document.getElementById('programForm').scrollIntoView({ behavior: 'smooth' });
}

function cancelProgramForm() {
    document.getElementById('programForm').style.display = 'none';
    editingProgramId = null;
}

function editProgram(id) {
    const program = programsData.find(p => p.id === id);
    if (!program) return;

    editingProgramId = id;
    document.getElementById('programFormTitle').textContent = 'Modifier le programme';
    document.getElementById('programForm').style.display = 'block';
    document.getElementById('programName').value = program.name || '';
    document.getElementById('programDay').value = program.day || '';
    document.getElementById('programTime').value = program.time || '';
    document.getElementById('programIcon').value = program.icon || '';
    document.getElementById('programForm').scrollIntoView({ behavior: 'smooth' });
}

function saveProgram() {
    const name = document.getElementById('programName').value.trim();
    const day = document.getElementById('programDay').value;
    const time = document.getElementById('programTime').value.trim();
    const icon = document.getElementById('programIcon').value.trim();

    if (!name || !day || !time || !icon) {
        alert('Veuillez remplir tous les champs obligatoires (*)');
        return;
    }

    if (editingProgramId !== null) {
        // Update existing program
        const program = programsData.find(p => p.id === editingProgramId);
        if (program) {
            program.name = name;
            program.day = day;
            program.time = time;
            program.icon = icon;
        }
    } else {
        // Add new program
        const maxId = programsData.length > 0 ? Math.max(...programsData.map(p => p.id)) : 0;
        programsData.push({
            id: maxId + 1,
            name,
            day,
            time,
            icon
        });
    }

    renderProgramsList();
    cancelProgramForm();
    showSaveReminder('programs');
}

function deleteProgram(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) return;
    
    programsData = programsData.filter(p => p.id !== id);
    renderProgramsList();
    showSaveReminder('programs');
}

// Show/hide load status
function showLoadStatus(section, type, message) {
    const statusDiv = document.getElementById(section + 'LoadStatus');
    const statusText = document.getElementById(section + 'LoadStatusText');
    
    if (!statusDiv || !statusText) return;
    
    statusDiv.style.display = 'block';
    
    if (type === 'error') {
        statusDiv.style.background = '#f8d7da';
        statusDiv.style.borderLeftColor = '#dc3545';
        statusDiv.style.color = '#721c24';
        statusText.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    } else if (type === 'loading') {
        statusDiv.style.background = '#d1ecf1';
        statusDiv.style.borderLeftColor = '#0c5460';
        statusDiv.style.color = '#0c5460';
        statusText.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${message}`;
    } else {
        statusDiv.style.background = '#d4edda';
        statusDiv.style.borderLeftColor = '#28a745';
        statusDiv.style.color = '#155724';
        statusText.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    }
}

function hideLoadStatus(section) {
    const statusDiv = document.getElementById(section + 'LoadStatus');
    if (statusDiv) {
        statusDiv.style.display = 'none';
    }
}

// Reload departments data
function reloadDepartmentsData() {
    console.log('🔄 Manual reload triggered');
    loadDepartmentsData();
}

// Force populate dropdowns (for debugging)
function forcePopulateDropdowns() {
    console.log('🔧 Force populating dropdowns...');
    console.log('📊 Current departmentsData:', departmentsData);
    console.log('📊 departmentsData length:', departmentsData ? departmentsData.length : 'undefined');
    populateDepartmentSelect();
    populateEventSelect();
    
    // Check if dropdown was populated
    const select = document.getElementById('newDeptSelect');
    if (select) {
        const options = select.querySelectorAll('option');
        console.log('✅ Dropdown now has', options.length, 'options');
        if (options.length > 1) {
            alert(`✅ Dropdown mis à jour avec ${options.length - 1} département(s)`);
        } else {
            alert('⚠️ Le dropdown est toujours vide. Vérifiez la console (F12) pour plus de détails.');
        }
    } else {
        alert('❌ Le dropdown n\'a pas été trouvé. Êtes-vous dans la section "Images des Départements" ?');
    }
}

// Check if server is running
async function checkServerStatus() {
    try {
        const response = await fetch('../data/departments.json', { method: 'HEAD' });
        if (!response.ok) {
            showGlobalServerWarning();
        }
    } catch (error) {
        showGlobalServerWarning();
    }
}

// Show global server warning banner
function showGlobalServerWarning() {
    const banner = document.getElementById('globalServerWarning');
    if (banner) {
        banner.style.display = 'block';
    }
}

// Clear localStorage backup
function clearLocalStorageBackup(type) {
    if (confirm(`Voulez-vous vider le cache localStorage pour ${type} ?\n\nCela forcera le rechargement depuis le fichier JSON.`)) {
        localStorage.removeItem(type + 'Data_backup');
        alert('Cache vidé ! Rechargez la page pour charger depuis le fichier JSON.');
        location.reload();
    }
}

// Show save reminder
function showSaveReminder(type) {
    const messages = {
        events: 'Événements',
        departments: 'Départements',
        programs: 'Programmes'
    };
    
    // Create or update reminder banner
    let reminder = document.getElementById('saveReminder');
    if (!reminder) {
        reminder = document.createElement('div');
        reminder.id = 'saveReminder';
        reminder.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #ff9800;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 350px;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(reminder);
    }
    
    reminder.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 1.5rem;"></i>
            <div>
                <strong>Modifications en attente</strong>
                <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem;">
                    N'oubliez pas de cliquer sur "Télécharger ${messages[type]}.json" 
                    pour sauvegarder vos modifications !
                </p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem; padding: 0 0.5rem;">
                ×
            </button>
        </div>
    `;
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        if (reminder && reminder.parentElement) {
            reminder.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => reminder.remove(), 300);
        }
    }, 10000);
}

function renderProgramsList() {
    const container = document.getElementById('programsListContainer');
    if (!container) return;

    if (programsData.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Aucun programme pour le moment.</p>';
        return;
    }

    container.innerHTML = programsData.map(program => `
        <div class="item-card">
            <div class="item-card-content">
                <h4 class="item-card-title">
                    <i class="fas fa-${program.icon || 'circle'}"></i> ${program.name}
                </h4>
                <div class="item-card-info">
                    <span><i class="fas fa-calendar-day"></i> ${program.day}</span>
                    <span><i class="fas fa-clock"></i> ${program.time}</span>
                </div>
            </div>
            <div class="item-card-actions">
                <button class="btn-edit" onclick="editProgram(${program.id})">
                    <i class="fas fa-edit"></i> Modifier
                </button>
                <button class="btn-remove" onclick="deleteProgram(${program.id})">
                    <i class="fas fa-trash"></i> Supprimer
                </button>
            </div>
        </div>
    `).join('');
}

function saveProgramsData() {
    const jsonString = JSON.stringify(programsData, null, 4);
    
    // Save to localStorage as backup
    try {
        localStorage.setItem('programsData_backup', jsonString);
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
    
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'programs.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    const message = `✅ Fichier programs.json téléchargé !\n\n📋 INSTRUCTIONS IMPORTANTES :\n\n1. Le fichier programs.json a été téléchargé dans votre dossier Téléchargements\n2. Copiez ce fichier et remplacez-le dans : cite-amour/data/programs.json\n3. Rechargez la page d'accueil pour voir les modifications\n\n⚠️ Les modifications ne seront visibles sur le site qu'après avoir remplacé le fichier !`;
    alert(message);
}

