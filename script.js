// Data Management
let eventsData = [];
let programsData = [];
let departmentsData = [];

// Carousel State
let currentEventsIndex = 0;
let currentDeptsIndex = 0;
let currentProgramsIndex = 0;
let itemsPerView = getItemsPerView();

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupEventListeners();
    setupSmoothScroll();
    setupTitleAnimation();
});

// Setup title word-group animation
function setupTitleAnimation() {
    // Animation is handled by CSS with data-part attributes
    // No JavaScript needed for this animation
}

// Load data from JSON files
async function loadData() {
    try {
        const [events, programs, departments, images] = await Promise.all([
            fetch('data/events.json').then(res => res.json()),
            fetch('data/programs.json').then(res => res.json()),
            fetch('data/departments.json').then(res => res.json()),
            fetch('data/images.json').then(res => res.json()).catch(() => null)
        ]);

        eventsData = events;
        programsData = programs;
        departmentsData = departments;

        // Load background images
        if (images) {
            loadBackgroundImages(images);
        }

        // Render all sections (departments use image violette from departments.json)
        renderEvents();
        renderPrograms();
        renderDepartments();
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to default data if files can't be loaded
        loadDefaultData();
    }
}

// Load background images from configuration
function loadBackgroundImages(imagesConfig) {
    // Hero section background (page d'accueil)
    const heroSection = document.getElementById('heroSection');
    if (heroSection && imagesConfig.hero) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${imagesConfig.hero.url}')`;
    }

    // Page hero backgrounds (Commencer ici, etc.)
    const pageHeroSection = document.getElementById('pageHeroSection');
    if (pageHeroSection && imagesConfig.pageHero) {
        pageHeroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${imagesConfig.pageHero.url}')`;
    }

    // Join page hero image
    const joinHeroImage = document.getElementById('joinHeroImage');
    if (joinHeroImage && imagesConfig.joinHero) {
        joinHeroImage.src = imagesConfig.joinHero.url;
    }

    // Update event images
    if (imagesConfig.events && eventsData) {
        eventsData.forEach((event, index) => {
            const eventImage = imagesConfig.events.find(img => img.id === event.id);
            if (eventImage) {
                event.image = eventImage.url;
            }
        });
    }

    // Department images are now directly from departments.json (image violette avec logo)
    // No need to update from images.json
}

// Fallback default data (quand les JSON ne se chargent pas)
function loadDefaultData() {
    eventsData = []; // Pas d'événement codé en dur ; le carousel utilisera buildDefaultChurchEvents(1)
    programsData = [
        {
            id: 1,
            name: "Cultes de célébration",
            day: "Dimanche",
            icon: "church",
            time: "de 9h30 à 11h45"
        },
        {
            id: 2,
            name: "Cultes d'enseignement",
            day: "Vendredi",
            icon: "book-open",
            time: "de 18h30 à 20h30"
        },
        {
            id: 3,
            name: "École Biblique de l'Amour",
            day: "Mardi",
            icon: "users",
            time: "de 19h à 20h30"
        },
        {
            id: 4,
            name: "Rencontres Hommes/Femmes",
            day: "Mercredi (1 sur 2)",
            icon: "user-friends",
            time: "de 19h à 20h30"
        },
        {
            id: 5,
            name: "Cellules de maison",
            day: "Mercredi (1 sur 2)",
            icon: "home",
            time: "de 19h à 20h30"
        }
    ];
    departmentsData = [
        { id: 1, name: "Jeunes adultes", url: "departement-jeunes-adultes.html", image: "departementacceuil.jpeg", description: "Communauté pour les jeunes adultes de 18 à 25 ans" },
        { id: 2, name: "Hommes", url: "departement-hommes.html", image: "departementacceuil.jpeg", description: "Ministère dédié aux hommes" },
        { id: 3, name: "Femmes", url: "departement-femmes.html", image: "departementacceuil.jpeg", description: "Ministère dédié aux femmes" },
        { id: 4, name: "Ados", url: "departement-ados.html", image: "departementacceuil.jpeg", description: "Programmes pour les adolescents" },
        { id: 5, name: "Juniors", url: "departement-juniors.html", image: "departementacceuil.jpeg", description: "Programmes pour les enfants et juniors" },
        { id: 6, name: "Chorale", url: "departement-chorale.html", image: "departementacceuil.jpeg", description: "Ministère de la musique et de la louange" },
        { id: 7, name: "Intercession", url: "departement-intercession.html", image: "departementacceuil.jpeg", description: "Ministère de prière et d'intercession" },
        { id: 8, name: "Conseil pastoral", url: "departement-groupe-pastoral.html", image: "departementacceuil.jpeg", description: "Soutien et accompagnement pastoral" },
        { id: 9, name: "Évangélisation", url: "departement-evangelisation.html", image: "departementacceuil.jpeg", description: "Partage de l'Évangile dans notre communauté" },
        { id: 10, name: "Médias", url: "departement-medias.html", image: "departementacceuil.jpeg", description: "Ministère des médias et de la communication" }
    ];
    renderEvents();
    renderPrograms();
    renderDepartments();
}

// Calculate next Sunday
function getNextSunday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek; // If today is Sunday, get next Sunday (7 days)
    
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    nextSunday.setHours(19, 0, 0, 0); // Set to 7 PM
    
    return nextSunday;
}

// Format date for event display
function formatDateForEvent(date) {
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
                   'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName} ${day} ${monthName} ${year}`;
}

// ================================
// ÉVÉNEMENTS PAR DÉFAUT DE L'ÉGLISE
// ================================

// Renvoie la prochaine occurrence d'un jour donné
// 0 = dimanche, 5 = vendredi
function getNextWeekday(targetDay, hour, minute) {
    const now = new Date();
    const currentDay = now.getDay();

    let daysToAdd = (targetDay - currentDay + 7) % 7;

    const candidate = new Date(now);
    candidate.setHours(hour, minute, 0, 0);

    // Si c'est aujourd'hui mais l'heure est déjà passée → semaine suivante
    if (daysToAdd === 0 && candidate <= now) {
        daysToAdd = 7;
    }

    const next = new Date(now);
    next.setDate(now.getDate() + daysToAdd);
    next.setHours(hour, minute, 0, 0);

    return next;
}

// Renvoie plusieurs occurrences (ex : 4 prochains dimanches)
function getNextOccurrences(targetDay, hour, minute, count) {
    const dates = [];
    let d = getNextWeekday(targetDay, hour, minute);

    for (let i = 0; i < count; i++) {
        dates.push(new Date(d));
        d.setDate(d.getDate() + 7);
    }

    return dates;
}

// Construit les événements fixes de l'église
function buildDefaultChurchEvents(weeksAhead = 4) {
    const sundays = getNextOccurrences(0, 9, 30, weeksAhead);
    const fridays = getNextOccurrences(5, 19, 0, weeksAhead);

    const sundayEvents = sundays.map((date, i) => ({
        id: `culte-celebration-${i}`,
        name: "Culte de célébration",
        time: "9h30 à 11h45",
        description: "Temps de louange, d'adoration et de communion fraternelle.",
        image: null,
        fullDate: date
    }));

    const fridayEvents = fridays.map((date, i) => ({
        id: `culte-enseignement-${i}`,
        name: "Culte d'enseignement",
        time: "19h00 à 20h30",
        description: "Enseignement biblique et croissance spirituelle.",
        image: null,
        fullDate: date
    }));

    return [...sundayEvents, ...fridayEvents]
        .sort((a, b) => a.fullDate - b.fullDate);
}

// Exclut définitivement tout événement du mercredi en février
function isWednesdayFebruaryEvent(event) {
    if (event.fullDate) {
        const d = event.fullDate;
        return d.getDay() === 3 && d.getMonth() === 1;
    }
    const day = parseInt(event.date, 10);
    if (isNaN(day)) return false;
    const febWednesdays = [5, 12, 19, 26];
    return febWednesdays.includes(day);
}

// Render Events Carousel
function renderEvents() {
    const carousel = document.getElementById('eventsCarousel');
    if (!carousel) return;

    // Événements affichés : ceux de l'église + éventuels events.json (sans mercredi février)
    const defaultEvents = buildDefaultChurchEvents(1); // 1 semaine : prochain dimanche + prochain vendredi
    const manualEvents = (eventsData && Array.isArray(eventsData)) ? eventsData : [];
    const allEvents = [...defaultEvents, ...manualEvents];
    const eventsToRender = allEvents.filter(e => !isWednesdayFebruaryEvent(e));

    // Check if we have only one event to center it
    const carouselWrapper = carousel.closest('.carousel-wrapper');
    if (eventsToRender.length === 1) {
        if (carouselWrapper) {
            carouselWrapper.classList.add('single-event');
        }
    } else {
        if (carouselWrapper) {
            carouselWrapper.classList.remove('single-event');
        }
    }

    // Helper function to format date
    function formatEventDate(event) {
        // If event has a fullDate (default event), use it
        if (event.fullDate) {
            return formatDateForEvent(event.fullDate);
        }
        
        // Otherwise, parse the date string
        const day = parseInt(event.date) || new Date().getDate();
        const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
                       'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
        const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const today = new Date();
        let eventDate;
        
        // If day is less than current day, use next month
        if (day < today.getDate()) {
            eventDate = new Date(today.getFullYear(), today.getMonth() + 1, day);
        } else {
            eventDate = new Date(today.getFullYear(), today.getMonth(), day);
        }
        
        const dayName = days[eventDate.getDay()];
        const monthName = months[eventDate.getMonth()];
        const year = eventDate.getFullYear();
        
        return `${dayName} ${day} ${monthName} ${year}`;
    }

    // Helper function to format time range
    function formatTimeRange(timeStr) {
        if (!timeStr) return '';
        // Déjà une plage "X à Y" : afficher "de X à Y" sans recalculer
        if (timeStr.includes(' à ')) {
            return `de ${timeStr}`;
        }
        // Heure seule : afficher "de XhXX"
        if (timeStr.includes('h')) {
            return `de ${timeStr}`;
        }
        return `de ${timeStr}`;
    }

    carousel.innerHTML = eventsToRender.map(event => `
        <div class="event-card-new">
            <div class="event-image-container">
                ${event.image ? 
                    `<img src="${event.image}" alt="${event.name}" class="event-image-bg" onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
                     <div class="event-image-placeholder" style="display: none;">
                        <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                            <rect x="20" y="20" width="160" height="80" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" rx="4"/>
                            <path d="M 40 80 L 60 50 L 80 60 L 100 40 L 120 50 L 140 45 L 160 70 L 160 80 L 40 80 Z" 
                                  fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                            <circle cx="170" cy="30" r="8" fill="rgba(255,255,255,0.3)"/>
                        </svg>
                     </div>` :
                    `<div class="event-image-placeholder">
                        <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                            <rect x="20" y="20" width="160" height="80" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" rx="4"/>
                            <path d="M 40 80 L 60 50 L 80 60 L 100 40 L 120 50 L 140 45 L 160 70 L 160 80 L 40 80 Z" 
                                  fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                            <circle cx="170" cy="30" r="8" fill="rgba(255,255,255,0.3)"/>
                        </svg>
                     </div>`
                }
                <div class="event-overlay-gradient"></div>
            </div>
            <div class="event-info-overlay">
                <h3 class="event-title">${event.name}</h3>
                <div class="event-details">
                    <div class="event-detail-item">
                        <i class="fas fa-calendar"></i>
                        <span class="event-date-full">${formatEventDate(event)}</span>
                    </div>
                    <div class="event-detail-item">
                        <i class="fas fa-clock"></i>
                        <span class="event-time-range">${formatTimeRange(event.time)}</span>
                    </div>
                </div>
                <a href="https://www.facebook.com/share/1KYkeJiemi/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" class="event-learn-more">
                    <span>Suis-nous en direct sur Facebook</span>
                </a>
            </div>
        </div>
    `).join('');

    // Show/hide navigation buttons based on number of events
    const prevBtn = document.getElementById('eventsPrev');
    const nextBtn = document.getElementById('eventsNext');
    
    if (eventsToRender.length >= 4) {
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';
    } else {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }

    updateCarouselPosition('events');
}

// Render Programs Grid
function renderPrograms() {
    const grid = document.getElementById('programsGrid');
    if (!grid) {
        console.error('Programs grid not found');
        return;
    }

    if (!programsData || programsData.length === 0) {
        console.error('No programs data available');
        grid.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Chargement des programmes...</p>';
        return;
    }

    const iconMap = {
        'church': 'fas fa-heart',
        'music': 'fas fa-music',
        'book-open': 'fas fa-book-open',
        'users': 'fas fa-users',
        'home': 'fas fa-home',
        'user-friends': 'fas fa-user-friends',
        'child': 'fas fa-child',
        'pray': 'fas fa-hands-praying'
    };

    const isCelebration = (name) => /célébration|celebration/i.test(name || '');

    grid.innerHTML = programsData.map(program => {
        const celebrationClass = isCelebration(program.name) ? ' program-item-celebration' : '';
        const iconContent = isCelebration(program.name)
            ? `<div class="program-icon-partitions" aria-hidden="true"><span class="partitions-line">♪</span><span class="partitions-line">♫</span><span class="partitions-line">♪</span></div>`
            : `<i class="${iconMap[program.icon] || 'fas fa-calendar'}"></i>`;
        return `
        <div class="program-item${celebrationClass}">
            <div class="program-icon-wrapper">
                <div class="program-icon">${iconContent}</div>
            </div>
            <div class="program-content">
                <h3 class="program-name">${program.name}</h3>
                <div class="program-details">
                    <div class="program-detail-item">
                        <i class="fas fa-calendar-day"></i>
                        <span class="program-day">${program.day}</span>
                    </div>
                    <div class="program-detail-item">
                        <i class="fas fa-clock"></i>
                        <span class="program-time">${program.time}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join('');

    console.log(`Rendered ${programsData.length} programs`);
    
    // Initialize carousel for programs on mobile
    if (window.innerWidth < 769) {
        currentProgramsIndex = 0;
        setTimeout(() => {
            updateCarouselPosition('programs');
            updateCarouselButtons('programs');
        }, 100);
    }
}

// Render Departments Grid
function renderDepartments() {
    const grid = document.getElementById('departmentsGrid');
    if (!grid) return;

    // Ensure all departments are displayed
    if (departmentsData.length === 0) {
        grid.innerHTML = '<p>Aucun département disponible</p>';
        return;
    }

    console.log('=== RENDU DES DÉPARTEMENTS ===');
    console.log('Nombre de départements:', departmentsData.length);
    console.log('Données des départements:', departmentsData);
    
    grid.innerHTML = departmentsData.map(dept => {
        // Si le département a une URL, créer un lien, sinon utiliser l'ancienne méthode
        const url = dept.url || '#';
        // Forcer l'utilisation de l'image violette avec logo pour tous les départements
        const imageUrl = 'departementacceuil.jpeg';
        const fallbackImage = 'departementacceuil.jpeg';
        
        console.log(`Rendu département "${dept.name}" avec image: ${imageUrl}`);
        
        if (url && url !== '#') {
            return `
                <a href="${url}" class="dept-card-link">
                    <div class="dept-card">
                        <img src="${imageUrl}" alt="${dept.name}" class="dept-image" onerror="this.onerror=null; this.src='${fallbackImage}'">
                        <div class="dept-name">${dept.name}</div>
                    </div>
                </a>
            `;
        } else {
            return `
                <div class="dept-card" onclick="showDepartmentDetail(${dept.id})">
                    <img src="${imageUrl}" alt="${dept.name}" class="dept-image" onerror="this.onerror=null; this.src='${fallbackImage}'">
                    <div class="dept-name">${dept.name}</div>
                </div>
            `;
        }
    }).join('');

    console.log(`✓ ${departmentsData.length} départements rendus avec image: departementacceuil.jpeg`);
    
    // Initialize carousel for departments on mobile
    if (window.innerWidth < 769) {
        currentDeptsIndex = 0;
        setTimeout(() => {
            updateCarouselPosition('departments');
            updateCarouselButtons('departments');
        }, 100);
    }
    
    // Update on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth < 769) {
                updateCarouselButtons('departments');
            } else {
                const prevBtn = document.getElementById('departmentsPrev');
                const nextBtn = document.getElementById('departmentsNext');
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';
            }
        }, 250);
    });
}

// Carousel Navigation
function setupEventListeners() {
    // Events carousel
    const eventsPrev = document.getElementById('eventsPrev');
    const eventsNext = document.getElementById('eventsNext');
    const eventsCarousel = document.getElementById('eventsCarousel');
    
    if (eventsPrev) {
        eventsPrev.addEventListener('click', () => {
            if (window.innerWidth <= 600 && eventsCarousel) {
                const card = eventsCarousel.querySelector('.event-card-new');
                const step = (card ? card.offsetWidth : 220) + 12;
                eventsCarousel.scrollBy({ left: -step, behavior: 'smooth' });
            } else {
                navigateCarousel('events', -1);
            }
        });
    }
    if (eventsNext) {
        eventsNext.addEventListener('click', () => {
            if (window.innerWidth <= 600 && eventsCarousel) {
                const card = eventsCarousel.querySelector('.event-card-new');
                const step = (card ? card.offsetWidth : 220) + 12;
                eventsCarousel.scrollBy({ left: step, behavior: 'smooth' });
            } else {
                navigateCarousel('events', 1);
            }
        });
    }

    // Departments carousel
    const departmentsPrev = document.getElementById('departmentsPrev');
    const departmentsNext = document.getElementById('departmentsNext');
    
    if (departmentsPrev) {
        departmentsPrev.addEventListener('click', () => navigateCarousel('departments', -1));
    }
    if (departmentsNext) {
        departmentsNext.addEventListener('click', () => navigateCarousel('departments', 1));
    }
    
    // Programs carousel
    const programsPrev = document.getElementById('programsPrev');
    const programsNext = document.getElementById('programsNext');
    
    if (programsPrev) {
        programsPrev.addEventListener('click', () => navigateCarousel('programs', -1));
    }
    if (programsNext) {
        programsNext.addEventListener('click', () => navigateCarousel('programs', 1));
    }

    // Services carousel (page Se joindre à nous)
    const servicesCarousel = document.getElementById('servicesCarousel');
    const servicesPrev = document.getElementById('servicesCarouselPrev');
    const servicesNext = document.getElementById('servicesCarouselNext');
    if (servicesCarousel && servicesPrev) {
        servicesPrev.addEventListener('click', () => {
            const card = servicesCarousel.querySelector('.service-card-gradient');
            const gap = 20;
            const step = (card ? card.offsetWidth : 280) + gap;
            servicesCarousel.scrollBy({ left: -step, behavior: 'smooth' });
        });
    }
    if (servicesCarousel && servicesNext) {
        servicesNext.addEventListener('click', () => {
            const card = servicesCarousel.querySelector('.service-card-gradient');
            const gap = 20;
            const step = (card ? card.offsetWidth : 280) + gap;
            servicesCarousel.scrollBy({ left: step, behavior: 'smooth' });
        });
    }

    // Contact button
    const contactBtn = document.querySelector('.btn-contact');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            alert('Formulaire de contact à venir...');
            // You can implement a contact form modal
        });
    }

    // Dropdown menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const menuClose = document.getElementById('menuClose');
    
    function openMenu() {
        dropdownMenu.classList.add('active');
        document.body.classList.add('menu-open');
    }
    
    function closeMenu() {
        dropdownMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            openMenu();
        });

        // Close menu when clicking on close button
        if (menuClose) {
            menuClose.addEventListener('click', () => {
                closeMenu();
            });
        }

        // Close menu when clicking outside (on overlay)
        dropdownMenu.addEventListener('click', (e) => {
            if (e.target === dropdownMenu) {
                closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && dropdownMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // Mobile menu toggle (for responsive nav)
    const mobileMenuToggle = document.querySelector('.menu-toggle');
    if (mobileMenuToggle && !menuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Keyboard navigation for carousels
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            navigateCarousel('events', -1);
            navigateCarousel('departments', -1);
            navigateCarousel('programs', -1);
        } else if (e.key === 'ArrowRight') {
            navigateCarousel('events', 1);
            navigateCarousel('departments', 1);
            navigateCarousel('programs', 1);
        }
    });
}

// Navigate carousel
function navigateCarousel(type, direction) {
    if (type === 'events') {
        // Get actual events count (including default if needed)
        const eventsCount = (eventsData && eventsData.length > 0) ? eventsData.length : 1;
        const maxIndex = Math.max(0, eventsCount - itemsPerView);
        currentEventsIndex = Math.max(0, Math.min(maxIndex, currentEventsIndex + direction));
        updateCarouselPosition('events');
    } else if (type === 'departments') {
        const departmentsCount = (departmentsData && departmentsData.length > 0) ? departmentsData.length : 1;
        const maxIndex = Math.max(0, departmentsCount - 1);
        currentDeptsIndex = Math.max(0, Math.min(maxIndex, currentDeptsIndex + direction));
        updateCarouselPosition('departments');
    } else if (type === 'programs') {
        const programsCount = (programsData && programsData.length > 0) ? programsData.length : 1;
        const maxIndex = Math.max(0, programsCount - 1);
        currentProgramsIndex = Math.max(0, Math.min(maxIndex, currentProgramsIndex + direction));
        updateCarouselPosition('programs');
    }
}

// Update carousel position
function updateCarouselPosition(type) {
    if (type === 'events') {
        /* Sur mobile (≤600px), le carousel utilise overflow-x + scrollBy, pas de transform */
        if (window.innerWidth <= 600) {
            updateCarouselButtons(type);
            return;
        }
        const carousel = document.getElementById('eventsCarousel');
        if (!carousel) return;

        const firstCard = carousel.querySelector('.event-card-new');
        const cardWidth = firstCard ? firstCard.offsetWidth : 280;
        const gap = 20; // 1.25rem
        const offset = (cardWidth + gap) * currentEventsIndex;
        
        carousel.style.transform = `translateX(-${offset}px)`;

        // Update button states
        updateCarouselButtons(type);
    } else if (type === 'departments') {
        const grid = document.getElementById('departmentsGrid');
        if (!grid) return;
        
        // Sur mobile (< 769px), utiliser le scroll pour centrer l'élément
        if (window.innerWidth < 769) {
            const cards = grid.querySelectorAll('.dept-card, .dept-card-link');
            if (cards.length > 0 && currentDeptsIndex < cards.length) {
                const card = cards[currentDeptsIndex];
                const cardRect = card.getBoundingClientRect();
                const gridRect = grid.getBoundingClientRect();
                const cardWidth = card.offsetWidth;
                const gap = 24; // 1.5rem = 24px
                const containerWidth = grid.offsetWidth;
                
                // Calculer la position de scroll pour centrer la carte
                const cardLeft = card.offsetLeft;
                const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
                
                grid.scrollTo({
                    left: Math.max(0, scrollPosition),
                    behavior: 'smooth'
                });
            }
        }
        
        // Update button states
        updateCarouselButtons(type);
    } else if (type === 'programs') {
        const grid = document.getElementById('programsGrid');
        if (!grid) return;
        
        // Sur mobile (< 769px), utiliser le scroll pour centrer l'élément
        if (window.innerWidth < 769) {
            const cards = grid.querySelectorAll('.program-item');
            if (cards.length > 0 && currentProgramsIndex < cards.length) {
                const card = cards[currentProgramsIndex];
                const cardRect = card.getBoundingClientRect();
                const gridRect = grid.getBoundingClientRect();
                const cardWidth = card.offsetWidth;
                const gap = 24; // 1.5rem = 24px
                const containerWidth = grid.offsetWidth;
                
                // Calculer la position de scroll pour centrer la carte
                const cardLeft = card.offsetLeft;
                const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
                
                grid.scrollTo({
                    left: Math.max(0, scrollPosition),
                    behavior: 'smooth'
                });
            }
        }
        
        // Update button states
        updateCarouselButtons(type);
    }
}

// Update carousel button states
function updateCarouselButtons(type) {
    if (type === 'events') {
        // Get actual events count (including default if needed)
        const eventsCount = (eventsData && eventsData.length > 0) ? eventsData.length : 1;
        
        // Only show buttons if there are 4 or more events
        if (eventsCount < 4) {
            const prevBtn = document.getElementById('eventsPrev');
            const nextBtn = document.getElementById('eventsNext');
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }

        const currentIndex = currentEventsIndex;
        const dataLength = eventsCount;
        const maxIndex = Math.max(0, dataLength - itemsPerView);

        const prevBtn = document.getElementById('eventsPrev');
        const nextBtn = document.getElementById('eventsNext');

        if (prevBtn) {
            prevBtn.style.display = 'flex';
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        }

        if (nextBtn) {
            nextBtn.style.display = 'flex';
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
        }
    } else if (type === 'departments') {
        // Only show buttons on mobile (< 769px)
        if (window.innerWidth >= 769) {
            const prevBtn = document.getElementById('departmentsPrev');
            const nextBtn = document.getElementById('departmentsNext');
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }
        
        const departmentsCount = (departmentsData && departmentsData.length > 0) ? departmentsData.length : 1;
        
        if (departmentsCount <= 1) {
            const prevBtn = document.getElementById('departmentsPrev');
            const nextBtn = document.getElementById('departmentsNext');
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }

        const currentIndex = currentDeptsIndex;
        const maxIndex = Math.max(0, departmentsCount - 1);

        const prevBtn = document.getElementById('departmentsPrev');
        const nextBtn = document.getElementById('departmentsNext');

        if (prevBtn) {
            prevBtn.style.display = 'flex';
            prevBtn.style.opacity = currentIndex === 0 ? '0.75' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
            prevBtn.disabled = currentIndex === 0;
            if (currentIndex === 0) {
                prevBtn.style.pointerEvents = 'none';
            } else {
                prevBtn.style.pointerEvents = 'auto';
            }
        }

        if (nextBtn) {
            nextBtn.style.display = 'flex';
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.75' : '1';
            nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
            nextBtn.disabled = currentIndex >= maxIndex;
            if (currentIndex >= maxIndex) {
                nextBtn.style.pointerEvents = 'none';
            } else {
                nextBtn.style.pointerEvents = 'auto';
            }
        }
    } else if (type === 'programs') {
        // Only show buttons on mobile (< 769px)
        if (window.innerWidth >= 769) {
            const prevBtn = document.getElementById('programsPrev');
            const nextBtn = document.getElementById('programsNext');
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }
        
        const programsCount = (programsData && programsData.length > 0) ? programsData.length : 1;
        
        if (programsCount <= 1) {
            const prevBtn = document.getElementById('programsPrev');
            const nextBtn = document.getElementById('programsNext');
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }

        const currentIndex = currentProgramsIndex;
        const maxIndex = Math.max(0, programsCount - 1);

        const prevBtn = document.getElementById('programsPrev');
        const nextBtn = document.getElementById('programsNext');

        if (prevBtn) {
            prevBtn.style.display = 'flex';
            prevBtn.style.opacity = currentIndex === 0 ? '0.75' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
            prevBtn.disabled = currentIndex === 0;
            if (currentIndex === 0) {
                prevBtn.style.pointerEvents = 'none';
            } else {
                prevBtn.style.pointerEvents = 'auto';
            }
        }

        if (nextBtn) {
            nextBtn.style.display = 'flex';
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.75' : '1';
            nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
            nextBtn.disabled = currentIndex >= maxIndex;
            if (currentIndex >= maxIndex) {
                nextBtn.style.pointerEvents = 'none';
            } else {
                nextBtn.style.pointerEvents = 'auto';
            }
        }
    }
}

// Show event detail (can be expanded to modal)
function showEventDetail(eventId) {
    const defaultEvents = buildDefaultChurchEvents(1);
    const manualEvents = (eventsData && Array.isArray(eventsData)) ? eventsData : [];
    const allEvents = [...defaultEvents, ...manualEvents].filter(e => !isWednesdayFebruaryEvent(e));

    const event = allEvents.find(e => String(e.id) === String(eventId));
    if (!event) return;

    const dateStr = event.fullDate
        ? formatDateForEvent(event.fullDate)
        : '';

    alert(
        `Détails de l'événement:\n\n` +
        `${event.name}\n` +
        `Date : ${dateStr}\n` +
        `Heure : ${event.time}\n\n` +
        `${event.description || ''}`
    );
}

// Show department detail (can be expanded to modal)
function showDepartmentDetail(deptId) {
    const dept = departmentsData.find(d => d.id === deptId);
    if (dept) {
        alert(`Département: ${dept.name}\n\n${dept.description}`);
        // You can implement a modal here
    }
}

// Smooth scroll for navigation links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-open');
}

// Get items per view based on screen size
function getItemsPerView() {
    const width = window.innerWidth;
    if (width < 768) {
        return 1;
    } else if (width < 1024) {
        return 2;
    }
    return 3;
}

// Responsive carousel adjustment
function adjustCarouselForScreen() {
    const newItemsPerView = getItemsPerView();
    if (newItemsPerView !== itemsPerView) {
        itemsPerView = newItemsPerView;
        currentEventsIndex = 0;
        currentDeptsIndex = 0;
        updateCarouselPosition('events');
        updateCarouselPosition('depts');
    }
}

// Handle window resize with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        adjustCarouselForScreen();
    }, 250);
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.vision-card, .event-card, .program-item, .dept-card');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Animate section titles on scroll
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
        title.style.animationDelay = `${index * 0.2}s`;
        observer.observe(title);
    });

    // Department page buttons
    const contactDeptBtn = document.querySelector('.btn-contact-dept');
    const registerDeptBtn = document.querySelector('.btn-register-dept');

    if (contactDeptBtn) {
        contactDeptBtn.addEventListener('click', () => {
            alert('Formulaire de contact à venir...');
            // You can redirect to contact form or open modal
        });
    }

    if (registerDeptBtn) {
        registerDeptBtn.addEventListener('click', () => {
            window.location.href = 'se-joindre.html';
        });
    }
});

